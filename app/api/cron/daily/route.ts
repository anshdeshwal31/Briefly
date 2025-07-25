import { getDbConnection } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    // Security check
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const sql = await getDbConnection();
        
        // Get all subscriptions that need to be expired
        const expiredSubscriptions = await sql`
            SELECT id, user_id, status, current_period_end 
            FROM subscriptions 
            WHERE current_period_end < NOW() 
            AND status = 'active'
        `;

        console.log(`Found ${expiredSubscriptions.length} subscriptions to expire`);

        // Expire the overdue subscriptions
        if (expiredSubscriptions.length > 0) {
            const expiredCount = await sql`
                UPDATE subscriptions 
                SET status = 'expired', updated_at = CURRENT_TIMESTAMP 
                WHERE current_period_end < NOW() AND status = 'active'
            `;

            // Also update users table
            await sql`
                UPDATE users 
                SET subscription_status = 'inactive' 
                WHERE subscription_id IN (
                    SELECT id FROM subscriptions WHERE status = 'expired'
                )
            `;

            console.log(`Expired ${expiredCount.length} subscriptions`);
        }

        return NextResponse.json({ 
            success: true, 
            message: `Processed ${expiredSubscriptions.length} expired subscriptions`,
            timestamp: new Date().toISOString()
        });

    } catch (error:any) {
        console.log('Cron job failed:', error);
        return NextResponse.json({ 
            success: false, 
            error: error.message 
        });
    }
}
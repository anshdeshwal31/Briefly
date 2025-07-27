import { getDbConnection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    // Security check
    const cronSecret = process.env.CRON_SECRET

    if(!cronSecret) throw new Error("couldn't find cron secret")
    
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const sql = await getDbConnection();
        
        // Expire the overdue subscriptions and get count
        const expiredCount = await sql`
            UPDATE subscriptions 
            SET status = 'expired', updated_at = CURRENT_TIMESTAMP 
            WHERE current_period_end < NOW() AND status = 'active'`;

        // Also update users table if any subscriptions were expired
        if (expiredCount.length > 0) {
            await sql`
                UPDATE users 
                SET status = 'inactive' 
                WHERE user_id IN (
                    SELECT user_id FROM subscriptions WHERE status = 'expired'
                )`;
        }

        console.log(`Expired ${expiredCount.length} subscriptions`);

        return NextResponse.json({ 
            success: true, 
            message: `Processed ${expiredCount.length} expired subscriptions`,
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
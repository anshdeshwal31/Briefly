import { getDbConnection } from '@/lib/db';
import {  currentUser,auth } from '@clerk/nextjs/server';

export interface Subscription {
  id: string;
  user_id: string;
  user_email: string;
  plan_type: string;
  status: 'active' | 'expired' | 'cancelled' | 'paused';
  current_period_start: Date;
  current_period_end: Date;
}

export async function getUserSubscription(userId: string): Promise<Subscription | null> {
  try {
    const sql = await getDbConnection();
    
    const result = await sql`
      SELECT * FROM subscriptions 
      WHERE user_id = ${userId} 
      AND status = 'active'
      ORDER BY created_at DESC 
      LIMIT 1
    `;
    
    return result.length > 0 ?( result[0] as Subscription) : null;
  } catch (error) {
    console.error('Error getting user subscription:', error);
    return null;
  }
}

export async function isSubscriptionActive(userId: string): Promise<boolean> {
  try {
    const subscription = await getUserSubscription(userId);
    
    if (!subscription) return false;
    
    const now = new Date();
    const periodEnd = new Date(subscription.current_period_end);
    
    // If expired, auto-expire it
    if (periodEnd < now && subscription.status === 'active') {
      await expireSubscription(userId);
      return false;
    }
    
    return subscription.status === 'active' && periodEnd >= now;
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return false;
  }
}

export async function expireSubscription(userId: string) {
  try {
    const sql = await getDbConnection();
    
    await sql`
      UPDATE subscriptions 
      SET status = 'expired', updated_at = CURRENT_TIMESTAMP 
      WHERE user_id = ${userId} AND status = 'active'
    `;
    
    await sql`
      UPDATE users 
      SET status = 'inactive' 
      WHERE user_id = ${userId}
    `;
    
    console.log(`Expired subscription for user: ${userId}`);
  } catch (error) {
    console.error('Error expiring subscription:', error);
    throw error;
  }
}

export async function createSubscription(
  plan_type: string,
  razorpay_payment_id : string
) {
  try {
    const sql = await getDbConnection();
    const now = new Date();
    const periodEnd = new Date(now);
    periodEnd.setMonth(periodEnd.getMonth() + 1); // Add 1 month

    const {userId} = await auth();    
    const user = await currentUser();
    const userEmail:string|undefined = user?.primaryEmailAddress?.emailAddress
    
    const result = await sql`
      INSERT INTO subscriptions 
      (user_id, user_email, plan_type, status, current_period_start, current_period_end, razorpay_payment_id)
      VALUES (${userId}, ${userEmail}, ${plan_type}, 'active', ${now}, ${periodEnd}, ${razorpay_payment_id})
      RETURNING *
    `;

    // Update user's subscription status
    await sql`
      UPDATE users 
      SET status = 'active' 
      WHERE user_id = ${userId}
    `;

    return result[0];
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
}
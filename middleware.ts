import { clerkMiddleware, createRouteMatcher,auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { isSubscriptionActive } from './lib/manageSubscriptions';
import { getDbConnection } from './lib/db';

const isProtectedRoute = createRouteMatcher([
  // '/api/upload', 
  // '/api/pdf-summary',
  '/upload',
  '/dashboard',
  // '/api/cron(.*)',
  // '/api/webhook(.*)', 
  // '/api/verify(.*)',
]);

const isPublicRoute = createRouteMatcher([
  '/#pricing(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/'
]);

const checkOutOfSummaries = async () => {
  try {
    const {userId} = await auth()
    const sql = await getDbConnection();
    
    const result = await sql`SELECT * FROM subscriptions WHERE user_id = ${userId} ORDER BY created_at  DESC LIMIT 1`
    
    if(result[0].plan_type==='Basic'){
      const countResult = await sql`SELECT COUNT(*) FROM pdf_summaries WHERE user_id = ${userId}`
      if(countResult[0].count>=5){
        return true;
      }
      return false;
    }
  } catch (error) {
    console.log("error checking summary limit: ",error) 
  }

}
export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Handle public routes first (before auth)
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  const { userId } = await auth();
  
  console.log('Checking auth - user:', userId ? 'authenticated' : 'not authenticated');
  
  // If user is not authenticated and trying to access protected route
  if (!userId && isProtectedRoute(req)) {
    const signInUrl = new URL('/sign-in', req.url);
    return NextResponse.redirect(signInUrl);
  }
  
  // Check subscription for authenticated users on protected routes
  if (userId && isProtectedRoute(req)) {
    try {
      const hasActiveSubscription = await isSubscriptionActive(userId);
      
      // if (!hasActiveSubscription) {
      //   const pricingUrl = new URL('/pricing?expired=true', req.url);
      //   return NextResponse.redirect(pricingUrl);
      // }
      if(req.nextUrl.pathname.startsWith('/api/uploadThing')){
        const outOfSummaries:boolean|undefined = await checkOutOfSummaries();
        if(outOfSummaries){
          NextResponse.json({message:"You're out of summaries.Please renew the subscription"})
        }
      }
    } catch (error) {
      console.error('Subscription check error:', error);
      // Fail open - allow request to continue
    }
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
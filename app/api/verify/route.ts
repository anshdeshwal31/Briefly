import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createSubscription } from '@/lib/manageSubscriptions';

const generatedSignature = (
 razorpayOrderId: string,
 razorpayPaymentId: string
) => {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
        throw new Error(
            'Razorpay key secret is not defined in environment variables.'
        );
    }
    const sig = crypto
    .createHmac('sha256', keySecret)
    .update(razorpayOrderId + '|' + razorpayPaymentId)
    .digest('hex');
    return sig;
};


export async function POST(request: NextRequest) {
    // console.log("inside the POST route function of verifying the order")
    try {

        const { orderCreationId, razorpayPaymentId, razorpaySignature,plan_type } = await request.json();
        
        const signature = generatedSignature(orderCreationId, razorpayPaymentId);
    if (signature !== razorpaySignature) {
        return NextResponse.json(
            { message: 'payment verification failed', isOk: false },
            { status: 400 }
        );
    }
    await createSubscription(plan_type)
    return NextResponse.json(
        { message: 'payment verified successfully', isOk: true },
        { status: 200 }
    );
    } catch (error) {
        console.log("payment verification error: ",error)
        return NextResponse.json(
            { message: 'payment verification failed', isOk: false },
            { status: 500 }
        );
    }
}
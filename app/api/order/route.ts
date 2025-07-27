import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';

const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET

if(!razorpayKeyId)throw new Error("couldn't find razorpay key id")
if(!razorpayKeySecret)throw new Error("couldn't find razorpay key secret")
    

const razorpay = new Razorpay({
 key_id: razorpayKeyId,
 key_secret: razorpayKeySecret
});

export async function POST(request: NextRequest) {
    console.log("inside the POST route of creating an order")
 const { amount, currency } = (await request.json()) as {
  amount: string;
  currency: string;
 };

 var options = {
  amount: amount,
  currency: currency,
  receipt: 'rcp1',
 };
 const order = await razorpay.orders.create(options);
 console.log({order});
 return NextResponse.json({ orderId: order.id }, { status: 200 });
}
import {  currencyCode } from "@/utils/constants";

// Add Razorpay types
declare global {
  interface Window {
    Razorpay: any;
  }
}

const createOrderId = async (amount: number) => {
    console.log("inside createOrderId function")
  try {
   const response = await fetch('/api/order', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     amount: amount*100,
     currency:currencyCode
    })
   });

   if (!response.ok) {
    throw new Error('Network response was not ok');
   }

   const data = await response.json();
   return data.orderId;
  } catch (error) {
   console.error('There was a problem with your fetch operation:', error);
  }
 };

export const processPayment = async (e: React.MouseEvent<HTMLButtonElement>, amount:number,user:any,plan_type:string) => {
  e.preventDefault();
  try {
    
    const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if(!razorpayKeyId) throw new Error("couldn't find razorpay key id")
    
  const email = user.emailAddresses[0].emailAddress;
  const name = user.fullName || user.firstName || "User";
    console.log({user})
   const orderId: string = await createOrderId(amount);
   console.log({orderId})
   const options = {
    key: razorpayKeyId,
    amount: amount * 100,
    currency: currencyCode,
    name: 'name',
    description: 'description',
    order_id: orderId,
    handler: async function (response: any) {

     const data = {
      orderCreationId: orderId,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpayOrderId: response.razorpay_order_id,
      razorpaySignature: response.razorpay_signature,
      plan_type
     };

     console.log({data})
     const result = await fetch('/api/verify', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
     });

     console.log({result})
     const res = await result.json();
    //  if (res.isOk) alert("payment succeed");
     else {
      alert(res.message);
     }
    },

    prefill: {
     name: name,
     email: email,
    },
    theme: {
     color: '#3399cc',
    },
   };

   console.log("before opening the popup")

   const paymentObject = new window.Razorpay(options);
   console.log({paymentObject})

   paymentObject.on('payment.failed', function (response: any) {
    alert(response.error.description);
   });

   paymentObject.open();
  } catch (error) {
   console.log(error);
  }
 };
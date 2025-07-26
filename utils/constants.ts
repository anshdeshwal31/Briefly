export const currency = '₹'; // For display
export const currencyCode = 'INR'; // For Razorpay API

const isDev = process.env.NODE_ENV =='development';

export const ORIGIN_URL = isDev?"http://localhost:3000":""
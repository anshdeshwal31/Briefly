'use client'

import { ArrowRight, CheckIcon } from 'lucide-react'; // Assuming CheckIcon and ArrowRight are imported
import { cn } from '@/lib/utils'; // Assuming cn is a utility for conditionally joining class names
import { processPayment } from '@/lib/makePayment';
import { Button } from '../ui/button';
import { useUser } from '@clerk/nextjs';
import { currency } from '@/utils/constants';
import { useRef } from 'react';
import { useInView } from 'motion/react';
import { MotionDiv, MotionSection, MotionSpan } from '../common/motion-wrapper';
import {  fadeInUp } from '@/utils/motionConfig';
import BgGradient from '../common/bg-gradient';
import { useRouter } from 'next/navigation';


type PriceType = {
  name: string;
  price: number;
  description: string;
  items: string[];
  plan_type: string;
  paymentLink: string;
  priceId: string;
};


const plans = [
  {
    plan_type: 'basic',
    name: 'Basic',
    price: 1,
    description: 'For individuals getting started',
    items: ['5 PDF summaries per month', 'Email support'],
    paymentLink: '', // Placeholder, fill with actual link
    priceId: '', // Placeholder, fill with actual price ID
  },
  {
    name: 'Pro',
    price: 19,
    description: 'For professionals and teams',
    items: [
      'Unlimited PDF summaries',
      'Priority processing',
      '24/7 priority support',
      'Markdown Export',
    ],
    plan_type: 'pro',
    paymentLink: '', // Placeholder, fill with actual link
    priceId: '', // Placeholder, fill with actual price ID
  },
];

const PricingCard = ({
  name,
  price,
  description,
  items,
  plan_type,
  paymentLink,
}: PriceType) => {
  const router = useRouter();
  const {isSignedIn,user}= useUser();

    const buyPlanFunction = async(e:React.MouseEvent<HTMLButtonElement>,price:number,plan_type:string) => { 
    
    
    if(!isSignedIn){
      router.push("sign-in")
      
    }
    else{
      await processPayment(e,price,user,plan_type)
      router.refresh();
    }
    }
    
  
  return (
    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-lg hover:scale-105 transition-all duration-300">
      <div
        className={cn(
          'relative flex flex-col h-full gap-4 lg:gap-8 z-10 px-7 py-8',
          'border-rose-600/20 rounded-2xl border-[1px]',
          plan_type === 'pro' && 'border-rose-500 gap-5 border-2'
        )}
      >
        <div className="flex justify-between items-center gap-4">
          <div>
            <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
            <p className="text-base-content/80 mt-2">{description}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <p className="text-5xl tracking-tight font-extrabold">{currency}{price}</p>
          <div className="flex flex-col justify-end mb-[4px]">
            <p className="text-xs uppercase font-semibold">RUP</p>
            <p className="text-xs">/month</p>
          </div>
        </div>

        <div className="space-y-2.5 leading-relaxed text-base flex-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <CheckIcon size={18} />
              <span>{item}</span>
            </li>
          ))}
        </div>

        <div className="space-y-2 flex justify-center w-full">
          <Button
            // href={paymentLink}
            onClick={(e) => buyPlanFunction(e,price,plan_type)
            }
            className={cn(
              'w-full rounded-full flex items-center justify-center',
              'gap-2 bg-linear-to-r transition-colors duration-500  from-rose-800 to-rose-500',
              'hover:from-rose-500 hover:to-rose-800 text-white',
              'border-2 py-2',
              plan_type === 'pro'
                ? 'border-rose-900'
                : 'border-rose-100 from-rose-400 to-rose-500'
            )}
          >
            Buy Now <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function PricingSection() {
  const ref = useRef(null)
  const inView = useInView(ref,{once:true});

  return (
    <section className="relative overflow-hidden" id="pricing">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12 pb-12">
        <div className="flex items-center justify-center w-full">
          <h2 className="uppercase font-bold text-xl mb-8 text-rose-500">
            Pricing
          </h2>
        </div>
        <MotionDiv ref={ref} variants={fadeInUp} initial="hidden" animate = {inView?"show":"hidden"} className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {plans.map((plan) => (
              <PricingCard  key={plan.plan_type} {...plan} />
          ))}
        </MotionDiv>
      </div>
    </section>
  );
}
'use client';

import { Pizza } from 'lucide-react';
import { MotionDiv } from '../common/motion-wrapper';
import { fadeInParent, fadeInUp , fadeInRight } from '@/utils/motionConfig';
import { useRef } from 'react';
import { useInView } from 'motion/react';


export default function DemoSection() {

  const ref = useRef(null);
  const inView = useInView(ref , {once:true})

  
 return (
   <section className="relative">
     <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
       <MotionDiv variants={fadeInUp} initial="hidden" animate="show" className="flex flex-col items-center text-center space-y-4">
         <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-gray-100/80 backdrop-blur-xs border border-gray-500/20 mb-4">
           <Pizza className="w-6 h-6 text-rose-500" />
         </div>
         <div className="text-center mb-16">
           <h3 className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6">
             Watch how Briefly transforms{' '}
             <span className="bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
               this e/acc movement PDF
             </span>{' '}
             into an easy-to-read summary!
           </h3>
         </div>
       </MotionDiv>
       
       <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6">
         {/* Demo Summary Card */}
         <MotionDiv 
            ref={ref}

           variants={fadeInUp} 
           initial="hidden" 
           animate={inView?"show":"hidden"}
           className="relative px-4 py-6 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-rose-100/30 max-w-2xl w-full"
         >
           <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-orange-50/30 to-transparent opacity-50 rounded-3xl" />
           
           <div className="relative space-y-6">
             {/* Header */}
             <div className="text-center space-y-2">
               <div className="inline-flex items-center px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-sm font-medium">
                 <span className="w-2 h-2 bg-rose-500 rounded-full mr-2"></span>
                 AI Generated Summary
               </div>
               <h2 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                 The Effective Accelerationism Movement
               </h2>
             </div>

             {/* Content */}
             <MotionDiv className="space-y-4 text-left " ref={ref} variants={fadeInParent} initial="hidden" animate={inView?"show":"hidden"} >
               <MotionDiv variants={fadeInRight}  className="bg-gradient-to-br from-gray-200/10 to-gray-400/5 p-4 rounded-2xl border border-gray-500/10" >
                 <p className="text-lg text-muted-foreground/90 leading-relaxed">
                   ⚡ A techno-optimist philosophy advocating for rapid technological progress and acceleration of innovation.
                 </p>
               </MotionDiv>

               <MotionDiv  variants={fadeInRight} className="bg-gradient-to-br from-gray-200/10 to-gray-400/5 p-4 rounded-2xl border border-gray-500/10">
                 <p className="text-lg text-muted-foreground/90 leading-relaxed">
                   🚀 Believes technology is the primary driver of human flourishing and should be developed as quickly as possible.
                 </p>
               </MotionDiv>

               <MotionDiv  variants={fadeInRight} className="bg-gradient-to-br from-gray-200/10 to-gray-400/5 p-4 rounded-2xl border border-gray-500/10">
                 <p className="text-lg text-muted-foreground/90 leading-relaxed">
                   💡 Challenges regulatory constraints and advocates for minimal interference in technological development.
                 </p>
               </MotionDiv>

               <MotionDiv variants={fadeInRight}  className="bg-gradient-to-br from-gray-200/10 to-gray-400/5 p-4 rounded-2xl border border-gray-500/10">
                 <p className="text-lg text-muted-foreground/90 leading-relaxed">
                   🌟 Key focus areas include AI advancement, space exploration, and biotechnology innovation.
                 </p>
               </MotionDiv>
             </MotionDiv>

             {/* Footer */}
             <div className="flex items-center justify-between pt-4 border-t border-rose-100/50">
               <div className="flex items-center gap-2 text-sm text-muted-foreground">
               </div>
               <div className="text-sm text-muted-foreground">
                 2 min read → 20 sec summary
               </div>
             </div>
           </div>
         </MotionDiv>
       </div>
     </div>
   </section>
 );
}
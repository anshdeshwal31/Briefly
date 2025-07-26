"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Assuming this path is correct for your Button component
import { ArrowRight } from 'lucide-react';
import { MotionSection } from '../common/motion-wrapper';
import { useRef } from 'react';
import { useInView } from 'motion/react';
import { fadeInUp } from '@/utils/motionConfig';

export default function CTASection() {

  const ref1 = useRef(null)
  const inView = useInView(ref1, {once:true})

  
  return (
    <MotionSection ref={ref1} variants={fadeInUp} initial="hidden" animate={inView?"show":"hidden"} className="py-12 lg:py-24 relative">
      <div className="lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Save Hours of Reading Time?
            </h2>
            <p className="mx-auto max-w-2xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Transform lengthy documents into clear, actionable insights with
              our AI-powered summarizer.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <div className="">
              <Button
                size="lg"
                className="transition-colors w-full min-[400px]:w-auto bg-linear-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 transform hover:text-white text-white  duration-500 "
              >
                <Link
                  href="/#pricing"
                  className="flex items-center justify-center"
                >
                  Get Started{' '}
                  <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-10 h-72  w-[400px] bg-gradient-to-br from-teal-300 via-teal-400 to-teal-600 opacity-30 blur-3xl -z-10"></div>
      <div className="absolute bottom-[310px] left-[330px] h-72  w-[400px] bg-gradient-to-br from-teal-100 via-teal-600 to-teal-900 opacity-30 blur-3xl -z-10"></div>
    </MotionSection>
  );
}
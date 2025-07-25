import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { MotionDiv, MotionH1, MotionH2, MotionSection } from '../common/motion-wrapper';
import { fadeInParent,fadeInRight,fadeInUp } from '@/utils/motionConfig';

export default function HeroSection() {
  return (
    <MotionSection variants={fadeInParent} initial="hidden" animate="show"  className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl">
      <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
        {/* Placeholder for Sparkles component, not visible in provided image but typically found in similar patterns */}
        {/* <Sparkles className="absolute inset-0 h-full w-full" /> */}
      </div>

      <MotionH1 variants={fadeInUp} className="font-bold py-6 text-center">
        Transform PDFs into{' '}
        <span className="relative inline-block">
          <span className="relative z-10 px-2">concise</span>
          <span
            className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1"
            aria-hidden="true"
          ></span>
        </span>{' '}
        summaries
      </MotionH1>

      <MotionH2 variants={fadeInUp} className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600">
        Get a beautiful summary reel of the document in seconds.
      </MotionH2>

      <MotionDiv variants={fadeInUp} className="Button">
        <Link 
          href="/upload"
          className="text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6
          lg:mt-16 bg-linear-to-r from-slate-900 to-rose-500
          hover:from-rose-500 hover:to-slate-900 hover:no-underline
          font-bold shadow-lg  transition-colors duration-700 flex gap-2 items-center "
        >
          <span>Try Briefly</span>
          <ArrowRight className="animate-pulse" />
        </Link>
      </MotionDiv>
    </MotionSection>
  );
}
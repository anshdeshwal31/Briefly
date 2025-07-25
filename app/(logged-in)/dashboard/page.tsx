import BgGradient from '@/components/common/bg-gradient';
import SummaryCard from '@/components/summaries/summary-card';
import { Button } from '@/components/ui/button';
import { getSummaries } from '@/lib/summaries';
import { currentUser } from '@clerk/nextjs/server';
import { ArrowRight, Plus } from 'lucide-react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import EmptySummaryState from '@/components/summaries/empty-summary-state';
import { MotionDiv } from '@/components/common/motion-wrapper';
import { fadeInParent, fadeInUp } from '@/utils/motionConfig';

export default async function DashboardPage() {
  const uploadLimit = 5;

  const user = await currentUser()
  const userId:string|undefined = user?.id 

  if(!userId) return redirect('/sign-in')

  const summaries = await getSummaries(userId)

  return (
    <main className="min-h-screen">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
      <div className="container mx-auto flex flex-col gap-4">
        <MotionDiv variants={fadeInParent} initial="hidden" animate="show"  className="px-2 py-12 sm:py-24">
          <MotionDiv variants={fadeInUp} className="flex gap-4 mb-8 justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent">
                Your Summaries
              </h1>
              <p className="text-gray-600">
                Transform your PDFs into concise, actionable insights
              </p>
            </div>
            <Button
              variant={'link'}
              className="bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:scale-105 transition-all duration-300 group hover:no-underline"
            >
              <Link href="/upload" className="flex items-center text-white">
                <Plus className="w-5 h-5 mr-2" />
                New Summary
              </Link>
            </Button>
          </MotionDiv>


          {summaries.length==0?<EmptySummaryState/>:<MotionDiv variants={fadeInUp} className="z-10 relative grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
            {summaries.map((summary, index) => (
              <SummaryCard key={index} summary={summary} />
            ))}
          </MotionDiv>}
      <div>
          <div className='h-[100px] w-[250px] blur-3xl bg-teal-200/50 top-[200px] right-[50px] absolute'/>
          <div className='h-[100px] w-[450px] blur-3xl bg-teal-200/50 top-[600px] right-[50px] absolute'/>
          <div className='h-[100px] w-[650px] blur-3xl bg-teal-200/50 top-[600px] right-[50px] absolute'/>
      </div>
        </MotionDiv>
      </div>
    </main>
  );
}

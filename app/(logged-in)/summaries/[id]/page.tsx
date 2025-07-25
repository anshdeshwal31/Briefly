import { FileText } from 'lucide-react';
import { notFound } from 'next/navigation';
import BgGradient from '@/components/common/bg-gradient';
import { getSummaryById } from '@/lib/summaries';
import { SummaryHeader } from '@/components/summaries/summary-header';
import { SourceInfo } from '@/components/summaries/source-info';
import { SummaryViewer } from '@/components/summaries/summary-viewer';
import { MotionDiv } from '@/components/common/motion-wrapper';
import { fadeInUp } from '@/utils/motionConfig';
import { getDbConnection } from '@/lib/db';
import { auth, currentUser } from '@clerk/nextjs/server';
import SummarySkeleton from '@/components/summaries/summary-skeleton';

const hasActiveStatus = async () => {
  const user = await currentUser()
  const email = user?.primaryEmailAddress?.emailAddress
  const sql = await getDbConnection();
  const rows =  await sql`SELECT status FROM users WHERE email=${email}`;
  if(rows[0]?.status=='active') return true;
  return false;
}

export default async function SummaryPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;

  const summary = await getSummaryById(id);
    console.log("inside the summary page")
    // console.log({summary})
  if (!summary) {
    console.log("summary not found")
    notFound();
  }
  // console.log({summary})
  
  const { title, summary_text, file_name, word_count, created_at , original_file_url} = summary;
  const readingTime = Math.ceil((word_count|| 0)/200)

  const isActive = await hasActiveStatus();

  if(!isActive){
    return (
      <SummarySkeleton/>
    )
  }

  return (
    <div className="relative isolate min-h-screen bg-linear-to-b  ">
      <BgGradient className="from-teal-400 via-emerald-300 to-teal-200" />

      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
          <div className="flex flex-col">
            <SummaryHeader title={title} readingTime={readingTime} createdAt={created_at} />
          </div>

          {file_name && <SourceInfo fileName={file_name} originalFileUrl={original_file_url} title={title} summaryText={summary_text} createdAt={created_at}/>}

          <MotionDiv variants={fadeInUp} initial="hidden" animate="show" className="relative mt-4 sm:mt-8 lg:mt-16">
            <div className="relative p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100/30 transition-all duration-300 hover:shadow-2xl hover:bg-white/90 max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-linear-to-br from-rose-50/50 via-orange-50/30 to-transparent opacity-50 rounded-2xl sm:rounded-3xl" />

              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground bg-white/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-xs">
                <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-rose-400" />
                {word_count?.toLocaleString()} words
              <BgGradient/>
              </div>

              <div className="relative mt-8 sm:mt-6 flex justify-center">
                <SummaryViewer summary={summary_text} />
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </div>
  );
}

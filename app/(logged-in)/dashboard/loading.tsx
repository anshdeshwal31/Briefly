import BgGradient from '@/components/common/bg-gradient'
import { MotionDiv, MotionH1 } from '@/components/common/motion-wrapper'
import { Skeleton } from '@/components/ui/skeleton'
import { fadeInUp } from '@/utils/motionConfig'

function HeaderSkeleton() {
  return (
    <div className="flex gap-4 mb-8 justify-between">
      <div className="flex flex-col gap-2">
        <MotionH1
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          className="text-4xl font-bold tracking-tight"
        >
          <Skeleton className="h-12 w-64 bg-gradient-to-r from-rose-200/50 to-rose-300/50 rounded-xl" />
        </MotionH1>

        <MotionDiv
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="text-gray-600 mt-2"
        >
          <Skeleton className="h-6 w-96 bg-rose-100/60 rounded-lg" />
        </MotionDiv>
      </div>

      <MotionDiv
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        className="self-start"
      >
        <Skeleton className="h-12 w-36 bg-gradient-to-r from-rose-500/30 to-rose-600/30 rounded-full" />
      </MotionDiv>
    </div>
  )
}

function SummaryCardSkeleton() {
  return (
    <MotionDiv
      variants={fadeInUp}
      initial="hidden"
      animate="show"
      className="group relative bg-white/80 backdrop-blur-md rounded-2xl border border-rose-100/50 shadow-lg hover:shadow-xl transition-all duration-300 p-6 overflow-hidden"
    >
      {/* Decorative background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/30 via-transparent to-teal-50/20 opacity-60" />
      
      {/* Content skeletons */}
      <div className="relative space-y-4">
        {/* Header area */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Skeleton className="h-6 w-3/4 bg-rose-200/50 rounded-lg mb-2" />
            <Skeleton className="h-4 w-1/2 bg-rose-100/40 rounded" />
          </div>
          <Skeleton className="h-8 w-8 bg-rose-300/40 rounded-full" />
        </div>

        {/* Content lines */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-full bg-rose-100/50 rounded" />
          <Skeleton className="h-4 w-5/6 bg-rose-100/50 rounded" />
          <Skeleton className="h-4 w-4/5 bg-rose-100/50 rounded" />
        </div>

        {/* Tags area */}
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-6 w-16 bg-teal-200/40 rounded-full" />
          <Skeleton className="h-6 w-20 bg-rose-200/40 rounded-full" />
        </div>

        {/* Bottom stats */}
        <div className="flex items-center justify-between pt-4 border-t border-rose-100/30">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 bg-rose-300/50 rounded" />
            <Skeleton className="h-3 w-16 bg-rose-200/40 rounded" />
          </div>
          <Skeleton className="h-3 w-20 bg-teal-200/40 rounded" />
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
    </MotionDiv>
  )
}

function StatsBarSkeleton() {
  return (
    <MotionDiv
      variants={fadeInUp}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
    >
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="bg-white/70 backdrop-blur-md rounded-xl border border-rose-100/40 p-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 bg-gradient-to-br from-rose-400/40 to-rose-500/40 rounded-xl" />
            <div className="flex-1">
              <Skeleton className="h-4 w-16 bg-rose-200/50 rounded mb-1" />
              <Skeleton className="h-6 w-12 bg-rose-300/60 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </MotionDiv>
  )
}

export default function LoadingSummaries() {
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-rose-50/30 to-white">
      <BgGradient className="from-rose-300 via-rose-200 to-teal-200 opacity-40" />
      
      <section className="container px-4 sm:px-6 lg:px-8 py-12 lg:py-24 mx-auto flex flex-col gap-4 relative">
        <HeaderSkeleton />
        <StatsBarSkeleton />

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <SummaryCardSkeleton key={index} />
          ))}
        </div>

        {/* Additional loading indicators */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {[1, 2, 3].map((index) => (
              <Skeleton
                key={index}
                className="h-2 w-2 bg-rose-400/50 rounded-full animate-pulse"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-teal-200/20 to-teal-300/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-rose-200/20 to-rose-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  )
}

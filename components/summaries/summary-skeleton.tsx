import { Skeleton } from "@/components/ui/skeleton";
import BgGradient from '@/components/common/bg-gradient';

export default function SummarySkeleton() {
  return (
    <div className="relative isolate min-h-screen bg-linear-to-b from-rose-50/40 to-white">
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />

      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
          <div className="flex flex-col">
            {/* Summary Header Skeleton */}
            <div className="flex flex-col items-center text-center mb-8">
              <Skeleton className="h-8 w-3/4 max-w-2xl mb-4 bg-rose-100/50" />
              <div className="flex items-center gap-4 mb-2">
                <Skeleton className="h-5 w-20 bg-rose-100/50" />
                <Skeleton className="h-5 w-24 bg-rose-100/50" />
              </div>
              <Skeleton className="h-4 w-32 bg-rose-100/50" />
            </div>
          </div>

          {/* Source Info Skeleton */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 border border-rose-100/30 max-w-md w-full">
              <div className="flex items-center gap-3 mb-3">
                <Skeleton className="h-10 w-10 rounded bg-rose-100/50" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-3/4 mb-2 bg-rose-100/50" />
                  <Skeleton className="h-4 w-1/2 bg-rose-100/50" />
                </div>
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20 rounded-full bg-rose-100/50" />
                <Skeleton className="h-8 w-24 rounded-full bg-rose-100/50" />
              </div>
            </div>
          </div>

          {/* Main Summary Content Skeleton */}
          <div className="relative mt-4 sm:mt-8 lg:mt-16">
            <div className="relative p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100/30 max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-linear-to-br from-rose-50/50 via-orange-50/30 to-transparent opacity-50 rounded-2xl sm:rounded-3xl" />

              {/* Word count skeleton */}
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                <Skeleton className="h-7 w-20 rounded-full bg-rose-100/50" />
              </div>

              {/* Summary content skeleton */}
              <div className="relative mt-8 sm:mt-6 space-y-4">
                <Skeleton className="h-6 w-full bg-rose-100/50" />
                <Skeleton className="h-6 w-11/12 bg-rose-100/50" />
                <Skeleton className="h-6 w-10/12 bg-rose-100/50" />
                <Skeleton className="h-6 w-full bg-rose-100/50" />
                <Skeleton className="h-6 w-9/12 bg-rose-100/50" />
                
                <div className="py-4">
                  <Skeleton className="h-6 w-full bg-rose-100/50" />
                  <Skeleton className="h-6 w-10/12 bg-rose-100/50 mt-4" />
                  <Skeleton className="h-6 w-11/12 bg-rose-100/50 mt-4" />
                  <Skeleton className="h-6 w-9/12 bg-rose-100/50 mt-4" />
                </div>

                <div className="py-4">
                  <Skeleton className="h-6 w-full bg-rose-100/50" />
                  <Skeleton className="h-6 w-8/12 bg-rose-100/50 mt-4" />
                  <Skeleton className="h-6 w-10/12 bg-rose-100/50 mt-4" />
                </div>

                <div className="py-4">
                  <Skeleton className="h-6 w-11/12 bg-rose-100/50" />
                  <Skeleton className="h-6 w-full bg-rose-100/50 mt-4" />
                  <Skeleton className="h-6 w-9/12 bg-rose-100/50 mt-4" />
                  <Skeleton className="h-6 w-10/12 bg-rose-100/50 mt-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
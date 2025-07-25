import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-100/50 flex items-center justify-center p-4 sm:p-6">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-rose-600/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-rose-100/50 p-8 sm:p-12 max-w-lg w-full text-center">
        {/* Premium Badge Skeleton */}
        <div className="flex justify-center mb-8">
          <Skeleton className="h-8 w-40 rounded-full bg-rose-500/10" />
        </div>

        {/* Main Heading Skeleton */}
        <div className="mb-4">
          <Skeleton className="h-10 w-3/4 mx-auto bg-rose-500/10" />
        </div>

        {/* Subheading Skeleton */}
        <div className="mb-6">
          <Skeleton className="h-6 w-1/2 mx-auto bg-rose-500/10" />
        </div>

        {/* Description Skeleton */}
        <div className="space-y-3 mb-8">
          <Skeleton className="h-4 w-full bg-rose-500/10" />
          <Skeleton className="h-4 w-5/6 mx-auto bg-rose-500/10" />
          <Skeleton className="h-4 w-4/6 mx-auto bg-rose-500/10" />
        </div>

        {/* Features Preview Skeleton */}
        <div className="bg-rose-50/50 rounded-2xl p-6 mb-8 border border-rose-100/50">
          {/* Features title */}
          <Skeleton className="h-5 w-32 mx-auto mb-4 bg-rose-500/10" />
          
          {/* Feature list */}
          <div className="space-y-3">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <Skeleton className="w-5 h-5 rounded-full bg-rose-500/20 shrink-0" />
                <Skeleton className="h-4 flex-1 bg-rose-500/10" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons Skeleton */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Skeleton className="flex-1 h-12 rounded-xl bg-gradient-to-r from-rose-500/20 to-rose-600/20" />
          <Skeleton className="flex-1 h-12 rounded-xl bg-gray-200/50" />
        </div>

        {/* Trust indicator Skeleton */}
        <Skeleton className="h-3 w-48 mx-auto bg-rose-500/10" />
      </div>
    </div>
  );
}
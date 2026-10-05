import React from 'react';

export const DailyChallengeSkeleton = () => {
  return (
    <div className="min-h-screen bg-slate-50/60 py-10 animate-fade-in-up">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Header Skeleton */}
        <div className="text-center space-y-2">
          <div className="w-36 h-6 rounded-full skeleton-shimmer mx-auto" />
          <div className="w-64 h-8 rounded-xl skeleton-shimmer mx-auto" />
          <div className="w-80 h-4 rounded-lg skeleton-shimmer mx-auto" />
        </div>

        {/* Streak and stats bar */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex justify-between items-center">
          <div className="w-28 h-6 rounded-full skeleton-shimmer" />
          <div className="w-24 h-6 rounded-full skeleton-shimmer" />
        </div>

        {/* Question Card Skeleton */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div className="w-24 h-6 rounded-full skeleton-shimmer" />
            <div className="w-20 h-6 rounded-full skeleton-shimmer" />
          </div>

          <div className="space-y-2">
            <div className="w-full h-5 rounded-lg skeleton-shimmer" />
            <div className="w-3/4 h-5 rounded-lg skeleton-shimmer" />
          </div>

          {/* 4 Options Skeletons */}
          <div className="space-y-3 pt-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 flex items-center gap-3">
                <div className="w-6 h-6 rounded-full skeleton-shimmer shrink-0" />
                <div className="w-3/4 h-4 rounded skeleton-shimmer" />
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <div className="w-24 h-4 rounded skeleton-shimmer" />
            <div className="w-32 h-10 rounded-xl skeleton-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyChallengeSkeleton;

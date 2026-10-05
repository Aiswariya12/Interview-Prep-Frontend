import React from 'react';

export const BookmarksSkeleton = () => {
  return (
    <div className="min-h-screen bg-slate-50/60 py-8 sm:py-10 animate-fade-in-up">
      <div className="max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Header Skeleton */}
        <div className="space-y-2">
          <div className="w-32 h-6 rounded-full skeleton-shimmer" />
          <div className="w-64 h-8 rounded-xl skeleton-shimmer" />
          <div className="w-80 h-4 rounded-lg skeleton-shimmer" />
        </div>

        {/* Question Cards Skeleton */}
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-20 h-6 rounded-full skeleton-shimmer" />
                  <div className="w-16 h-6 rounded-full skeleton-shimmer" />
                </div>
                <div className="w-8 h-8 rounded-xl skeleton-shimmer" />
              </div>
              <div className="w-3/4 h-5 rounded-lg skeleton-shimmer" />
              <div className="w-full h-12 rounded-xl skeleton-shimmer" />
              <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                <div className="w-24 h-4 rounded skeleton-shimmer" />
                <div className="w-20 h-7 rounded-lg skeleton-shimmer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookmarksSkeleton;

import React from 'react';

export const TestHistorySkeleton = () => {
  return (
    <div className="min-h-screen bg-slate-50/60 py-8 sm:py-10 animate-fade-in-up">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="w-32 h-6 rounded-full skeleton-shimmer" />
            <div className="w-64 h-8 rounded-xl skeleton-shimmer" />
            <div className="w-80 h-4 rounded-lg skeleton-shimmer" />
          </div>
          <div className="w-36 h-10 rounded-xl skeleton-shimmer" />
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex justify-between items-center">
                <div className="w-20 h-3 rounded skeleton-shimmer" />
                <div className="w-5 h-5 rounded-lg skeleton-shimmer" />
              </div>
              <div className="w-14 h-7 rounded-lg skeleton-shimmer" />
              <div className="w-24 h-2.5 rounded skeleton-shimmer" />
            </div>
          ))}
        </div>

        {/* Performance Trend Chart Skeleton */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div className="space-y-1">
              <div className="w-48 h-4 rounded skeleton-shimmer" />
              <div className="w-64 h-3 rounded skeleton-shimmer" />
            </div>
            <div className="w-24 h-6 rounded-full skeleton-shimmer" />
          </div>
          <div className="h-56 w-full rounded-2xl skeleton-shimmer" />
        </div>

        {/* Test List Skeleton */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
          <div className="w-40 h-5 rounded skeleton-shimmer pb-2 border-b border-slate-100" />
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl skeleton-shimmer shrink-0" />
                  <div className="space-y-1.5">
                    <div className="w-36 sm:w-48 h-4 rounded skeleton-shimmer" />
                    <div className="w-24 h-3 rounded skeleton-shimmer" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-7 rounded-xl skeleton-shimmer" />
                  <div className="w-20 h-8 rounded-xl skeleton-shimmer hidden sm:block" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestHistorySkeleton;

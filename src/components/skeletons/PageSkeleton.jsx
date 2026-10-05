import React from 'react';

export const PageSkeleton = () => {
  return (
    <div className="min-h-screen bg-slate-50/60 pb-16 animate-fade-in-up">
      {/* Top Header Placeholder */}
      <div className="bg-white border-b border-slate-200/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="w-36 h-6 rounded-full skeleton-shimmer" />
          <div className="w-64 sm:w-80 h-8 rounded-xl skeleton-shimmer" />
          <div className="w-72 sm:w-96 h-4 rounded-lg skeleton-shimmer" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Metric cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="w-20 h-3 rounded skeleton-shimmer" />
              <div className="w-14 h-7 rounded-lg skeleton-shimmer" />
              <div className="w-24 h-2.5 rounded skeleton-shimmer" />
            </div>
          ))}
        </div>

        {/* Content Card Placeholder */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
          <div className="w-48 h-6 rounded-lg skeleton-shimmer" />
          <div className="w-full h-32 rounded-2xl skeleton-shimmer" />
          <div className="space-y-2">
            <div className="w-full h-4 rounded skeleton-shimmer" />
            <div className="w-5/6 h-4 rounded skeleton-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;

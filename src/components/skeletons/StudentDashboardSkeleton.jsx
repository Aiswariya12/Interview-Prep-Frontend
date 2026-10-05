import React from 'react';

export const StudentDashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-slate-50/60 pb-16 animate-fade-in-up">
      {/* Top Banner / Student Welcome Skeleton */}
      <div className="bg-gradient-to-r from-white via-indigo-50/30 to-white border-b border-slate-200/80 py-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-36 h-6 rounded-full skeleton-shimmer" />
                <div className="w-24 h-4 rounded skeleton-shimmer hidden sm:block" />
              </div>
              <div className="w-64 sm:w-80 h-8 rounded-xl skeleton-shimmer" />
              <div className="w-72 sm:w-96 h-4 rounded-lg skeleton-shimmer" />
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto">
              <div className="flex-1 sm:flex-none w-24 h-10 rounded-xl skeleton-shimmer" />
              <div className="flex-1 sm:flex-none w-28 h-10 rounded-xl skeleton-shimmer" />
              <div className="w-full sm:w-36 h-10 rounded-xl skeleton-shimmer" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* 6 Metric Cards Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-16 h-3 rounded skeleton-shimmer" />
                <div className="w-5 h-5 rounded-lg skeleton-shimmer" />
              </div>
              <div className="w-14 h-7 rounded-lg skeleton-shimmer" />
              <div className="w-20 h-2.5 rounded skeleton-shimmer" />
            </div>
          ))}
        </div>

        {/* Diagnostic & Recommendation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weak Topic Diagnostic Radar Skeleton */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg skeleton-shimmer" />
                    <div className="w-48 h-5 rounded-lg skeleton-shimmer" />
                  </div>
                  <div className="w-64 h-3.5 rounded skeleton-shimmer" />
                </div>
                <div className="w-28 h-8 rounded-xl skeleton-shimmer" />
              </div>

              {/* Topic item rows skeleton */}
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="w-32 sm:w-44 h-4 rounded skeleton-shimmer" />
                      <div className="w-14 h-5 rounded-full skeleton-shimmer" />
                    </div>
                    <div className="w-full h-2 rounded-full skeleton-shimmer" />
                    <div className="flex justify-between">
                      <div className="w-24 h-3 rounded skeleton-shimmer" />
                      <div className="w-16 h-3 rounded skeleton-shimmer" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Curated Subject Note Links Skeleton */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl skeleton-shimmer" />
                  <div className="space-y-1">
                    <div className="w-44 h-4 rounded skeleton-shimmer" />
                    <div className="w-60 h-3 rounded skeleton-shimmer" />
                  </div>
                </div>
              </div>

              {/* Filter Pills Skeleton */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-20 h-7 rounded-xl skeleton-shimmer shrink-0" />
                ))}
              </div>

              {/* Notes Grid Skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="p-4 rounded-2xl border border-slate-200/80 bg-white space-y-2.5">
                    <div className="flex justify-between items-center">
                      <div className="w-20 h-4 rounded-full skeleton-shimmer" />
                      <div className="w-4 h-4 rounded skeleton-shimmer" />
                    </div>
                    <div className="w-36 h-4 rounded skeleton-shimmer" />
                    <div className="w-full h-3 rounded skeleton-shimmer" />
                  </div>
                ))}
              </div>
            </div>

            {/* Subject Performance Breakdown Skeleton */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="w-48 h-5 rounded skeleton-shimmer" />
                <div className="w-20 h-4 rounded skeleton-shimmer" />
              </div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <div className="w-28 h-4 rounded skeleton-shimmer" />
                      <div className="w-12 h-4 rounded skeleton-shimmer" />
                    </div>
                    <div className="w-full h-2.5 rounded-full skeleton-shimmer" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (1 Col) */}
          <div className="space-y-8">
            {/* Daily Challenge Card Skeleton */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-500/20 shadow-xl space-y-4">
              <div className="flex justify-between items-center">
                <div className="w-28 h-5 rounded-full skeleton-shimmer-subtle" />
                <div className="w-16 h-5 rounded-full skeleton-shimmer-subtle" />
              </div>
              <div className="w-44 h-6 rounded-lg skeleton-shimmer-subtle" />
              <div className="w-full h-12 rounded-xl skeleton-shimmer-subtle" />
              <div className="w-full h-10 rounded-xl skeleton-shimmer-subtle" />
            </div>

            {/* Recent Test History Skeleton */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <div className="w-32 h-5 rounded skeleton-shimmer" />
                <div className="w-16 h-4 rounded skeleton-shimmer" />
              </div>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl skeleton-shimmer shrink-0" />
                      <div className="space-y-1.5">
                        <div className="w-24 sm:w-28 h-4 rounded skeleton-shimmer" />
                        <div className="w-16 h-3 rounded skeleton-shimmer" />
                      </div>
                    </div>
                    <div className="w-12 h-6 rounded-full skeleton-shimmer" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardSkeleton;

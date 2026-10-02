import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { analyticsApi, dailyChallengeApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import AIStudyCoachModal from '../../components/AIStudyCoachModal';
import {
  Sparkles,
  Trophy,
  Flame,
  CheckCircle2,
  TrendingUp,
  Clock,
  BookOpen,
  ArrowRight,
  AlertTriangle,
  Calendar,
  Layers,
  BarChart3,
  Award,
  ChevronRight
} from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [dailyChallenge, setDailyChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiCoachOpen, setAiCoachOpen] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [dashRes, challengeRes] = await Promise.allSettled([
        analyticsApi.getStudentDashboard(),
        dailyChallengeApi.getToday(),
      ]);

      if (dashRes.status === 'fulfilled') {
        setDashboard(dashRes.value.data.data);
      }
      if (challengeRes.status === 'fulfilled') {
        setDailyChallenge(challengeRes.value.data.data);
      }
    } catch (err) {
      console.error('Error fetching dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-semibold text-slate-500">Loading your performance analytics...</p>
        </div>
      </div>
    );
  }

  const weakTopics = dashboard?.weakTopics || [];
  const recentTests = dashboard?.recentTests || [];
  const subjectPerformances = dashboard?.subjectPerformances || [];

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Top Banner / Student Welcome */}
      <div className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                  Student Dashboard
                </span>
                <span className="text-xs text-slate-400 font-medium">• {user?.college || 'Computer Science'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Welcome back, {user?.name || 'Candidate'}!
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Continuous mock evaluation and real-time accuracy diagnostics for technical placements.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setAiCoachOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-200 flex items-center gap-2 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                AI Interview Coach
              </button>

              <Link
                to="/mock/new"
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-200 flex items-center gap-2 transition-all hover:scale-[1.02]"
              >
                <BookOpen className="w-4 h-4" />
                Start Mock Test
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold text-slate-500">Total Tests</span>
              <BookOpen className="w-4 h-4 text-indigo-500" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900">{dashboard?.totalTests || 0}</p>
            <p className="text-[11px] text-slate-400 mt-1">Completed Mocks</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold text-slate-500">Average Score</span>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-extrabold text-emerald-600">{dashboard?.averageScore || 0}%</p>
            <p className="text-[11px] text-slate-400 mt-1">Overall Mean</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold text-slate-500">Accuracy</span>
              <CheckCircle2 className="w-4 h-4 text-sky-500" />
            </div>
            <p className="text-2xl font-extrabold text-sky-600">{dashboard?.accuracy || 0}%</p>
            <p className="text-[11px] text-slate-400 mt-1">Correct / Attempted</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold text-slate-500">Questions</span>
              <BarChart3 className="w-4 h-4 text-violet-500" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900">{dashboard?.questionsSolved || 0}</p>
            <p className="text-[11px] text-slate-400 mt-1">Attempted in Tests</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold text-slate-500">Best Score</span>
              <Trophy className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-extrabold text-amber-600">{dashboard?.bestScore || 0}%</p>
            <p className="text-[11px] text-slate-400 mt-1">Personal Record</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold text-slate-500">Active Streak</span>
              <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />
            </div>
            <p className="text-2xl font-extrabold text-rose-600">{dashboard?.streakDays || 1} Days</p>
            <p className="text-[11px] text-slate-400 mt-1">Continuous Practice</p>
          </div>
        </div>

        {/* Weak Topic Detection Alert Card */}
        {weakTopics.length > 0 && (
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-rose-500/5 to-transparent border border-amber-200/80 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    ⚠ Weak Topic Detection Alert
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      Needs Attention
                    </span>
                  </h3>
                  <p className="text-xs text-slate-600">
                    The platform diagnosed sub-topics where your accuracy is below 70%. Take targeted quizzes to convert them into strengths.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAiCoachOpen(true)}
                className="text-xs font-semibold text-amber-800 hover:text-amber-900 flex items-center gap-1 shrink-0"
              >
                View Diagnostic Recommendations <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {weakTopics.slice(0, 3).map((wt, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white border border-amber-200/60 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">{wt.topicName}</span>
                      <span className="text-[11px] font-bold text-rose-600">{wt.accuracyPercentage}%</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium">{wt.subjectName}</p>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1">{wt.recommendation}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/mock/new?subjectId=${wt.subjectId}&topicId=${wt.topicId}`)}
                    className="mt-3 w-full py-1.5 px-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    Take Topic Quiz <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Daily Challenge Card */}
        {dailyChallenge && (
          <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-xs">
                <Calendar className="w-3.5 h-3.5" />
                <span>Today's Daily Challenge</span>
              </div>
              <h3 className="text-xl font-bold">{dailyChallenge.title}</h3>
              <p className="text-xs text-emerald-100 max-w-xl leading-relaxed">
                {dailyChallenge.description} Earn +50 streak bonus points and unlock the "Daily Grinder" achievement.
              </p>
            </div>
            <Link
              to="/daily-challenge"
              className="px-6 py-3 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-xs shadow-md transition-all shrink-0 text-center"
            >
              Start 5-Minute Challenge &rarr;
            </Link>
          </div>
        )}

        {/* Two-Column Section: Subject Accuracy Breakdown + Recent Tests */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Subject Performance Bars */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-600" />
                Subject Performance
              </h3>
              <span className="text-xs text-slate-400 font-medium">Accuracy %</span>
            </div>

            {subjectPerformances.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">
                Take your first mock test to generate subject-level accuracy telemetry.
              </p>
            ) : (
              <div className="space-y-4">
                {subjectPerformances.map((sp) => (
                  <div key={sp.subjectId} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">{sp.subjectName}</span>
                      <span className="font-bold text-slate-700">
                        {sp.accuracyPercentage}%{' '}
                        <span className="text-[10px] text-slate-400 font-normal">({sp.testsTaken} tests)</span>
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.max(sp.accuracyPercentage, 5)}%`,
                          backgroundColor:
                            sp.accuracyPercentage >= 75
                              ? '#10b981'
                              : sp.accuracyPercentage >= 50
                              ? '#3b82f6'
                              : '#f59e0b',
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Mock Tests History */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                Recent Mock Assessments
              </h3>
              <Link to="/history" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">
                View All History &rarr;
              </Link>
            </div>

            {recentTests.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-sm font-semibold text-slate-700">No mock tests attempted yet</p>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Start your first mock test to experience randomized question selection, timer simulation, and automated scoring.
                </p>
                <Link
                  to="/mock/new"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-xs hover:bg-indigo-700 transition-colors"
                >
                  Configure Test Now <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 overflow-x-auto">
                {recentTests.map((t) => (
                  <div key={t.id} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{t.subjectName}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded font-medium bg-slate-100 text-slate-600">
                          {t.topicName}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded font-medium bg-indigo-50 text-indigo-700">
                          {t.difficulty}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {new Date(t.createdAt).toLocaleDateString()} • {t.totalQuestions} Questions • {t.timeTakenSeconds}s taken
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span
                          className={`text-sm font-extrabold ${
                            t.percentage >= 70
                              ? 'text-emerald-600'
                              : t.percentage >= 40
                              ? 'text-amber-600'
                              : 'text-rose-600'
                          }`}
                        >
                          {t.percentage}%
                        </span>
                        <p className="text-[10px] text-slate-400 font-medium">
                          {t.score}/{t.maxScore} pts
                        </p>
                      </div>

                      <button
                        onClick={() => navigate(`/mock/results/${t.id}`)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-indigo-400 text-xs font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
                      >
                        View Analysis
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Interview Coach Modal */}
      <AIStudyCoachModal
        isOpen={aiCoachOpen}
        onClose={() => setAiCoachOpen(false)}
        contextData={{
          weakTopics,
          score: dashboard?.averageScore,
          percentage: dashboard?.accuracy,
        }}
      />
    </div>
  );
};

export default StudentDashboard;

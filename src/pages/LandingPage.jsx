import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { subjectApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  BarChart3,
  Brain,
  Code2,
  Database,
  Coffee,
  Leaf,
  Atom,
  Server,
  Cpu,
  Network,
  Binary,
  Users,
  HelpCircle,
} from 'lucide-react';
import heroBg from '../assets/Modern Tech Dashboard Hero Illustration.png';

const iconMap = {
  Coffee, Leaf, Atom, Code2, Database, Binary, Server, Cpu, Network, Brain,
};

const LandingPage = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    subjectApi.getAllActive()
      .then((res) => { setSubjects(res.data.data || []); })
      .catch((err) => { console.error('Failed to load subjects:', err); })
      .finally(() => { setLoading(false); });
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* ═══════════════════════════════════════════════
          HERO SECTION — Responsive Hero with Device-Adaptive Background
      ═══════════════════════════════════════════════ */}
      <section
        className="relative hero-device-responsive border-b border-slate-200 bg-gradient-to-b from-[#eef5fe] via-[#f3f7fd] to-slate-50 py-7 sm:py-10 lg:py-0 lg:h-[calc(100vh-4rem)] lg:min-h-[580px] lg:max-h-[860px] flex items-center overflow-hidden"
        style={{ '--hero-bg': `url("${heroBg}")` }}
      >
        {/* Soft responsive overlay for mobile/tablets so text is always 100% legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent/40 sm:to-transparent lg:from-white/30 lg:via-transparent lg:to-transparent pointer-events-none" />

        {/* Ambient Decorative Dot Matrix Elements matching the mockup */}
        <div className="absolute bottom-4 left-4 grid grid-cols-4 gap-2 opacity-20 pointer-events-none">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          ))}
        </div>
        <div className="absolute top-1/2 right-3 -translate-y-1/2 hidden sm:grid grid-cols-4 gap-2 opacity-25 pointer-events-none">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-6 w-full z-10">
          <div className="w-full lg:w-[50%] max-w-lg lg:max-w-[540px] space-y-3 sm:space-y-4 text-left">

            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-indigo-100 text-indigo-700 text-[11px] sm:text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>Full Stack Mock Assessment &amp; Interview Analytics</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl lg:text-[2.65rem] xl:text-[2.85rem] font-extrabold text-slate-900 tracking-tight leading-[1.18] max-w-[270px] xs:max-w-[320px] sm:max-w-none">
              Master Technical
              <br />
              Interviews with{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Data-Driven Precision
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-[14px] lg:text-base text-slate-600 leading-relaxed max-w-[280px] xs:max-w-[340px] sm:max-w-md">
              Simulated exam environments for Java, Spring Boot, React, MySQL, DSA &amp; CS Fundamentals.
              Randomized question generation, instant grading, in-depth explanations, and AI-driven weak
              topic detection.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              {isAuthenticated ? (
                <Link
                  to={isAdmin ? '/admin' : '/dashboard'}
                  className="w-full sm:w-auto px-6 py-3.5 sm:py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 flex items-center justify-center gap-2 transition-all text-sm sm:text-base group"
                >
                  Go to {isAdmin ? 'Admin Portal' : 'Student Dashboard'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="w-full sm:w-auto px-6 py-3.5 sm:py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 flex items-center justify-center gap-2 transition-all text-sm sm:text-base group"
                  >
                    Start Free Mock Practice
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/login"
                    className="w-full sm:w-auto px-6 py-3.5 sm:py-3 rounded-xl bg-white/95 backdrop-blur-sm border border-slate-300 hover:bg-white text-slate-800 font-semibold shadow-xs flex items-center justify-center gap-2 transition-all text-sm sm:text-base"
                  >
                    Live Demo Login
                  </Link>
                </>
              )}
            </div>

            {/* Metric Stat Cards — Matching the exact reference screenshot styling */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 pt-2 max-w-lg">
              {/* Card 1: 10+ Core Tech Subjects */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3.5 shadow-sm border border-slate-100/90 flex items-center gap-2.5 sm:gap-3 transition-all hover:shadow-md hover:-translate-y-0.5">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-xs">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <p className="text-sm sm:text-lg font-black text-slate-900 leading-tight">10+</p>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate mt-0.5">Core Tech Subjects</p>
                </div>
              </div>

              {/* Card 2: 1,000+ Vetted Questions */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3.5 shadow-sm border border-slate-100/90 flex items-center gap-2.5 sm:gap-3 transition-all hover:shadow-md hover:-translate-y-0.5">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 shadow-xs">
                  <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <p className="text-sm sm:text-lg font-black text-slate-900 leading-tight">1,000+</p>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate mt-0.5">Vetted Questions</p>
                </div>
              </div>

              {/* Card 3: 100% Detailed Solutions */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3.5 shadow-sm border border-slate-100/90 flex items-center gap-2.5 sm:gap-3 transition-all hover:shadow-md hover:-translate-y-0.5">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <p className="text-sm sm:text-lg font-black text-emerald-600 leading-tight">100%</p>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate mt-0.5">Detailed Solutions</p>
                </div>
              </div>

              {/* Card 4: AI Coach Weak Area Radar */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3.5 shadow-sm border border-slate-100/90 flex items-center gap-2.5 sm:gap-3 transition-all hover:shadow-md hover:-translate-y-0.5">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 shadow-xs">
                  <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <p className="text-sm sm:text-lg font-black text-violet-600 leading-tight">AI Coach</p>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate mt-0.5">Weak Area Radar</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FEATURE HIGHLIGHTS
      ═══════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">Platform Capabilities</h2>
          <p className="text-3xl font-extrabold text-slate-900">Engineered for Technical Mastery</p>
          <p className="text-sm text-slate-600 mt-2">
            Every feature is architected to mirror high-stakes campus and product company placement assessments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mb-5">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Dynamic Mock Engine</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Randomizes questions dynamically based on selected subjects, topics, and difficulty levels.
              Includes real-time countdown timer, question navigation palette, and auto-submit on timeout.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-5">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Granular Performance Analytics</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Instant evaluation with configurable negative marking, accuracy calculations, time analytics,
              and interactive Recharts donut and bar breakdowns.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-violet-50 border border-violet-100 text-violet-600 flex items-center justify-center mb-5">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Weak Topic Diagnostic Radar</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Identifies sub-topics where accuracy falls below 65%. Automatically suggests targeted drills
              and curated revision strategies to close conceptual gaps.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SUBJECT TRACKS SHOWCASE
      ═══════════════════════════════════════════════ */}
      <section className="py-16 bg-slate-100/70 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">Curriculum Spectrum</h2>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">Explore Examination Modules</p>
            </div>
            <Link
              to="/mock/new"
              className="mt-4 md:mt-0 text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5"
            >
              Configure Custom Mock Test <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-40 bg-white rounded-2xl border border-slate-200 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((sub) => {
                const IconComponent = iconMap[sub.icon] || Code2;
                return (
                  <div
                    key={sub.id}
                    className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm"
                          style={{ backgroundColor: sub.color || '#4f46e5' }}
                        >
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                          {sub.topics ? `${sub.topics.length} Subtopics` : 'Curated Track'}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                        {sub.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{sub.description}</p>
                    </div>
                    <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-400">Randomized Bank</span>
                      <button
                        onClick={() => navigate(`/mock/new?subjectId=${sub.id}`)}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                      >
                        Start Test <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PRODUCTION ARCHITECTURE BANNER
      ═══════════════════════════════════════════════ */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-12 text-white border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-800">
                Enterprise Full-Stack Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Built to Impress Technical Recruiters
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Featuring decoupled Vite+React frontend, Spring Boot 3 layered REST APIs, BCrypt &amp;
                JWT stateless security, Spring Data JPA / Hibernate ORM, and MySQL schema design.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Controller-Service-Repo Layers</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Stateless JWT Filter Chains</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> OpenAPI / Swagger UI Ready</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Cloud Deploy Ready</div>
              </div>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 font-mono text-xs text-slate-300 space-y-2 shadow-inner">
              <div className="flex items-center gap-2 text-slate-400 pb-2 border-b border-slate-700">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-[11px] ml-2">system-architecture.json</span>
              </div>
              <p className="text-indigo-400 font-semibold">// Live Production Flow</p>
              <p><span className="text-purple-400">React Frontend</span> &rarr; Vercel Deployment</p>
              <p><span className="text-sky-400">Spring Boot API</span> &rarr; Render / Railway Host</p>
              <p><span className="text-emerald-400">MySQL Database</span> &rarr; Managed Cloud Engine</p>
              <p><span className="text-amber-400">Security</span> &rarr; Role-Based Authorization (Student/Admin)</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;

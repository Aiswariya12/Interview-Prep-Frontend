import React from 'react';
import { GraduationCap, Shield, Code, Database, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white">
                Interview<span className="text-indigo-400">Prep</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              An enterprise-grade Full Stack Interview Preparation &amp; Mock Assessment Platform.
              Practice subject-wise simulated examinations with randomized question pools,
              automated grading, comprehensive concept explanations, and AI-driven weak topic diagnostics.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono">React 18</span>
              <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono">Spring Boot 3</span>
              <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono">MySQL 8</span>
              <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono">JWT Security</span>
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">Preparation Tracks</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-white transition-colors cursor-pointer">Core Java &amp; Concurrency</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Spring Boot &amp; Microservices</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">React &amp; JavaScript ES6+</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">MySQL &amp; Relational Indexing</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Data Structures &amp; Algorithms</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">Architecture &amp; Security</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-400" /> BCrypt &amp; JWT Bearer</li>
              <li className="flex items-center gap-2"><Database className="w-4 h-4 text-sky-400" /> Hibernate / Spring JPA</li>
              <li className="flex items-center gap-2"><Code className="w-4 h-4 text-indigo-400" /> Layered Architecture</li>
              <li className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-amber-400" /> AI Diagnostic Coach</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} InterviewPrep Platform. Built for Technical Excellence &amp; Real-World Mastery.</p>
          <div className="flex items-center gap-6">
            <span>Production Architecture Ready</span>
            <span>REST API v1</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

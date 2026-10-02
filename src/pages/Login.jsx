import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Lock, Mail, ArrowRight, AlertCircle, ShieldAlert, UserCheck } from 'lucide-react';

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const redirectPath = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    const res = await login(email, password);
    if (res.success) {
      if (res.user.role === 'ROLE_ADMIN') {
        navigate('/admin');
      } else {
        navigate(redirectPath === '/' ? '/dashboard' : redirectPath);
      }
    } else {
      setError(res.error);
    }
  };

  const fillDemo = (role) => {
    if (role === 'student') {
      setEmail('student@interviewprep.com');
      setPassword('Student@123');
    } else if (role === 'admin') {
      setEmail('admin@interviewprep.com');
      setPassword('Admin@123');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-200/80">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-indigo-50 text-indigo-600 shadow-xs mb-2">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back
          </h2>
          <p className="text-xs text-slate-500">
            Sign in to resume mock preparations and track performance metrics
          </p>
        </div>

        {/* 1-Click Demo Buttons for Fast Evaluation */}
        <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-indigo-600" /> Quick Demo Credentials
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillDemo('student')}
              className="py-1.5 px-2.5 rounded-lg bg-white border border-indigo-200 hover:border-indigo-400 text-xs font-semibold text-indigo-700 shadow-xs transition-colors text-left"
            >
              <span className="block text-[10px] text-slate-400 font-normal">Student Role</span>
              Demo Student
            </button>
            <button
              type="button"
              onClick={() => fillDemo('admin')}
              className="py-1.5 px-2.5 rounded-lg bg-white border border-indigo-200 hover:border-indigo-400 text-xs font-semibold text-slate-800 shadow-xs transition-colors text-left"
            >
              <span className="block text-[10px] text-slate-400 font-normal">Admin Role</span>
              Demo Admin
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@college.edu"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold text-sm shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition-all mt-6"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                Sign In to Platform
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-700">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

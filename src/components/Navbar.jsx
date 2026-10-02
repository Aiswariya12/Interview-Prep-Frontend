import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap,
  Flame,
  LayoutDashboard,
  BookOpen,
  History,
  Bookmark,
  Calendar,
  ShieldAlert,
  LogOut,
  User as UserIcon,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, isStudent, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-700 bg-clip-text text-transparent">
                  Interview<span className="text-indigo-600">Prep</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
                  Full Stack Assessment
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            {isAuthenticated && (
              <div className="hidden md:flex items-center ml-10 space-x-1">
                {isStudent && (
                  <>
                    <Link
                      to="/dashboard"
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive('/dashboard')
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>

                    <Link
                      to="/mock/new"
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive('/mock/new')
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                      Take Mock Test
                    </Link>

                    <Link
                      to="/history"
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive('/history')
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <History className="w-4 h-4" />
                      Past Tests
                    </Link>

                    <Link
                      to="/bookmarks"
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive('/bookmarks')
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" />
                      Bookmarks
                    </Link>

                    <Link
                      to="/daily-challenge"
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive('/daily-challenge')
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      Daily Challenge
                    </Link>
                  </>
                )}

                {isAdmin && (
                  <Link
                    to="/admin"
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/admin')
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <ShieldAlert className="w-4 h-4 text-indigo-600" />
                    Admin Portal
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Right Header: Streak & Profile or Login/Register */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {isStudent && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-amber-800 text-xs font-semibold shadow-xs">
                    <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
                    <span>Active Streak</span>
                  </div>
                )}

                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="text-left text-xs">
                      <p className="font-semibold text-slate-800 leading-tight truncate max-w-[120px]">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium">
                        {isAdmin ? 'Admin' : 'Student'}
                      </p>
                    </div>
                  </button>

                  {userDropdownOpen && (
                    <div
                      onMouseLeave={() => setUserDropdownOpen(false)}
                      className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50"
                    >
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs font-semibold text-slate-900 truncate">{user?.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                        {user?.college && (
                          <p className="text-[11px] text-indigo-600 mt-1 truncate">{user.college}</p>
                        )}
                      </div>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                        >
                          <ShieldAlert className="w-4 h-4 text-indigo-600" />
                          Admin Dashboard
                        </Link>
                      )}

                      {isStudent && (
                        <Link
                          to="/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                        >
                          <LayoutDashboard className="w-4 h-4 text-slate-500" />
                          Student Dashboard
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 text-left transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm hover:shadow transition-all"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          {isAuthenticated ? (
            <>
              <div className="pb-3 border-b border-slate-100 mb-2">
                <p className="font-semibold text-slate-900 text-sm">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>

              {isStudent && (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-100"
                  >
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                  <Link
                    to="/mock/new"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-100"
                  >
                    <BookOpen className="w-4 h-4" /> Take Mock Test
                  </Link>
                  <Link
                    to="/history"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-100"
                  >
                    <History className="w-4 h-4" /> Past Tests
                  </Link>
                  <Link
                    to="/bookmarks"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-100"
                  >
                    <Bookmark className="w-4 h-4" /> Bookmarks
                  </Link>
                  <Link
                    to="/daily-challenge"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-100"
                  >
                    <Calendar className="w-4 h-4" /> Daily Challenge
                  </Link>
                </>
              )}

              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg text-indigo-700 bg-indigo-50"
                >
                  <ShieldAlert className="w-4 h-4" /> Admin Portal
                </Link>
              )}

              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </>
          ) : (
            <div className="space-y-2 pt-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full py-2.5 border border-slate-300 rounded-lg text-sm font-semibold text-slate-700"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow-sm"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

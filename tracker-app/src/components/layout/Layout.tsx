import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, BookOpen, Code2, FolderKanban, RefreshCw,
  BarChart3, StickyNote, Settings, ChevronLeft, ChevronRight,
  Flame, Target, Menu
} from 'lucide-react';
import { useProgressStore } from '../../stores/useProgressStore';
import { useSettingsStore } from '../../stores/useSettingsStore';
import { daysRemaining, getCurrentWeekNumber } from '../../lib/utils';

interface SidebarProps {
  children: React.ReactNode;
}

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/learning', label: 'Learning', icon: BookOpen },
  { path: '/problems', label: 'Problems', icon: Code2 },
  { path: '/projects', label: 'Projects', icon: FolderKanban },
  { path: '/revision', label: 'Revision', icon: RefreshCw },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/notes', label: 'Notes', icon: StickyNote },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Layout({ children }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const streak = useProgressStore((s) => s.getStreak());
  const settings = useSettingsStore((s) => s.settings);
  const remaining = daysRemaining(settings.endDate);
  const currentWeek = getCurrentWeekNumber(settings.startDate);

  return (
    <div className="flex min-h-screen w-full">
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-bg-surface border border-border-default md:hidden"
      >
        <Menu className="w-5 h-5 text-text-primary" />
      </button>

      {/* Sidebar overlay on mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed md:sticky top-0 left-0 h-screen z-40 flex flex-col border-r border-border-default bg-bg-secondary
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          transition-transform md:transition-none`}
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.2 }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-border-default shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shrink-0">
            <Target className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <h1 className="text-base font-bold gradient-text">FAANG Prep</h1>
                <p className="text-[10px] text-text-muted font-medium">Week {currentWeek} of 10</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Streak + Days Left */}
        {!collapsed && (
          <div className="px-4 py-3 border-b border-border-default">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flame-animate text-lg">🔥</span>
                <span className="text-sm font-semibold text-text-primary">{streak} day streak</span>
              </div>
              <span className="text-xs text-text-muted">{remaining}d left</span>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex flex-col items-center py-3 border-b border-border-default">
            <span className="flame-animate text-lg">🔥</span>
            <span className="text-[10px] font-bold text-text-primary mt-0.5">{streak}</span>
          </div>
        )}

        {/* Nav Items */}
        <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                ${isActive
                  ? 'bg-brand-primary/15 text-brand-primary-hover border border-brand-primary/20 glow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover border border-transparent'
                }
                ${collapsed ? 'justify-center' : ''}`
              }
            >
              <item.icon className={`w-[18px] h-[18px] shrink-0 ${location.pathname === item.path ? 'text-brand-primary' : ''}`} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </nav>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex items-center justify-center h-12 border-t border-border-default text-text-muted hover:text-text-primary transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen bg-mesh overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}

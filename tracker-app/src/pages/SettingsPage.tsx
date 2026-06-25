import React, { useState } from 'react';
import { useSettingsStore } from '../stores/useSettingsStore';
import { useProgressStore } from '../stores/useProgressStore';
import { useProblemsStore } from '../stores/useProblemsStore';
import { useRoadmapStore } from '../stores/useRoadmapStore';
import { Settings, Save, Trash2, Clock, Globe, User, Moon, Sun, RefreshCw } from 'lucide-react';
import { addDaysToDate } from '../lib/utils';

export default function SettingsPage() {
  const { settings, updateSettings, resetSettings } = useSettingsStore();
  const [userName, setUserName] = useState(settings.userName);
  const [dailyTargetHours, setDailyTargetHours] = useState(settings.dailyTargetHours);
  const [timezone, setTimezone] = useState(settings.timezone);
  const [theme, setTheme] = useState(settings.theme);
  const [startDate, setStartDate] = useState(settings.startDate);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    // Automatically recalculate end date based on start date (70 days for 10-week schedule)
    const newEndDate = addDaysToDate(startDate, 70);

    updateSettings({
      userName,
      dailyTargetHours: Number(dailyTargetHours),
      timezone,
      theme,
      startDate,
      endDate: newEndDate,
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResetAllData = () => {
    if (window.confirm('⚠️ WARNING: This will permanently reset ALL your progress, study notes, and custom settings. This action cannot be undone. Are you sure you want to proceed?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          <Settings className="w-6 h-6 text-brand-primary" />
          Settings
        </h1>
        <p className="text-sm text-text-muted mt-1">Manage your preparation metrics, target dates, and account configuration</p>
      </div>

      {/* Main Settings Card */}
      <div className="bg-bg-surface border border-border-default rounded-xl p-6 space-y-6">
        <h2 className="text-lg font-bold text-text-primary">General Configuration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Your Name / Display Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-text-muted" />
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-bg-secondary border border-border-default text-sm text-text-primary focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          {/* Daily Target Hours */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Daily Commitment Target (Hours)</label>
            <div className="relative">
              <Clock className="absolute left-3 top-2.5 w-4 h-4 text-text-muted" />
              <input
                type="number"
                min={1}
                max={24}
                value={dailyTargetHours}
                onChange={(e) => setDailyTargetHours(Number(e.target.value))}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-bg-secondary border border-border-default text-sm text-text-primary focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          {/* Start Date */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Plan Start Date (YYYY-MM-DD)</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-default text-sm text-text-primary focus:outline-none focus:border-brand-primary"
            />
          </div>

          {/* Recalculated End Date */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Plan End Date (Recalculated: 10 weeks)</label>
            <input
              type="text"
              readOnly
              value={addDaysToDate(startDate, 70)}
              className="w-full px-3 py-2 rounded-lg bg-bg-surface border border-border-default text-sm text-text-muted cursor-not-allowed outline-none"
            />
          </div>

          {/* Timezone */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Timezone</label>
            <div className="relative">
              <Globe className="absolute left-3 top-2.5 w-4 h-4 text-text-muted" />
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-bg-secondary border border-border-default text-sm text-text-primary focus:outline-none focus:border-brand-primary"
              >
                <option value="Asia/Kolkata">Asia/Kolkata (IST, UTC+5:30)</option>
                <option value="UTC">UTC (Coordinated Universal Time)</option>
                <option value="America/New_York">America/New_York (EST/EDT)</option>
                <option value="America/Los_Angeles">America/Los_Angeles (PST/PDT)</option>
              </select>
            </div>
          </div>

          {/* Theme */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">UI Theme</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTheme('light')}
                className={`flex-1 py-2 rounded-lg border text-sm font-semibold flex items-center justify-center gap-2 transition-all
                  ${theme === 'light'
                    ? 'bg-white text-black border-border-accent'
                    : 'bg-bg-secondary text-text-muted border-border-default hover:text-text-primary'
                  }`}
              >
                <Sun className="w-4 h-4" />
                Light
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`flex-1 py-2 rounded-lg border text-sm font-semibold flex items-center justify-center gap-2 transition-all
                  ${theme === 'dark'
                    ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/20 glow-sm'
                    : 'bg-bg-secondary text-text-muted border-border-default hover:text-text-primary'
                  }`}
              >
                <Moon className="w-4 h-4" />
                Dark
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-border-default pt-6">
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-white text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Save Settings
          </button>
          
          {saveSuccess && (
            <span className="text-xs text-accent-success font-semibold flex items-center gap-1 animate-pulse">
              ✓ Settings saved successfully!
            </span>
          )}
        </div>
      </div>

      {/* Danger Zone Card */}
      <div className="bg-bg-surface border border-brand-danger/20 rounded-xl p-6 space-y-6">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-brand-danger">Danger Zone</h2>
          <p className="text-xs text-text-muted">Perform destructive database actions. Be very careful!</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-border-default pt-4">
          <div>
            <p className="text-sm font-bold text-text-primary">Reset Application Data</p>
            <p className="text-xs text-text-muted">Clear local storage database state, including revision flags, problems solved, and note entries.</p>
          </div>
          <button
            onClick={handleResetAllData}
            className="px-4 py-2 rounded-lg bg-brand-danger/10 hover:bg-brand-danger/25 border border-brand-danger/20 text-brand-danger text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer shrink-0"
          >
            <Trash2 className="w-4 h-4" />
            Reset All Data
          </button>
        </div>
      </div>
    </div>
  );
}

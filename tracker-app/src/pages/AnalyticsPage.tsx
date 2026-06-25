import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Clock, Code2, Flame, Brain, TrendingUp, Target } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useProgressStore } from '../stores/useProgressStore';
import { useProblemsStore } from '../stores/useProblemsStore';
import { useSettingsStore } from '../stores/useSettingsStore';
import { roadmapTopics } from '../data/roadmap';
import { leetcodeProblems } from '../data/problems';
import { daysSinceStart, getProgressPercentage } from '../lib/utils';

export default function AnalyticsPage() {
  const settings = useSettingsStore((s) => s.settings);
  const topicProgress = useProgressStore((s) => s.topicProgress);
  const dailyProgress = useProgressStore((s) => s.dailyProgress);
  const streak = useProgressStore((s) => s.getStreak());
  const totalSolved = useProblemsStore((s) => s.getTotalSolved());
  const attempts = useProblemsStore((s) => s.attempts);

  const elapsed = daysSinceStart(settings.startDate);
  const totalTopics = roadmapTopics.length;
  const completedTopics = Object.values(topicProgress).filter(t => t.status === 'completed').length;
  const totalHours = Object.values(dailyProgress).reduce((sum, d) => sum + d.hoursSpent, 0);
  const activeDays = Object.values(dailyProgress).filter(d => d.hoursSpent > 0 || d.problemsSolved > 0).length;

  // Skill Radar Data
  const skillData = useMemo(() => {
    const categories = ['Python', 'DSA', 'Backend', 'System Design', 'AI/ML', 'CS Fundamentals'] as const;
    return categories.map(cat => {
      const catTopics = roadmapTopics.filter(t => t.category === cat);
      const completed = catTopics.filter(t => topicProgress[t.id]?.status === 'completed').length;
      const level = catTopics.length > 0 ? Math.round((completed / catTopics.length) * 100) : 0;
      return { subject: cat === 'CS Fundamentals' ? 'CS' : cat, level, fullMark: 100 };
    });
  }, [topicProgress]);

  // Weekly Progress Data
  const weeklyData = useMemo(() => {
    const weeks: { week: string; hours: number; problems: number }[] = [];
    for (let w = 1; w <= Math.min(10, Math.ceil(elapsed / 7) + 1); w++) {
      let weekHours = 0;
      let weekProblems = 0;
      for (let d = 0; d < 7; d++) {
        const date = new Date(settings.startDate);
        date.setDate(date.getDate() + (w - 1) * 7 + d);
        const dateStr = date.toISOString().split('T')[0];
        const dp = dailyProgress[dateStr];
        if (dp) {
          weekHours += dp.hoursSpent;
          weekProblems += dp.problemsSolved;
        }
      }
      weeks.push({ week: `W${w}`, hours: Math.round(weekHours * 10) / 10, problems: weekProblems });
    }
    return weeks;
  }, [dailyProgress, elapsed, settings.startDate]);

  // Activity Heatmap Data (last 60 days)
  const heatmapData = useMemo(() => {
    const days: { date: string; level: number }[] = [];
    for (let i = 59; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dp = dailyProgress[dateStr];
      const hours = dp?.hoursSpent || 0;
      const level = hours === 0 ? 0 : hours <= 3 ? 1 : hours <= 6 ? 2 : hours <= 9 ? 3 : 4;
      days.push({ date: dateStr, level });
    }
    return days;
  }, [dailyProgress]);

  const heatmapColors = ['#1a1a2e', '#1e3a5f', '#2563eb', '#6366f1', '#8b5cf6'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-brand-primary" />
          Analytics
        </h1>
        <p className="text-sm text-text-muted mt-1">Track your progress across all dimensions</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Days Active', value: activeDays, icon: <Flame className="w-5 h-5 text-accent-warning" />, sub: `of ${elapsed} days` },
          { label: 'Total Hours', value: Math.round(totalHours), icon: <Clock className="w-5 h-5 text-brand-primary" />, sub: `target: 900h` },
          { label: 'Problems Solved', value: totalSolved, icon: <Code2 className="w-5 h-5 text-accent-info" />, sub: `of ${leetcodeProblems.length}` },
          { label: 'Current Streak', value: streak, icon: <TrendingUp className="w-5 h-5 text-accent-success" />, sub: 'days' },
        ].map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="surface-card-static p-4"
          >
            <div className="flex items-center gap-2 mb-2">{metric.icon}<span className="text-xs text-text-muted">{metric.label}</span></div>
            <p className="text-3xl font-bold text-text-primary">{metric.value}</p>
            <p className="text-[10px] text-text-muted mt-0.5">{metric.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Radar */}
        <div className="surface-card-static p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Brain className="w-4 h-4 text-brand-primary" /> Skill Radar
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={skillData}>
              <PolarGrid stroke="#232340" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Radar
                dataKey="level"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Progress Chart */}
        <div className="surface-card-static p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-brand-primary" /> Weekly Progress
          </h3>
          {weeklyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="hoursGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#232340" />
                <XAxis dataKey="week" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ background: '#12121e', border: '1px solid #232340', borderRadius: '8px', fontSize: '12px' }}
                  labelStyle={{ color: '#f1f5f9' }}
                />
                <Area type="monotone" dataKey="hours" stroke="#6366f1" fill="url(#hoursGrad)" strokeWidth={2} name="Hours" />
                <Area type="monotone" dataKey="problems" stroke="#3b82f6" fill="none" strokeWidth={2} strokeDasharray="5 5" name="Problems" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[280px] flex items-center justify-center text-text-muted text-sm">
              Start tracking to see your progress chart
            </div>
          )}
        </div>
      </div>

      {/* Activity Heatmap */}
      <div className="surface-card-static p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Target className="w-4 h-4 text-brand-primary" /> Activity Heatmap (Last 60 Days)
        </h3>
        <div className="flex flex-wrap gap-1">
          {heatmapData.map((day, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-sm transition-colors"
              style={{ backgroundColor: heatmapColors[day.level] }}
              title={`${day.date}: ${day.level === 0 ? 'No activity' : `Level ${day.level}`}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3 text-[10px] text-text-muted">
          <span>Less</span>
          {heatmapColors.map((c, i) => (
            <div key={i} className="w-3 h-3 rounded-sm" style={{ backgroundColor: c }} />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Topics Progress */}
      <div className="surface-card-static p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-4">Topics Completion</h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl font-bold text-text-primary">{completedTopics}</span>
          <span className="text-sm text-text-muted">/ {totalTopics} topics completed</span>
          <span className="ml-auto text-sm font-semibold text-brand-primary">
            {getProgressPercentage(completedTopics, totalTopics)}%
          </span>
        </div>
        <div className="h-3 bg-bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary"
            initial={{ width: 0 }}
            animate={{ width: `${getProgressPercentage(completedTopics, totalTopics)}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>
    </div>
  );
}

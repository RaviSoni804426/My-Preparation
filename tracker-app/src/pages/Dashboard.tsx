import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen, Code2, FolderKanban, RefreshCw, BarChart3, StickyNote,
  Flame, Clock, Calendar, Target, CheckCircle2, Circle, ArrowRight,
  TrendingUp, Zap, BookMarked, Trophy
} from 'lucide-react';
import { useProgressStore } from '../stores/useProgressStore';
import { useSettingsStore } from '../stores/useSettingsStore';
import { useProblemsStore } from '../stores/useProblemsStore';
import { useRevisionStore } from '../stores/useRevisionStore';
import { useProjectsStore } from '../stores/useProjectsStore';
import { generateDailyPlan } from '../lib/dailyPlan';
import { roadmapTopics, phaseInfo } from '../data/roadmap';
import {
  daysRemaining, getCurrentWeekNumber, daysSinceStart,
  todayISO, formatDate, getProgressPercentage, categoryColors
} from '../lib/utils';
import { format } from 'date-fns';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

const quickNavItems = [
  { path: '/learning', label: 'Learning', icon: BookOpen, color: '#6366f1' },
  { path: '/problems', label: 'Problems', icon: Code2, color: '#3b82f6' },
  { path: '/projects', label: 'Projects', icon: FolderKanban, color: '#10b981' },
  { path: '/revision', label: 'Revision', icon: RefreshCw, color: '#f59e0b' },
  { path: '/analytics', label: 'Analytics', icon: BarChart3, color: '#8b5cf6' },
  { path: '/notes', label: 'Notes', icon: StickyNote, color: '#ec4899' },
];

export default function Dashboard() {
  const settings = useSettingsStore((s) => s.settings);
  const streak = useProgressStore((s) => s.getStreak());
  const completedIds = useProgressStore((s) => s.getCompletedTopicIds());
  const todayProgress = useProgressStore((s) => s.getTodayProgress());
  const toggleDailyItem = useProgressStore((s) => s.toggleDailyItem);
  const isDailyItemCompleted = useProgressStore((s) => s.isDailyItemCompleted);
  const totalSolved = useProblemsStore((s) => s.getTotalSolved());
  const dueRevisions = useRevisionStore((s) => s.getDueToday());
  const projects = useProjectsStore((s) => s.projects);

  const today = todayISO();
  const remaining = daysRemaining(settings.endDate);
  const currentWeek = getCurrentWeekNumber(settings.startDate);
  const elapsed = daysSinceStart(settings.startDate);
  const totalDays = 70;
  const overallProgress = getProgressPercentage(completedIds.size, roadmapTopics.length);

  const currentPhase = phaseInfo.find(p => {
    const weeks = p.weeks.split('–').map(Number);
    return currentWeek >= weeks[0] && currentWeek <= (weeks[1] || weeks[0]);
  }) || phaseInfo[0];

  const dailyPlan = useMemo(
    () => generateDailyPlan(settings.startDate, completedIds, dueRevisions.map(r => r.topicId)),
    [settings.startDate, today]
  );

  const todayFormatted = format(new Date(), 'EEEE, MMMM d');

  // Build plan items
  const planItems = useMemo(() => {
    const items: { id: string; icon: any; label: string; detail: string; color: string; link?: string }[] = [];

    if (dailyPlan.topic) {
      items.push({
        id: `topic-${dailyPlan.topic.id}`,
        icon: BookOpen,
        label: 'LEARN',
        detail: dailyPlan.topic.title,
        color: categoryColors[dailyPlan.topic.category] || '#6366f1',
        link: '/learning',
      });
    }

    dailyPlan.problems.forEach((problem, i) => {
      items.push({
        id: `problem-${problem.id}`,
        icon: Code2,
        label: `PROBLEM ${i + 1}`,
        detail: `LC #${problem.leetcodeNumber} — ${problem.title}`,
        color: problem.difficulty === 'Easy' ? '#10b981' : problem.difficulty === 'Medium' ? '#f59e0b' : '#ef4444',
        link: '/problems',
      });
    });

    if (dailyPlan.resource) {
      items.push({
        id: `resource-${dailyPlan.resource.id}`,
        icon: BookMarked,
        label: 'READ',
        detail: dailyPlan.resource.title,
        color: '#8b5cf6',
      });
    }

    if (dueRevisions.length > 0) {
      items.push({
        id: 'revision-due',
        icon: RefreshCw,
        label: 'REVISE',
        detail: `${dueRevisions.length} topic${dueRevisions.length > 1 ? 's' : ''} due for review`,
        color: '#ef4444',
        link: '/revision',
      });
    }

    return items;
  }, [dailyPlan, dueRevisions]);

  const weekProblems = 15;
  const weekHoursTarget = settings.dailyTargetHours * 7;

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-border-default bg-gradient-to-br from-bg-surface via-bg-surface to-bg-elevated p-6 md:p-8"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-secondary/5 rounded-full translate-y-1/3 -translate-x-1/4" />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-text-muted text-sm mb-1">Good {getGreeting()}, {settings.userName}!</p>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                <span className="gradient-text">Day {elapsed + 1}</span>
                <span className="text-text-primary"> — {todayFormatted}</span>
              </h1>
              <p className="text-text-secondary mt-1 text-sm">
                Phase {currentPhase.phase}: {currentPhase.title} • Week {currentWeek} of 10
              </p>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-4 md:gap-6">
              <StatPill icon={<span className="flame-animate">🔥</span>} value={streak} label="Streak" />
              <StatPill icon={<Clock className="w-4 h-4 text-brand-primary" />} value={`${remaining}`} label="Days Left" />
              <StatPill icon={<Trophy className="w-4 h-4 text-accent-warning" />} value={totalSolved} label="Solved" />
            </div>
          </div>

          {/* Overall progress bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-text-muted font-medium">Overall Progress</span>
              <span className="text-xs font-semibold text-brand-primary">{overallProgress}%</span>
            </div>
            <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary"
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Today's Plan */}
      <motion.div
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="surface-card-static p-5 md:p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-brand-primary/15 flex items-center justify-center">
            <Target className="w-4 h-4 text-brand-primary" />
          </div>
          <h2 className="text-lg font-semibold text-text-primary">Today's Plan</h2>
          <span className="ml-auto text-xs text-text-muted">
            {planItems.filter(i => isDailyItemCompleted(today, i.id)).length}/{planItems.length} done
          </span>
        </div>

        <div className="space-y-2">
          {planItems.map((item, i) => {
            const completed = isDailyItemCompleted(today, item.id);
            return (
              <motion.div
                key={item.id}
                custom={i + 2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer group
                  ${completed
                    ? 'bg-accent-success/5 border-accent-success/20'
                    : 'bg-bg-secondary/50 border-border-subtle hover:border-border-accent hover:bg-bg-surface-hover'
                  }`}
                onClick={() => toggleDailyItem(today, item.id)}
              >
                <button className="shrink-0">
                  {completed ? (
                    <CheckCircle2 className="w-5 h-5 text-accent-success" />
                  ) : (
                    <Circle className="w-5 h-5 text-text-muted group-hover:text-brand-primary transition-colors" />
                  )}
                </button>
                <div
                  className="w-1.5 h-8 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold tracking-wider text-text-muted uppercase">
                    {item.label}
                  </span>
                  <p className={`text-sm font-medium ${completed ? 'text-text-muted line-through' : 'text-text-primary'}`}>
                    {item.detail}
                  </p>
                </div>
                {item.link && (
                  <Link
                    to={item.link}
                    onClick={(e) => e.stopPropagation()}
                    className="shrink-0 p-1.5 rounded-lg hover:bg-bg-elevated text-text-muted hover:text-brand-primary transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </motion.div>
            );
          })}

          {planItems.length === 0 && (
            <div className="text-center py-8 text-text-muted">
              <Zap className="w-8 h-8 mx-auto mb-2 text-brand-primary opacity-50" />
              <p className="text-sm">All caught up! No tasks for today.</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Week Stats */}
      <motion.div
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <WeekStatCard
          label="Hours This Week"
          current={todayProgress.hoursSpent}
          target={weekHoursTarget}
          color="#6366f1"
          icon={<Clock className="w-4 h-4" />}
        />
        <WeekStatCard
          label="Problems This Week"
          current={todayProgress.problemsSolved}
          target={weekProblems}
          color="#3b82f6"
          icon={<Code2 className="w-4 h-4" />}
        />
        <WeekStatCard
          label="Revisions Due"
          current={dueRevisions.length}
          target={0}
          color={dueRevisions.length > 0 ? '#ef4444' : '#10b981'}
          icon={<RefreshCw className="w-4 h-4" />}
          showAsCount
        />
      </motion.div>

      {/* Quick Navigation */}
      <motion.div
        custom={4}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <h3 className="text-sm font-semibold text-text-muted mb-3 uppercase tracking-wider">Quick Navigation</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="surface-card flex flex-col items-center gap-2 p-4 text-center group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
              </div>
              <span className="text-xs font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Phase Progress */}
      <motion.div
        custom={5}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="surface-card-static p-5"
      >
        <h3 className="text-sm font-semibold text-text-muted mb-4 uppercase tracking-wider">Phase Progress</h3>
        <div className="space-y-3">
          {phaseInfo.map((phase) => {
            const phaseTopics = roadmapTopics.filter(t => t.phase === phase.phase);
            const phaseCompleted = phaseTopics.filter(t => completedIds.has(t.id)).length;
            const pct = getProgressPercentage(phaseCompleted, phaseTopics.length);
            const isCurrentPhase = phase.phase === currentPhase.phase;

            return (
              <div key={phase.phase} className={`flex items-center gap-3 ${isCurrentPhase ? '' : 'opacity-60'}`}>
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0 ${isCurrentPhase ? 'glow-sm' : ''}`}
                  style={{ backgroundColor: phase.color }}
                >
                  {phase.phase}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-text-primary truncate">{phase.title}</span>
                    <span className="text-[10px] text-text-muted ml-2 shrink-0">
                      {phaseCompleted}/{phaseTopics.length} • {pct}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: phase.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

function StatPill({ icon, value, label }: { icon: React.ReactNode; value: number | string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="text-lg font-bold text-text-primary">{value}</span>
      </div>
      <span className="text-[10px] text-text-muted font-medium">{label}</span>
    </div>
  );
}

function WeekStatCard({
  label, current, target, color, icon, showAsCount
}: {
  label: string; current: number; target: number; color: string; icon: React.ReactNode; showAsCount?: boolean;
}) {
  const pct = showAsCount ? 100 : getProgressPercentage(current, target);
  return (
    <div className="surface-card-static p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
          <span style={{ color }}>{icon}</span>
        </div>
        <span className="text-xs font-medium text-text-muted">{label}</span>
      </div>
      <div className="flex items-end gap-1 mb-2">
        <span className="text-2xl font-bold text-text-primary">{current}</span>
        {!showAsCount && <span className="text-sm text-text-muted mb-0.5">/ {target}</span>}
        {showAsCount && current > 0 && <span className="text-xs text-accent-danger font-medium mb-1">due now</span>}
        {showAsCount && current === 0 && <span className="text-xs text-accent-success font-medium mb-1">all clear</span>}
      </div>
      {!showAsCount && (
        <div className="h-1.5 bg-bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      )}
    </div>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
}

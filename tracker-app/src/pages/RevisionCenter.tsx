import { motion } from 'framer-motion';
import { RefreshCw, AlertTriangle, Clock, CheckCircle2, Star, BookOpen } from 'lucide-react';
import { useRevisionStore } from '../stores/useRevisionStore';
import { useProgressStore } from '../stores/useProgressStore';
import { roadmapTopics } from '../data/roadmap';
import { categoryColors, formatDate, todayISO } from '../lib/utils';

export default function RevisionCenter() {
  const dueToday = useRevisionStore((s) => s.getDueToday());
  const upcoming = useRevisionStore((s) => s.getUpcoming(7));
  const completeReview = useRevisionStore((s) => s.completeReview);
  const allItems = useRevisionStore((s) => s.items);

  const getTopicTitle = (topicId: string) =>
    roadmapTopics.find(t => t.id === topicId)?.title || topicId;

  const getTopicCategory = (topicId: string) =>
    roadmapTopics.find(t => t.id === topicId)?.category || 'DSA';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          <RefreshCw className="w-6 h-6 text-brand-primary" />
          Revision Center
        </h1>
        <p className="text-sm text-text-muted mt-1">Spaced repetition — Day 1, 3, 7, 14, 30</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="surface-card-static p-4 text-center">
          <AlertTriangle className="w-5 h-5 text-accent-danger mx-auto mb-1" />
          <p className="text-2xl font-bold text-text-primary">{dueToday.length}</p>
          <p className="text-xs text-text-muted">Due Today</p>
        </div>
        <div className="surface-card-static p-4 text-center">
          <Clock className="w-5 h-5 text-accent-warning mx-auto mb-1" />
          <p className="text-2xl font-bold text-text-primary">{upcoming.length}</p>
          <p className="text-xs text-text-muted">This Week</p>
        </div>
        <div className="surface-card-static p-4 text-center">
          <CheckCircle2 className="w-5 h-5 text-accent-success mx-auto mb-1" />
          <p className="text-2xl font-bold text-text-primary">{allItems.filter(i => i.masteryLevel >= 80).length}</p>
          <p className="text-xs text-text-muted">Mastered</p>
        </div>
      </div>

      {/* Due Today */}
      <Section title="🔴 Due Today" count={dueToday.length} color="#ef4444">
        {dueToday.length === 0 ? (
          <EmptyState message="No revisions due today! 🎉" />
        ) : (
          dueToday.map((item) => (
            <RevisionCard
              key={item.id}
              topicTitle={getTopicTitle(item.topicId)}
              category={getTopicCategory(item.topicId)}
              masteryLevel={item.masteryLevel}
              reviewCount={item.reviewCount}
              nextDate={item.nextReviewDate}
              onComplete={(quality) => completeReview(item.id, quality)}
            />
          ))
        )}
      </Section>

      {/* Due This Week */}
      <Section title="🟡 Due This Week" count={upcoming.length} color="#f59e0b">
        {upcoming.length === 0 ? (
          <EmptyState message="Nothing upcoming this week" />
        ) : (
          upcoming.map((item) => (
            <RevisionCard
              key={item.id}
              topicTitle={getTopicTitle(item.topicId)}
              category={getTopicCategory(item.topicId)}
              masteryLevel={item.masteryLevel}
              reviewCount={item.reviewCount}
              nextDate={item.nextReviewDate}
              isUpcoming
            />
          ))
        )}
      </Section>

      {/* All Items */}
      <Section title="📚 All Revision Items" count={allItems.length} color="#6366f1">
        {allItems.length === 0 ? (
          <EmptyState message="Complete topics to start building your revision queue" />
        ) : (
          allItems
            .sort((a, b) => b.masteryLevel - a.masteryLevel)
            .map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-bg-secondary/50 border border-border-subtle">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{getTopicTitle(item.topicId)}</p>
                  <p className="text-[10px] text-text-muted">
                    Reviewed {item.reviewCount}x • Next: {formatDate(item.nextReviewDate)}
                  </p>
                </div>
                <MasteryBadge level={item.masteryLevel} />
              </div>
            ))
        )}
      </Section>
    </div>
  );
}

function Section({ title, count, color, children }: {
  title: string; count: number; color: string; children: React.ReactNode;
}) {
  return (
    <div className="surface-card-static p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-text-primary">{title}</h2>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${color}15`, color }}>
          {count}
        </span>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function RevisionCard({ topicTitle, category, masteryLevel, reviewCount, nextDate, onComplete, isUpcoming }: {
  topicTitle: string; category: string; masteryLevel: number; reviewCount: number;
  nextDate: string; onComplete?: (quality: number) => void; isUpcoming?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-bg-secondary/50 border border-border-subtle">
      <div className="w-1.5 h-10 rounded-full shrink-0" style={{ backgroundColor: categoryColors[category] }} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary truncate">{topicTitle}</p>
        <p className="text-[10px] text-text-muted">Review #{reviewCount + 1} • {isUpcoming ? formatDate(nextDate) : 'Due now'}</p>
      </div>
      <MasteryBadge level={masteryLevel} />
      {onComplete && !isUpcoming && (
        <div className="flex gap-1 shrink-0">
          {[1, 3, 5].map(q => (
            <button
              key={q}
              onClick={() => onComplete(q)}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-all
                ${q === 1 ? 'border-accent-danger/30 text-accent-danger hover:bg-accent-danger/10' :
                  q === 3 ? 'border-accent-warning/30 text-accent-warning hover:bg-accent-warning/10' :
                  'border-accent-success/30 text-accent-success hover:bg-accent-success/10'}`}
            >
              {q === 1 ? 'Forgot' : q === 3 ? 'OK' : 'Easy'}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MasteryBadge({ level }: { level: number }) {
  const color = level >= 80 ? '#10b981' : level >= 50 ? '#f59e0b' : level >= 20 ? '#3b82f6' : '#64748b';
  return (
    <div className="flex items-center gap-1 shrink-0">
      <div className="w-8 h-1.5 bg-bg-secondary rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${level}%`, backgroundColor: color }} />
      </div>
      <span className="text-[10px] font-bold" style={{ color }}>{level}%</span>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-6 text-text-muted">
      <p className="text-sm">{message}</p>
    </div>
  );
}

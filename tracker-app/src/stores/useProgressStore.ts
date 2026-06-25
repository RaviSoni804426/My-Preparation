import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TopicProgress, TopicStatus, DailyProgress } from '../types';
import { todayISO, generateId } from '../lib/utils';

interface ProgressStore {
  // Topic completion
  topicProgress: Record<string, TopicProgress>;
  markTopicStatus: (topicId: string, status: TopicStatus) => void;
  updateTopicConfidence: (topicId: string, level: number) => void;
  updateTopicNotes: (topicId: string, notes: string) => void;
  addTopicTime: (topicId: string, minutes: number) => void;
  getCompletedTopicIds: () => Set<string>;

  // Daily progress
  dailyProgress: Record<string, DailyProgress>;
  updateDailyProgress: (date: string, partial: Partial<DailyProgress>) => void;
  getTodayProgress: () => DailyProgress;

  // Streaks
  getStreak: () => number;

  // Completed items for daily plan
  dailyCompletedItems: Record<string, string[]>; // date -> item ids
  toggleDailyItem: (date: string, itemId: string) => void;
  isDailyItemCompleted: (date: string, itemId: string) => boolean;
}

const emptyDailyProgress = (date: string): DailyProgress => ({
  date,
  hoursSpent: 0,
  problemsSolved: 0,
  conceptsLearned: 0,
  streakCount: 0,
  moodRating: 3,
  notes: '',
});

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      topicProgress: {},
      dailyProgress: {},
      dailyCompletedItems: {},

      markTopicStatus: (topicId, status) =>
        set((state) => {
          const existing = state.topicProgress[topicId] || {
            topicId,
            status: 'not_started' as TopicStatus,
            confidenceLevel: 1,
            timeSpentMinutes: 0,
            notes: '',
          };
          return {
            topicProgress: {
              ...state.topicProgress,
              [topicId]: {
                ...existing,
                status,
                ...(status === 'completed' ? { completedAt: new Date().toISOString() } : {}),
                ...(status === 'in_progress' && !existing.startedAt ? { startedAt: new Date().toISOString() } : {}),
              },
            },
          };
        }),

      updateTopicConfidence: (topicId, level) =>
        set((state) => {
          const existing = state.topicProgress[topicId] || {
            topicId,
            status: 'not_started' as TopicStatus,
            confidenceLevel: 1,
            timeSpentMinutes: 0,
            notes: '',
          };
          return {
            topicProgress: {
              ...state.topicProgress,
              [topicId]: { ...existing, confidenceLevel: level },
            },
          };
        }),

      updateTopicNotes: (topicId, notes) =>
        set((state) => {
          const existing = state.topicProgress[topicId] || {
            topicId,
            status: 'not_started' as TopicStatus,
            confidenceLevel: 1,
            timeSpentMinutes: 0,
            notes: '',
          };
          return {
            topicProgress: {
              ...state.topicProgress,
              [topicId]: { ...existing, notes },
            },
          };
        }),

      addTopicTime: (topicId, minutes) =>
        set((state) => {
          const existing = state.topicProgress[topicId] || {
            topicId,
            status: 'not_started' as TopicStatus,
            confidenceLevel: 1,
            timeSpentMinutes: 0,
            notes: '',
          };
          return {
            topicProgress: {
              ...state.topicProgress,
              [topicId]: {
                ...existing,
                timeSpentMinutes: existing.timeSpentMinutes + minutes,
              },
            },
          };
        }),

      getCompletedTopicIds: () => {
        const tp = get().topicProgress;
        return new Set(
          Object.entries(tp)
            .filter(([_, v]) => v.status === 'completed')
            .map(([k]) => k)
        );
      },

      updateDailyProgress: (date, partial) =>
        set((state) => {
          const existing = state.dailyProgress[date] || emptyDailyProgress(date);
          return {
            dailyProgress: {
              ...state.dailyProgress,
              [date]: { ...existing, ...partial },
            },
          };
        }),

      getTodayProgress: () => {
        const today = todayISO();
        return get().dailyProgress[today] || emptyDailyProgress(today);
      },

      getStreak: () => {
        const dp = get().dailyProgress;
        const today = todayISO();
        let streak = 0;
        let current = today;

        // Check if today has activity
        if (dp[current] && (dp[current].hoursSpent > 0 || dp[current].problemsSolved > 0)) {
          streak = 1;
        }

        // Walk backwards
        for (let i = 1; i < 365; i++) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          const dayProgress = dp[dateStr];

          if (dayProgress && (dayProgress.hoursSpent > 0 || dayProgress.problemsSolved > 0)) {
            streak++;
          } else {
            break;
          }
        }
        return streak;
      },

      toggleDailyItem: (date, itemId) =>
        set((state) => {
          const items = state.dailyCompletedItems[date] || [];
          const isCompleted = items.includes(itemId);
          return {
            dailyCompletedItems: {
              ...state.dailyCompletedItems,
              [date]: isCompleted
                ? items.filter((id) => id !== itemId)
                : [...items, itemId],
            },
          };
        }),

      isDailyItemCompleted: (date, itemId) => {
        const items = get().dailyCompletedItems[date] || [];
        return items.includes(itemId);
      },
    }),
    { name: 'faang-prep-progress' }
  )
);

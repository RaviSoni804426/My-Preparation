import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RevisionItem } from '../types';
import { createRevisionSchedule, completeRevision, getDueRevisions, getUpcomingRevisions } from '../lib/revision';
import { todayISO } from '../lib/utils';

interface RevisionStore {
  items: RevisionItem[];
  addRevisionItem: (topicId: string, learnedDate: string, type?: 'topic' | 'problem', problemId?: string) => void;
  completeReview: (itemId: string, quality: number) => void;
  getDueToday: () => RevisionItem[];
  getUpcoming: (days?: number) => RevisionItem[];
  getByTopicId: (topicId: string) => RevisionItem | undefined;
}

export const useRevisionStore = create<RevisionStore>()(
  persist(
    (set, get) => ({
      items: [],

      addRevisionItem: (topicId, learnedDate, type = 'topic', problemId) =>
        set((state) => {
          // Don't add duplicate
          const exists = state.items.some(
            (i) => i.topicId === topicId && i.type === type && i.problemId === problemId
          );
          if (exists) return state;

          const newItem = createRevisionSchedule(topicId, learnedDate, type, problemId);
          return { items: [...state.items, newItem] };
        }),

      completeReview: (itemId, quality) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? completeRevision(item, quality) : item
          ),
        })),

      getDueToday: () => getDueRevisions(get().items, todayISO()),

      getUpcoming: (days = 7) => getUpcomingRevisions(get().items, todayISO(), days),

      getByTopicId: (topicId) => get().items.find((i) => i.topicId === topicId && i.type === 'topic'),
    }),
    { name: 'faang-prep-revision' }
  )
);

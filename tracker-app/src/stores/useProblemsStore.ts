import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProblemAttempt, ProblemStatus } from '../types';
import { todayISO, addDaysToDate } from '../lib/utils';

interface ProblemsStore {
  attempts: Record<string, ProblemAttempt>; // keyed by problemId
  logAttempt: (problemId: string, data: Partial<ProblemAttempt>) => void;
  updateStatus: (problemId: string, status: ProblemStatus) => void;
  updateSolution: (problemId: string, code: string) => void;
  updateNotes: (problemId: string, notes: string) => void;
  addMistake: (problemId: string, mistake: string) => void;
  getAttempt: (problemId: string) => ProblemAttempt | undefined;
  getTotalSolved: () => number;
  getCountByStatus: () => Record<ProblemStatus, number>;
  getCountByDifficulty: () => { Easy: number; Medium: number; Hard: number };
}

const emptyAttempt = (problemId: string): ProblemAttempt => ({
  problemId,
  status: 'unsolved',
  totalAttempts: 0,
  correctAttempts: 0,
  timeSpentMinutes: 0,
  solutionCode: '',
  personalNotes: '',
  mistakes: [],
});

export const useProblemsStore = create<ProblemsStore>()(
  persist(
    (set, get) => ({
      attempts: {},

      logAttempt: (problemId, data) =>
        set((state) => {
          const existing = state.attempts[problemId] || emptyAttempt(problemId);
          const now = todayISO();
          return {
            attempts: {
              ...state.attempts,
              [problemId]: {
                ...existing,
                ...data,
                totalAttempts: existing.totalAttempts + 1,
                lastAttemptedAt: now,
                firstAttemptedAt: existing.firstAttemptedAt || now,
                // Set next revision date after solving
                ...(data.status === 'solved' || data.status === 'mastered'
                  ? {
                      correctAttempts: existing.correctAttempts + 1,
                      nextRevisionDate: addDaysToDate(now, 1),
                    }
                  : {}),
              },
            },
          };
        }),

      updateStatus: (problemId, status) =>
        set((state) => {
          const existing = state.attempts[problemId] || emptyAttempt(problemId);
          return {
            attempts: {
              ...state.attempts,
              [problemId]: { ...existing, status },
            },
          };
        }),

      updateSolution: (problemId, code) =>
        set((state) => {
          const existing = state.attempts[problemId] || emptyAttempt(problemId);
          return {
            attempts: {
              ...state.attempts,
              [problemId]: { ...existing, solutionCode: code },
            },
          };
        }),

      updateNotes: (problemId, notes) =>
        set((state) => {
          const existing = state.attempts[problemId] || emptyAttempt(problemId);
          return {
            attempts: {
              ...state.attempts,
              [problemId]: { ...existing, personalNotes: notes },
            },
          };
        }),

      addMistake: (problemId, mistake) =>
        set((state) => {
          const existing = state.attempts[problemId] || emptyAttempt(problemId);
          return {
            attempts: {
              ...state.attempts,
              [problemId]: {
                ...existing,
                mistakes: [...existing.mistakes, mistake],
              },
            },
          };
        }),

      getAttempt: (problemId) => get().attempts[problemId],

      getTotalSolved: () =>
        Object.values(get().attempts).filter(
          (a) => a.status === 'solved' || a.status === 'mastered'
        ).length,

      getCountByStatus: () => {
        const counts: Record<ProblemStatus, number> = {
          unsolved: 0,
          attempted: 0,
          solved: 0,
          mastered: 0,
        };
        Object.values(get().attempts).forEach((a) => {
          counts[a.status]++;
        });
        return counts;
      },

      getCountByDifficulty: () => {
        // This needs problem data — return from attempts
        return { Easy: 0, Medium: 0, Hard: 0 };
      },
    }),
    { name: 'faang-prep-problems' }
  )
);

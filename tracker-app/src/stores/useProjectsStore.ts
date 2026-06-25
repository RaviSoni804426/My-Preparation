import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project, ProjectMilestone } from '../types';
import { portfolioProjects } from '../data/projects';

interface ProjectsStore {
  projects: Project[];
  updateProject: (id: string, partial: Partial<Project>) => void;
  toggleMilestone: (projectId: string, milestoneId: string) => void;
  updateProjectNotes: (id: string, notes: string) => void;
  recalculateProgress: (id: string) => void;
}

export const useProjectsStore = create<ProjectsStore>()(
  persist(
    (set, get) => ({
      projects: portfolioProjects,

      updateProject: (id, partial) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...partial } : p
          ),
        })),

      toggleMilestone: (projectId, milestoneId) =>
        set((state) => ({
          projects: state.projects.map((p) => {
            if (p.id !== projectId) return p;
            const milestones = p.milestones.map((m) =>
              m.id === milestoneId ? { ...m, isCompleted: !m.isCompleted } : m
            );
            const completed = milestones.filter((m) => m.isCompleted).length;
            const progress = Math.round((completed / milestones.length) * 100);
            const allDone = completed === milestones.length;
            return {
              ...p,
              milestones,
              progressPercentage: progress,
              status: allDone ? 'completed' as const : progress > 0 ? 'in_progress' as const : 'not_started' as const,
              ...(allDone ? { completedAt: new Date().toISOString() } : {}),
            };
          }),
        })),

      updateProjectNotes: (id, notes) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, notes } : p
          ),
        })),

      recalculateProgress: (id) =>
        set((state) => ({
          projects: state.projects.map((p) => {
            if (p.id !== id) return p;
            const completed = p.milestones.filter((m) => m.isCompleted).length;
            return {
              ...p,
              progressPercentage: Math.round((completed / p.milestones.length) * 100),
            };
          }),
        })),
    }),
    {
      name: 'faang-prep-projects',
      // Merge persisted with defaults so new milestones appear
      merge: (persisted, current) => {
        const ps = persisted as any;
        if (ps && ps.projects) {
          return { ...current, projects: ps.projects };
        }
        return current;
      },
    }
  )
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Note } from '../types';
import { generateId, todayISO } from '../lib/utils';

interface NotesStore {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'lastEditedAt'>) => void;
  updateNote: (id: string, partial: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  togglePin: (id: string) => void;
  getNotesByTopic: (topicId: string) => Note[];
  searchNotes: (query: string) => Note[];
}

export const useNotesStore = create<NotesStore>()(
  persist(
    (set, get) => ({
      notes: [],

      addNote: (noteData) =>
        set((state) => ({
          notes: [
            {
              ...noteData,
              id: generateId(),
              createdAt: new Date().toISOString(),
              lastEditedAt: new Date().toISOString(),
            },
            ...state.notes,
          ],
        })),

      updateNote: (id, partial) =>
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id
              ? { ...n, ...partial, lastEditedAt: new Date().toISOString() }
              : n
          ),
        })),

      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
        })),

      togglePin: (id) =>
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, isPinned: !n.isPinned } : n
          ),
        })),

      getNotesByTopic: (topicId) =>
        get().notes.filter((n) => n.topicId === topicId),

      searchNotes: (query) => {
        const q = query.toLowerCase();
        return get().notes.filter(
          (n) =>
            n.title.toLowerCase().includes(q) ||
            n.content.toLowerCase().includes(q) ||
            n.tags.some((t) => t.toLowerCase().includes(q))
        );
      },
    }),
    { name: 'faang-prep-notes' }
  )
);

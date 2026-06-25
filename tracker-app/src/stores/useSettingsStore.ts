import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppSettings } from '../types';
import { addDaysToDate } from '../lib/utils';

interface SettingsStore {
  settings: AppSettings;
  updateSettings: (partial: Partial<AppSettings>) => void;
  resetSettings: () => void;
}

const DEFAULT_SETTINGS: AppSettings = {
  startDate: '2025-06-27',
  endDate: addDaysToDate('2025-06-27', 70), // 10 weeks
  dailyTargetHours: 10,
  timezone: 'Asia/Kolkata',
  theme: 'dark',
  userName: 'Warrior',
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: DEFAULT_SETTINGS,
      updateSettings: (partial) =>
        set((state) => ({
          settings: { ...state.settings, ...partial },
        })),
      resetSettings: () => set({ settings: DEFAULT_SETTINGS }),
    }),
    { name: 'faang-prep-settings' }
  )
);

import { format, differenceInDays, addDays, parseISO, isToday, startOfDay, isBefore, isAfter, getDay } from 'date-fns';

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'MMM d, yyyy');
}

export function formatDateShort(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'MMM d');
}

export function todayISO(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

export function daysRemaining(endDate: string): number {
  return Math.max(0, differenceInDays(parseISO(endDate), new Date()));
}

export function daysSinceStart(startDate: string): number {
  return Math.max(0, differenceInDays(new Date(), parseISO(startDate)));
}

export function getCurrentWeekNumber(startDate: string): number {
  const days = daysSinceStart(startDate);
  return Math.min(10, Math.floor(days / 7) + 1);
}

export function getCurrentDayOfWeek(): number {
  const day = getDay(new Date());
  return day === 0 ? 7 : day; // 1=Mon ... 7=Sun
}

export function addDaysToDate(date: string, days: number): string {
  return format(addDays(parseISO(date), days), 'yyyy-MM-dd');
}

export function isDateToday(date: string): boolean {
  return isToday(parseISO(date));
}

export function isDateBefore(date: string, other: string): boolean {
  return isBefore(startOfDay(parseISO(date)), startOfDay(parseISO(other)));
}

export function isDateAfter(date: string, other: string): boolean {
  return isAfter(startOfDay(parseISO(date)), startOfDay(parseISO(other)));
}

export function getProgressPercentage(current: number, total: number): number {
  if (total === 0) return 0;
  return Math.min(100, Math.round((current / total) * 100));
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export const categoryColors: Record<string, string> = {
  'DSA': '#6366f1',
  'Python': '#3b82f6',
  'Backend': '#10b981',
  'System Design': '#f59e0b',
  'AI/ML': '#ef4444',
  'CS Fundamentals': '#8b5cf6',
  'Frontend': '#06b6d4',
  'Interview': '#ec4899',
  'Project': '#f97316',
};

export const difficultyColors: Record<string, string> = {
  'Easy': '#10b981',
  'Medium': '#f59e0b',
  'Hard': '#ef4444',
  'Beginner': '#10b981',
  'Intermediate': '#f59e0b',
  'Advanced': '#ef4444',
};

export const statusColors: Record<string, string> = {
  'unsolved': '#64748b',
  'attempted': '#f59e0b',
  'solved': '#10b981',
  'mastered': '#6366f1',
  'not_started': '#64748b',
  'in_progress': '#3b82f6',
  'completed': '#10b981',
};

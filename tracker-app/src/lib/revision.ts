import { addDaysToDate } from './utils';
import { RevisionItem } from '../types';
import { generateId } from './utils';

/* ═══════════════════════════════════════════════════
   SPACED REPETITION ENGINE
   Intervals: Day 1, 3, 7, 14, 30 (SM-2 inspired)
   ═══════════════════════════════════════════════════ */

const REVIEW_INTERVALS = [1, 3, 7, 14, 30];

export function createRevisionSchedule(
  topicId: string,
  learnedDate: string,
  type: 'topic' | 'problem' = 'topic',
  problemId?: string
): RevisionItem {
  const reviewDates = REVIEW_INTERVALS.map(days => addDaysToDate(learnedDate, days));

  return {
    id: generateId(),
    topicId,
    type,
    problemId,
    learnedDate,
    reviewDates,
    nextReviewDate: reviewDates[0],
    reviewCount: 0,
    masteryLevel: 20,
  };
}

export function completeRevision(item: RevisionItem, quality: number): RevisionItem {
  // quality: 1–5 (1=forgot, 5=perfect)
  const newReviewCount = item.reviewCount + 1;
  const masteryDelta = quality >= 3 ? (quality - 2) * 10 : -(3 - quality) * 15;
  const newMastery = Math.max(0, Math.min(100, item.masteryLevel + masteryDelta));

  let nextReviewDate: string;

  if (quality < 3) {
    // Failed review — repeat at current interval
    nextReviewDate = addDaysToDate(new Date().toISOString().split('T')[0], REVIEW_INTERVALS[0]);
  } else if (newReviewCount < REVIEW_INTERVALS.length) {
    // Advance to next interval
    nextReviewDate = addDaysToDate(
      new Date().toISOString().split('T')[0],
      REVIEW_INTERVALS[newReviewCount]
    );
  } else {
    // Completed all review intervals — schedule in 60 days
    nextReviewDate = addDaysToDate(new Date().toISOString().split('T')[0], 60);
  }

  return {
    ...item,
    reviewCount: newReviewCount,
    lastReviewedDate: new Date().toISOString().split('T')[0],
    nextReviewDate,
    masteryLevel: newMastery,
  };
}

export function getDueRevisions(items: RevisionItem[], date: string): RevisionItem[] {
  return items
    .filter(item => item.nextReviewDate <= date)
    .sort((a, b) => a.nextReviewDate.localeCompare(b.nextReviewDate));
}

export function getUpcomingRevisions(items: RevisionItem[], date: string, days: number = 7): RevisionItem[] {
  const endDate = addDaysToDate(date, days);
  return items
    .filter(item => item.nextReviewDate > date && item.nextReviewDate <= endDate)
    .sort((a, b) => a.nextReviewDate.localeCompare(b.nextReviewDate));
}

import { DailyPlan, Topic, Problem, Resource, TopicProgress } from '../types';
import { getCurrentWeekNumber, getCurrentDayOfWeek, todayISO } from './utils';
import { roadmapTopics } from '../data/roadmap';
import { leetcodeProblems } from '../data/problems';
import { learningResources } from '../data/resources';

/* ═══════════════════════════════════════════════════
   DAILY PLAN GENERATION ENGINE
   Generates today's learning plan based on:
   1. Current week + day in the roadmap
   2. Next unlearned topic (prerequisites met)
   3. Problems for current topic/week
   4. Resource for current topic
   ═══════════════════════════════════════════════════ */

export function generateDailyPlan(
  startDate: string,
  completedTopicIds: Set<string>,
  revisionDueIds: string[]
): DailyPlan {
  const today = todayISO();
  const weekNumber = getCurrentWeekNumber(startDate);
  const dayOfWeek = getCurrentDayOfWeek();

  // 1. Find next unlearned topic for this week/day
  const topic = findNextTopic(weekNumber, dayOfWeek, completedTopicIds);

  // 2. Pick 3 problems for this week
  const problems = getProblemsForPlan(weekNumber, topic?.id, completedTopicIds);

  // 3. Pick a resource for this week
  const resource = getResourceForWeek(weekNumber);

  return {
    date: today,
    weekNumber,
    dayNumber: dayOfWeek,
    topic: topic || undefined,
    problems,
    resource: resource || undefined,
    revisionTopicIds: revisionDueIds,
    isCompleted: false,
    completedItems: [],
  };
}

function findNextTopic(
  weekNumber: number,
  dayOfWeek: number,
  completedTopicIds: Set<string>
): Topic | null {
  // First: try to find the exact topic for this week + day
  const exactMatch = roadmapTopics.find(
    t => t.weekNumber === weekNumber && t.dayNumber === dayOfWeek && t.isActive
  );

  if (exactMatch && !completedTopicIds.has(exactMatch.id)) {
    return exactMatch;
  }

  // Fallback: find the next unlearned topic in order
  const nextTopic = roadmapTopics
    .filter(t => t.isActive && !completedTopicIds.has(t.id))
    .sort((a, b) => a.orderInRoadmap - b.orderInRoadmap)[0];

  return nextTopic || null;
}

function getProblemsForPlan(
  weekNumber: number,
  topicId: string | undefined,
  _completedTopicIds: Set<string>
): Problem[] {
  // Get problems for the current week
  let weekProblems = leetcodeProblems.filter(p => p.weekNumber === weekNumber);

  // If we have a specific topic, prefer those problems
  if (topicId) {
    const topicProblems = weekProblems.filter(p => p.topicId === topicId);
    if (topicProblems.length >= 3) {
      return topicProblems.slice(0, 3);
    }
    // Mix topic-specific + remaining week problems
    const remaining = weekProblems.filter(p => p.topicId !== topicId);
    return [...topicProblems, ...remaining].slice(0, 3);
  }

  return weekProblems.slice(0, 3);
}

function getResourceForWeek(weekNumber: number): Resource | null {
  const weekResources = learningResources.filter(
    r => r.weekNumber === weekNumber && !r.isCompleted
  );
  return weekResources[0] || null;
}

export function getWeekTopics(weekNumber: number): Topic[] {
  return roadmapTopics
    .filter(t => t.weekNumber === weekNumber)
    .sort((a, b) => a.dayNumber - b.dayNumber);
}

export function getPhaseTopics(phase: number): Topic[] {
  return roadmapTopics
    .filter(t => t.phase === phase)
    .sort((a, b) => a.orderInRoadmap - b.orderInRoadmap);
}

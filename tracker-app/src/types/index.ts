/* ═══════════════════════════════════════════════════
   FAANG PREP TRACKER — TypeScript Types
   ═══════════════════════════════════════════════════ */

// ── Phase & Roadmap ──────────────────────────────
export type Category = 'DSA' | 'Python' | 'Backend' | 'System Design' | 'AI/ML' | 'CS Fundamentals' | 'Frontend' | 'Interview' | 'Project';
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type Phase = 0 | 1 | 2 | 3 | 4 | 5;

export interface Topic {
  id: string;
  title: string;
  slug: string;
  category: Category;
  difficulty: Difficulty;
  phase: Phase;
  weekNumber: number;
  dayNumber: number;         // 1=Mon ... 7=Sun
  estimatedHours: number;
  description: string;
  prerequisites: string[];   // topic IDs
  orderInRoadmap: number;
  isActive: boolean;
  learningContent?: string;  // markdown
  labDescription?: string;   // markdown
  interviewQuestions?: string[];
}

// ── User Progress on Topics ─────────────────────
export type TopicStatus = 'not_started' | 'in_progress' | 'completed';

export interface TopicProgress {
  topicId: string;
  status: TopicStatus;
  confidenceLevel: number;    // 1–5
  startedAt?: string;         // ISO date
  completedAt?: string;       // ISO date
  timeSpentMinutes: number;
  notes: string;              // markdown
}

// ── Practice Problems ────────────────────────────
export type ProblemStatus = 'unsolved' | 'attempted' | 'solved' | 'mastered';
export type ProblemDifficulty = 'Easy' | 'Medium' | 'Hard';
export type DSAPattern =
  | 'Arrays' | 'Strings' | 'Two Pointers' | 'Sliding Window' | 'Prefix Sum'
  | 'Hash Map' | 'Recursion' | 'Linked List' | 'Stack' | 'Queue'
  | 'Binary Tree' | 'BST' | 'Graph' | 'BFS' | 'DFS'
  | 'Backtracking' | 'DP' | 'Greedy' | 'Bit Manipulation' | 'Heap'
  | 'Union Find' | 'Topological Sort' | 'Monotonic Stack'
  | 'Binary Search' | 'Math' | 'SQL' | 'Trie'
  | 'Sorting' | 'Intervals' | 'Matrix';

export interface Problem {
  id: string;
  leetcodeNumber: number;
  title: string;
  difficulty: ProblemDifficulty;
  topicId?: string;
  weekNumber: number;
  patterns: DSAPattern[];
  url: string;
}

export interface ProblemAttempt {
  problemId: string;
  status: ProblemStatus;
  totalAttempts: number;
  correctAttempts: number;
  timeSpentMinutes: number;
  solutionCode: string;
  personalNotes: string;
  mistakes: string[];
  nextRevisionDate?: string;
  firstAttemptedAt?: string;
  lastAttemptedAt?: string;
}

// ── Projects ────────────────────────────────────
export type ProjectStatus = 'not_started' | 'in_progress' | 'completed';

export interface ProjectMilestone {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  weekNumber: number;
  estimatedHours: number;
  milestones: ProjectMilestone[];
  githubUrl: string;
  deployedUrl: string;
  status: ProjectStatus;
  progressPercentage: number;
  startedAt?: string;
  completedAt?: string;
  notes: string;
}

// ── Resources ───────────────────────────────────
export type ResourceType = 'Video' | 'Book' | 'Docs' | 'Interactive' | 'Blog' | 'Course' | 'YouTube' | 'GitHub';

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  url: string;
  weekNumber: number;
  topicId?: string;
  estimatedHours?: number;
  isCompleted: boolean;
}

// ── Daily Plan ──────────────────────────────────
export interface DailyPlan {
  date: string;               // YYYY-MM-DD
  weekNumber: number;
  dayNumber: number;           // 1=Mon
  topic?: Topic;
  problems: Problem[];
  resource?: Resource;
  revisionTopicIds: string[];
  projectMilestone?: string;
  isCompleted: boolean;
  completedItems: string[];    // item IDs marked done
}

// ── Revision ────────────────────────────────────
export interface RevisionItem {
  id: string;
  topicId: string;
  type: 'topic' | 'problem';
  problemId?: string;
  learnedDate: string;
  reviewDates: string[];       // day1, day3, day7, day14, day30
  lastReviewedDate?: string;
  nextReviewDate: string;
  reviewCount: number;
  masteryLevel: number;        // 0–100
}

// ── Progress Tracking ───────────────────────────
export interface DailyProgress {
  date: string;                // YYYY-MM-DD
  hoursSpent: number;
  problemsSolved: number;
  conceptsLearned: number;
  streakCount: number;
  moodRating: number;          // 1–5
  notes: string;
}

// ── Notes ───────────────────────────────────────
export interface Note {
  id: string;
  topicId?: string;
  title: string;
  content: string;             // markdown
  tags: string[];
  isPinned: boolean;
  createdAt: string;
  lastEditedAt: string;
}

// ── Settings ────────────────────────────────────
export interface AppSettings {
  startDate: string;           // YYYY-MM-DD
  endDate: string;
  dailyTargetHours: number;
  timezone: string;
  theme: 'dark' | 'light';
  userName: string;
}

// ── Skill Radar ─────────────────────────────────
export interface SkillLevel {
  name: string;
  level: number;               // 0–100
  maxLevel: number;
}

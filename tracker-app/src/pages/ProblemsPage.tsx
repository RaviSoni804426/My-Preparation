import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Filter, ExternalLink, CheckCircle2, Circle, Clock, X, ChevronDown } from 'lucide-react';
import { useProblemsStore } from '../stores/useProblemsStore';
import { leetcodeProblems } from '../data/problems';
import { difficultyColors, statusColors } from '../lib/utils';
import type { ProblemDifficulty, ProblemStatus, DSAPattern } from '../types';

const allPatterns: DSAPattern[] = [
  'Arrays', 'Strings', 'Two Pointers', 'Sliding Window', 'Hash Map',
  'Linked List', 'Stack', 'Queue', 'Binary Tree', 'BST', 'Graph',
  'BFS', 'DFS', 'DP', 'Backtracking', 'Greedy', 'Heap', 'Bit Manipulation',
  'Binary Search', 'Union Find', 'Topological Sort', 'Monotonic Stack', 'SQL',
];

export default function ProblemsPage() {
  const attempts = useProblemsStore((s) => s.attempts);
  const updateStatus = useProblemsStore((s) => s.updateStatus);
  const updateSolution = useProblemsStore((s) => s.updateSolution);
  const updateNotes = useProblemsStore((s) => s.updateNotes);

  const [diffFilter, setDiffFilter] = useState<ProblemDifficulty | 'All'>('All');
  const [statusFilter, setStatusFilter] = useState<ProblemStatus | 'All'>('All');
  const [patternFilter, setPatternFilter] = useState<DSAPattern | 'All'>('All');
  const [weekFilter, setWeekFilter] = useState<number | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return leetcodeProblems.filter(p => {
      if (diffFilter !== 'All' && p.difficulty !== diffFilter) return false;
      if (patternFilter !== 'All' && !p.patterns.includes(patternFilter)) return false;
      if (weekFilter !== 'All' && p.weekNumber !== weekFilter) return false;
      if (statusFilter !== 'All') {
        const attempt = attempts[p.id];
        const status = attempt?.status || 'unsolved';
        if (status !== statusFilter) return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return p.title.toLowerCase().includes(q) || p.leetcodeNumber.toString().includes(q);
      }
      return true;
    });
  }, [diffFilter, statusFilter, patternFilter, weekFilter, searchQuery, attempts]);

  const selectedProblem = selectedProblemId
    ? leetcodeProblems.find(p => p.id === selectedProblemId)
    : null;

  const totalSolved = Object.values(attempts).filter(a => a.status === 'solved' || a.status === 'mastered').length;

  const statusCycle: ProblemStatus[] = ['unsolved', 'attempted', 'solved', 'mastered'];
  const statusIcons: Record<ProblemStatus, string> = {
    unsolved: '○', attempted: '◐', solved: '●', mastered: '★',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <Code2 className="w-6 h-6 text-brand-primary" />
            Practice Problems
          </h1>
          <p className="text-sm text-text-muted mt-1">
            {totalSolved} solved out of {leetcodeProblems.length} problems
          </p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-bg-surface border border-border-default text-sm text-text-secondary hover:text-text-primary hover:border-border-accent transition-all"
        >
          <Filter className="w-4 h-4" /> Filters
          <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or number..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-bg-surface border border-border-default text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-primary"
      />

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 rounded-xl bg-bg-surface border border-border-default">
              <FilterGroup
                label="Difficulty"
                options={['All', 'Easy', 'Medium', 'Hard']}
                value={diffFilter}
                onChange={(v) => setDiffFilter(v as any)}
              />
              <FilterGroup
                label="Status"
                options={['All', 'unsolved', 'attempted', 'solved', 'mastered']}
                value={statusFilter}
                onChange={(v) => setStatusFilter(v as any)}
              />
              <div>
                <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1 block">Pattern</label>
                <select
                  value={patternFilter}
                  onChange={(e) => setPatternFilter(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-default text-sm text-text-primary focus:outline-none focus:border-brand-primary"
                >
                  <option value="All">All Patterns</option>
                  {allPatterns.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1 block">Week</label>
                <select
                  value={weekFilter}
                  onChange={(e) => setWeekFilter(e.target.value === 'All' ? 'All' : Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-default text-sm text-text-primary focus:outline-none focus:border-brand-primary"
                >
                  <option value="All">All Weeks</option>
                  {Array.from({ length: 10 }, (_, i) => <option key={i+1} value={i+1}>Week {i+1}</option>)}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Row */}
      <div className="flex items-center gap-3 text-xs">
        <span className="px-2 py-1 rounded-lg bg-bg-surface border border-border-default text-text-secondary">
          Showing {filtered.length} problems
        </span>
        {['Easy', 'Medium', 'Hard'].map(d => {
          const count = filtered.filter(p => p.difficulty === d).length;
          return (
            <span key={d} className="px-2 py-1 rounded-lg" style={{ backgroundColor: `${difficultyColors[d]}15`, color: difficultyColors[d] }}>
              {d}: {count}
            </span>
          );
        })}
      </div>

      {/* Problems Table */}
      <div className="surface-card-static overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-default text-text-muted text-xs uppercase tracking-wider">
                <th className="text-left p-3 font-semibold w-12">#</th>
                <th className="text-left p-3 font-semibold">Problem</th>
                <th className="text-left p-3 font-semibold w-24">Difficulty</th>
                <th className="text-left p-3 font-semibold w-24">Status</th>
                <th className="text-left p-3 font-semibold w-24">Pattern</th>
                <th className="text-left p-3 font-semibold w-16">Week</th>
                <th className="text-center p-3 font-semibold w-16">Link</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((problem) => {
                const attempt = attempts[problem.id];
                const status: ProblemStatus = attempt?.status || 'unsolved';

                return (
                  <tr
                    key={problem.id}
                    className="border-b border-border-subtle hover:bg-bg-surface-hover transition-colors cursor-pointer"
                    onClick={() => setSelectedProblemId(problem.id)}
                  >
                    <td className="p-3 text-text-muted font-mono text-xs">{problem.leetcodeNumber}</td>
                    <td className="p-3">
                      <span className="text-text-primary font-medium">{problem.title}</span>
                    </td>
                    <td className="p-3">
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${difficultyColors[problem.difficulty]}15`,
                          color: difficultyColors[problem.difficulty],
                        }}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const idx = statusCycle.indexOf(status);
                          const next = statusCycle[(idx + 1) % statusCycle.length];
                          updateStatus(problem.id, next);
                        }}
                        className="text-xs font-semibold px-2 py-0.5 rounded-full transition-colors"
                        style={{
                          backgroundColor: `${statusColors[status]}15`,
                          color: statusColors[status],
                        }}
                      >
                        {statusIcons[status]} {status}
                      </button>
                    </td>
                    <td className="p-3">
                      <span className="text-xs text-text-muted">
                        {problem.patterns[0] || '—'}
                      </span>
                    </td>
                    <td className="p-3 text-text-muted text-xs">W{problem.weekNumber}</td>
                    <td className="p-3 text-center">
                      <a
                        href={problem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-text-muted hover:text-brand-primary transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 inline" />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Problem Detail Modal */}
      <AnimatePresence>
        {selectedProblem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProblemId(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-bg-surface border border-border-default rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-text-primary">
                    #{selectedProblem.leetcodeNumber} — {selectedProblem.title}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${difficultyColors[selectedProblem.difficulty]}15`,
                        color: difficultyColors[selectedProblem.difficulty],
                      }}
                    >
                      {selectedProblem.difficulty}
                    </span>
                    {selectedProblem.patterns.map(p => (
                      <span key={p} className="text-xs px-2 py-0.5 rounded-full bg-bg-elevated text-text-muted">{p}</span>
                    ))}
                  </div>
                </div>
                <button onClick={() => setSelectedProblemId(null)} className="text-text-muted hover:text-text-primary">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-1">Solution Code</label>
                  <textarea
                    value={attempts[selectedProblem.id]?.solutionCode || ''}
                    onChange={(e) => updateSolution(selectedProblem.id, e.target.value)}
                    placeholder="Paste your solution here..."
                    className="w-full h-48 bg-bg-secondary border border-border-default rounded-xl p-4 text-sm text-text-primary placeholder-text-muted resize-y focus:outline-none focus:border-brand-primary font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-1">Personal Notes</label>
                  <textarea
                    value={attempts[selectedProblem.id]?.personalNotes || ''}
                    onChange={(e) => updateNotes(selectedProblem.id, e.target.value)}
                    placeholder="Approach, mistakes, key insight..."
                    className="w-full h-24 bg-bg-secondary border border-border-default rounded-xl p-4 text-sm text-text-primary placeholder-text-muted resize-y focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={selectedProblem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-primary text-white text-sm font-semibold hover:bg-brand-primary-hover transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> Open on LeetCode
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterGroup({ label, options, value, onChange }: {
  label: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1 block">{label}</label>
      <div className="flex flex-wrap gap-1">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-2 py-1 rounded-lg text-xs font-medium border transition-all
              ${value === opt
                ? 'bg-brand-primary/15 border-brand-primary/30 text-brand-primary'
                : 'bg-bg-secondary border-border-default text-text-muted hover:text-text-primary'
              }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

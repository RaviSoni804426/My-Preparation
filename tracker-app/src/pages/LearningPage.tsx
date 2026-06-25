import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight, CheckCircle2, Circle, Clock, Star, ChevronDown, ExternalLink } from 'lucide-react';
import { useProgressStore } from '../stores/useProgressStore';
import { useSettingsStore } from '../stores/useSettingsStore';
import { useRevisionStore } from '../stores/useRevisionStore';
import { roadmapTopics, phaseInfo } from '../data/roadmap';
import { getCurrentWeekNumber, categoryColors, difficultyColors, todayISO } from '../lib/utils';
import ReactMarkdown from 'react-markdown';

export default function LearningPage() {
  const settings = useSettingsStore((s) => s.settings);
  const currentWeek = getCurrentWeekNumber(settings.startDate);
  const topicProgress = useProgressStore((s) => s.topicProgress);
  const markTopicStatus = useProgressStore((s) => s.markTopicStatus);
  const updateTopicConfidence = useProgressStore((s) => s.updateTopicConfidence);
  const updateTopicNotes = useProgressStore((s) => s.updateTopicNotes);
  const addRevisionItem = useRevisionStore((s) => s.addRevisionItem);

  const [selectedWeek, setSelectedWeek] = useState(currentWeek);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [notesText, setNotesText] = useState('');

  const weekTopics = useMemo(
    () => roadmapTopics.filter(t => t.weekNumber === selectedWeek).sort((a, b) => a.dayNumber - b.dayNumber),
    [selectedWeek]
  );

  const selectedTopic = selectedTopicId
    ? roadmapTopics.find(t => t.id === selectedTopicId)
    : weekTopics[0];

  const topicProg = selectedTopic ? topicProgress[selectedTopic.id] : undefined;

  const handleComplete = (topicId: string) => {
    markTopicStatus(topicId, 'completed');
    addRevisionItem(topicId, todayISO());
  };

  const dayNames = ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-brand-primary" />
          Learning
        </h1>
        <p className="text-sm text-text-muted mt-1">Master each topic step by step</p>
      </div>

      {/* Week Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {Array.from({ length: 10 }, (_, i) => i + 1).map(week => {
          const wTopics = roadmapTopics.filter(t => t.weekNumber === week);
          const completedCount = wTopics.filter(t => topicProgress[t.id]?.status === 'completed').length;
          const isCurrentWeek = week === currentWeek;
          const isSelected = week === selectedWeek;
          const allDone = completedCount === wTopics.length && wTopics.length > 0;

          return (
            <button
              key={week}
              onClick={() => { setSelectedWeek(week); setSelectedTopicId(null); }}
              className={`shrink-0 px-3 py-2 rounded-lg text-xs font-semibold border transition-all
                ${isSelected
                  ? 'bg-brand-primary/15 border-brand-primary/30 text-brand-primary glow-sm'
                  : isCurrentWeek
                    ? 'bg-bg-surface border-border-accent text-text-primary'
                    : allDone
                      ? 'bg-accent-success/10 border-accent-success/20 text-accent-success'
                      : 'bg-bg-surface border-border-default text-text-muted hover:text-text-primary hover:border-border-accent'
                }`}
            >
              W{week}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar — Topic List */}
        <div className="lg:w-72 shrink-0 space-y-2">
          <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
            Week {selectedWeek} Topics
          </h3>
          {weekTopics.map(topic => {
            const prog = topicProgress[topic.id];
            const isActive = selectedTopic?.id === topic.id;
            const isCompleted = prog?.status === 'completed';

            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all
                  ${isActive
                    ? 'bg-brand-primary/10 border-brand-primary/30 glow-sm'
                    : 'bg-bg-surface border-border-subtle hover:border-border-accent'
                  }`}
              >
                <div className="flex items-start gap-2">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-accent-success mt-0.5 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-text-muted mt-0.5 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] font-bold text-text-muted">{dayNames[topic.dayNumber]}</span>
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: categoryColors[topic.category] }}
                      />
                    </div>
                    <p className={`text-sm font-medium leading-tight ${isCompleted ? 'text-text-muted line-through' : 'text-text-primary'}`}>
                      {topic.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: `${difficultyColors[topic.difficulty]}15`,
                          color: difficultyColors[topic.difficulty],
                        }}
                      >
                        {topic.difficulty}
                      </span>
                      <span className="text-[10px] text-text-muted flex items-center gap-0.5">
                        <Clock className="w-3 h-3" /> {topic.estimatedHours}h
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Content */}
        <div className="flex-1 min-w-0">
          {selectedTopic ? (
            <motion.div
              key={selectedTopic.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-5"
            >
              {/* Topic Header */}
              <div className="surface-card-static p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
                        style={{
                          backgroundColor: `${categoryColors[selectedTopic.category]}20`,
                          color: categoryColors[selectedTopic.category],
                        }}
                      >
                        {selectedTopic.category}
                      </span>
                      <span
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${difficultyColors[selectedTopic.difficulty]}15`,
                          color: difficultyColors[selectedTopic.difficulty],
                        }}
                      >
                        {selectedTopic.difficulty}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-text-primary">{selectedTopic.title}</h2>
                    <p className="text-sm text-text-secondary mt-1">{selectedTopic.description}</p>
                  </div>

                  <button
                    onClick={() => {
                      if (topicProg?.status === 'completed') {
                        markTopicStatus(selectedTopic.id, 'not_started');
                      } else {
                        handleComplete(selectedTopic.id);
                      }
                    }}
                    className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all
                      ${topicProg?.status === 'completed'
                        ? 'bg-accent-success/15 text-accent-success border border-accent-success/30'
                        : 'bg-brand-primary text-white hover:bg-brand-primary-hover glow-sm'
                      }`}
                  >
                    {topicProg?.status === 'completed' ? '✓ Completed' : 'Mark Complete'}
                  </button>
                </div>

                {/* Confidence Slider */}
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-xs text-text-muted">Confidence:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(level => (
                      <button
                        key={level}
                        onClick={() => updateTopicConfidence(selectedTopic.id, level)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            (topicProg?.confidenceLevel || 0) >= level
                              ? 'text-accent-warning fill-accent-warning'
                              : 'text-text-muted'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Learning Content */}
              {selectedTopic.learningContent && (
                <ExpandableSection title="📖 Concept Notes" defaultOpen>
                  <div className="markdown-content">
                    <ReactMarkdown>{selectedTopic.learningContent}</ReactMarkdown>
                  </div>
                </ExpandableSection>
              )}

              {/* Lab */}
              {selectedTopic.labDescription && (
                <ExpandableSection title="🔬 Hands-on Lab">
                  <div className="markdown-content">
                    <ReactMarkdown>{selectedTopic.labDescription}</ReactMarkdown>
                  </div>
                </ExpandableSection>
              )}

              {/* Interview Questions */}
              {selectedTopic.interviewQuestions && selectedTopic.interviewQuestions.length > 0 && (
                <ExpandableSection title="💼 Interview Questions">
                  <ul className="space-y-2">
                    {selectedTopic.interviewQuestions.map((q, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="text-brand-primary font-bold mt-0.5">Q{i + 1}.</span>
                        {q}
                      </li>
                    ))}
                  </ul>
                </ExpandableSection>
              )}

              {/* Personal Notes */}
              <div className="surface-card-static p-5">
                <h3 className="text-sm font-semibold text-text-primary mb-3">📝 My Notes</h3>
                <textarea
                  value={topicProg?.notes || notesText}
                  onChange={(e) => {
                    setNotesText(e.target.value);
                    updateTopicNotes(selectedTopic.id, e.target.value);
                  }}
                  placeholder="Write your notes here (supports markdown)..."
                  className="w-full h-40 bg-bg-secondary border border-border-default rounded-xl p-4 text-sm text-text-primary placeholder-text-muted resize-y focus:outline-none focus:border-brand-primary font-mono"
                />
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-16 text-text-muted">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Select a topic to start learning</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ExpandableSection({ title, children, defaultOpen = false }: {
  title: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="surface-card-static overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 hover:bg-bg-surface-hover transition-colors"
      >
        <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
        <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}

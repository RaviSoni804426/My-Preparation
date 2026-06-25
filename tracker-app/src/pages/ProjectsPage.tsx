import { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderKanban, CheckCircle2, Circle, Github, ExternalLink, ChevronDown } from 'lucide-react';
import { useProjectsStore } from '../stores/useProjectsStore';
import { statusColors, getProgressPercentage } from '../lib/utils';

export default function ProjectsPage() {
  const projects = useProjectsStore((s) => s.projects);
  const toggleMilestone = useProjectsStore((s) => s.toggleMilestone);
  const updateProject = useProjectsStore((s) => s.updateProject);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          <FolderKanban className="w-6 h-6 text-brand-primary" />
          Projects
        </h1>
        <p className="text-sm text-text-muted mt-1">Build 6 portfolio-worthy projects</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {projects.map((project, i) => {
          const isExpanded = expandedId === project.id;
          const completedMilestones = project.milestones.filter(m => m.isCompleted).length;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="surface-card-static overflow-hidden"
            >
              <div
                className="p-5 cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : project.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-text-muted">#{i + 1}</span>
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${statusColors[project.status]}15`,
                          color: statusColors[project.status],
                        }}
                      >
                        {project.status.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] text-text-muted">Week {project.weekNumber}</span>
                    </div>
                    <h3 className="text-base font-bold text-text-primary">{project.title}</h3>
                    <p className="text-xs text-text-secondary mt-1 line-clamp-2">{project.description}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-text-muted transition-transform shrink-0 ml-3 ${isExpanded ? 'rotate-180' : ''}`} />
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.techStack.map(tech => (
                    <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full bg-bg-elevated text-text-muted border border-border-subtle">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Progress */}
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-text-muted">
                      {completedMilestones}/{project.milestones.length} milestones
                    </span>
                    <span className="text-[10px] font-semibold text-brand-primary">{project.progressPercentage}%</span>
                  </div>
                  <div className="h-1.5 bg-bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary"
                      animate={{ width: `${project.progressPercentage}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              {/* Expanded — Milestones */}
              {isExpanded && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  className="border-t border-border-default px-5 py-4 space-y-3"
                >
                  <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider">Milestones</h4>
                  {project.milestones.map(milestone => (
                    <button
                      key={milestone.id}
                      onClick={() => toggleMilestone(project.id, milestone.id)}
                      className="flex items-center gap-2 w-full text-left group"
                    >
                      {milestone.isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-accent-success shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-text-muted group-hover:text-brand-primary shrink-0 transition-colors" />
                      )}
                      <span className={`text-sm ${milestone.isCompleted ? 'text-text-muted line-through' : 'text-text-primary'}`}>
                        {milestone.title}
                      </span>
                    </button>
                  ))}

                  {/* GitHub URL */}
                  <div className="pt-2">
                    <label className="text-[10px] text-text-muted uppercase tracking-wider block mb-1">GitHub URL</label>
                    <input
                      type="text"
                      value={project.githubUrl}
                      onChange={(e) => updateProject(project.id, { githubUrl: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-default text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

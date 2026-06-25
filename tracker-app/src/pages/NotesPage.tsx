import React, { useState } from 'react';
import { useNotesStore } from '../stores/useNotesStore';
import { Note } from '../types';
import { Search, Pin, Plus, Trash2, Edit, Save, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function NotesPage() {
  const { notes, addNote, updateNote, deleteNote, togglePin } = useNotesStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  
  // Form states for creating/editing
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteTags, setNoteTags] = useState('');

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.lastEditedAt).getTime() - new Date(a.lastEditedAt).getTime();
  });

  const handleSave = () => {
    if (!noteTitle.trim()) return;

    const tagsArray = noteTags.split(',').map(t => t.trim()).filter(Boolean);

    if (editingNoteId) {
      updateNote(editingNoteId, {
        title: noteTitle,
        content: noteContent,
        tags: tagsArray,
      });
      setEditingNoteId(null);
    } else {
      addNote({
        title: noteTitle,
        content: noteContent,
        tags: tagsArray,
        isPinned: false,
      });
    }

    setNoteTitle('');
    setNoteContent('');
    setNoteTags('');
  };

  const handleStartEdit = (note: Note) => {
    setEditingNoteId(note.id);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setNoteTags(note.tags.join(', '));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Study Notes</h1>
          <p className="text-sm text-text-muted mt-1">Write down notes, code snippets, and review concepts</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search notes or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-bg-surface border border-border-default text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Form */}
        <div className="lg:col-span-1 bg-bg-surface border border-border-default rounded-xl p-5 space-y-4 h-fit">
          <h2 className="text-lg font-bold text-text-primary">
            {editingNoteId ? 'Edit Study Note' : 'Create New Note'}
          </h2>
          
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Title</label>
            <input
              type="text"
              placeholder="e.g. Dijkstra Shortest Path Pattern"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-default text-sm text-text-primary focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Content (Markdown Supported)</label>
            <textarea
              placeholder="Write your notes here..."
              rows={8}
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-default text-sm text-text-primary focus:outline-none focus:border-brand-primary resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Tags (comma-separated)</label>
            <input
              type="text"
              placeholder="e.g. Graph, Greedy, Week 5"
              value={noteTags}
              onChange={(e) => setNoteTags(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-bg-secondary border border-border-default text-sm text-text-primary focus:outline-none focus:border-brand-primary"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full py-2 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            {editingNoteId ? 'Save Changes' : 'Create Note'}
          </button>
          
          {editingNoteId && (
            <button
              onClick={() => {
                setEditingNoteId(null);
                setNoteTitle('');
                setNoteContent('');
                setNoteTags('');
              }}
              className="w-full py-2 rounded-lg bg-bg-secondary hover:bg-bg-surface-hover text-text-secondary text-sm font-medium transition-colors"
            >
              Cancel Edit
            </button>
          )}
        </div>

        {/* Notes Grid */}
        <div className="lg:col-span-2 space-y-4">
          {sortedNotes.length === 0 ? (
            <div className="text-center py-16 bg-bg-surface border border-dashed border-border-default rounded-xl">
              <p className="text-text-secondary text-sm">No notes found. Create one to begin!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sortedNotes.map((note) => (
                <div key={note.id} className="bg-bg-surface border border-border-default rounded-xl p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-text-primary line-clamp-1">{note.title}</h3>
                      <button
                        onClick={() => togglePin(note.id)}
                        className={`p-1 rounded-lg hover:bg-bg-secondary transition-colors ${note.isPinned ? 'text-brand-primary' : 'text-text-muted'}`}
                      >
                        <Pin className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-sm text-text-secondary line-clamp-4 mt-2 overflow-hidden prose prose-invert max-w-none">
                      <ReactMarkdown>{note.content}</ReactMarkdown>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Tags */}
                    {note.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {note.tags.map(t => (
                          <span key={t} className="flex items-center gap-0.5 px-2 py-0.5 rounded bg-bg-secondary border border-border-default text-[10px] text-text-muted">
                            <Tag className="w-2.5 h-2.5" />
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between border-t border-border-default pt-3">
                      <span className="text-[10px] text-text-muted">
                        Edited: {new Date(note.lastEditedAt).toLocaleDateString()}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStartEdit(note)}
                          className="p-1 rounded text-text-muted hover:text-brand-primary hover:bg-bg-secondary transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="p-1 rounded text-text-muted hover:text-brand-danger hover:bg-bg-secondary transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

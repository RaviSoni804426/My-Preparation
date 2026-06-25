import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import LearningPage from './pages/LearningPage';
import ProblemsPage from './pages/ProblemsPage';
import ProjectsPage from './pages/ProjectsPage';
import RevisionCenter from './pages/RevisionCenter';
import AnalyticsPage from './pages/AnalyticsPage';
import NotesPage from './pages/NotesPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/learning" element={<LearningPage />} />
          <Route path="/problems" element={<ProblemsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/revision" element={<RevisionCenter />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

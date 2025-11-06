import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ResumeProvider, useResume } from './context/ResumeContext';
import ThemeToggleButton from './components/ThemeToggleButton';
import DataInputPage from './components/DataInputPage';
import DesignSelectionPage from './components/DesignSelectionPage';
import FinalResumePage from './components/FinalResumePage';
import './styles_new.css';
import './themes.css';

function AppContent() {
  const { theme } = useResume();

  return (
    <div className={`app-container ${theme}`}>
      <ThemeToggleButton />
      <Routes>
        <Route path="/" element={<DataInputPage />} />
        <Route path="/design" element={<DesignSelectionPage />} />
        <Route path="/resume" element={<FinalResumePage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ResumeProvider>
      <Router>
        <AppContent />
      </Router>
    </ResumeProvider>
  );
}

export default App;
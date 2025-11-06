import React from 'react';
import { useResume } from '../context/ResumeContext';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useResume();

  return (
    <button 
      className="btn-primary"
      onClick={toggleTheme}
      style={{ position: 'fixed', top: '1rem', right: '1rem' }}
    >
      {theme === 'theme-neon' ? '🌌 Aurora' : '💡 Neon'}
    </button>
  );
};

export default ThemeToggleButton;
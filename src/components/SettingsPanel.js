import React from 'react';
import { useResume } from '../context/ResumeContext';
import './SettingsPanel.css';

const SettingsPanel = () => {
  const { 
    sectionSpacing, setSectionSpacing,
    fontSize, setFontSize,
    lineHeight, setLineHeight,
    letterSpacing, setLetterSpacing,
    fontFamily, setFontFamily, 
    theme
  } = useResume();

  return (
    <div className={`settings-panel-horizontal ${theme}`}>
      <div className="setting">
        <label>Section Spacing: {sectionSpacing}px</label>
        <input 
          type="range" 
          min="10" 
          max="50" 
          value={sectionSpacing} 
          onChange={(e) => setSectionSpacing(e.target.value)} 
        />
      </div>
      <div className="setting">
        <label>Font Size: {fontSize}px</label>
        <input 
          type="range" 
          min="12" 
          max="24" 
          value={fontSize} 
          onChange={(e) => setFontSize(e.target.value)} 
        />
      </div>
      <div className="setting">
        <label>Line Height: {lineHeight}</label>
        <input 
          type="range" 
          min="1.2" 
          max="2.5" 
          step="0.1" 
          value={lineHeight} 
          onChange={(e) => setLineHeight(e.target.value)} 
        />
      </div>
      <div className="setting">
        <label>Letter Spacing: {letterSpacing}px</label>
        <input 
          type="range" 
          min="0" 
          max="5" 
          step="0.1" 
          value={letterSpacing} 
          onChange={(e) => setLetterSpacing(e.target.value)} 
        />
      </div>
      <div className="setting">
        <label>Font Family</label>
        <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
          <option value="Roboto">Roboto</option>
          <option value="Lato">Lato</option>
          <option value="Montserrat">Montserrat</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Helvetica Neue">Helvetica Neue</option>
        </select>
      </div>
    </div>
  );
};

export default SettingsPanel;
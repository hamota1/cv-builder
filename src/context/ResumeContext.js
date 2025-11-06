import React, { createContext, useContext, useState, useEffect } from 'react';

const ResumeContext = createContext();

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

export const ResumeProvider = ({ children }) => {
  // Initialize with data from localStorage if available
  const getInitialData = () => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      return JSON.parse(savedData);
    }
    // Default data structure
    return {
      personal: {
        fullName: '',
        jobTitle: '',
        email: '',
        phone: '',
        location: '',
        LinkedIn: '',
        profilePicture: ''
      },
      summary: '',
      experience: [],
      education: [],
      skills: [{ skill: '', percentage: 0 }],
      languages: [],
      certifications: [],
      projects: [],
      volunteer: [],
      references: []
    };
  };

  const [resumeData, setResumeData] = useState(getInitialData());

  // Update localStorage whenever resumeData changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  const [selectedDesign, setSelectedDesign] = useState('');
  const [theme, setTheme] = useState('theme-neon');
  const [sectionSpacing, setSectionSpacing] = useState(20);
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [fontFamily, setFontFamily] = useState('Roboto');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'theme-neon' ? 'theme-aurora' : 'theme-neon');
  }

  const value = {
    resumeData,
    setResumeData,
    selectedDesign,
    setSelectedDesign,
    theme,
    toggleTheme,
    sectionSpacing,
    setSectionSpacing,
    fontSize,
    setFontSize,
    lineHeight,
    setLineHeight,
    letterSpacing,
    setLetterSpacing,
    fontFamily,
    setFontFamily
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};

export default ResumeContext;
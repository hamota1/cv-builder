import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import templates from '../templates.json';
import { downloadAsWord } from './downloadWordFixed';

// Layout components
import SidebarLayout from './layouts/SidebarLayout';
import SingleColumnLayout from './layouts/SingleColumnLayout';
import HeaderSplitLayout from './layouts/HeaderSplitLayout';
import HeaderBlockLayout from './layouts/HeaderBlockLayout';
import VisualBlockLayout from './layouts/VisualBlockLayout';
import HeaderSummaryLayout from './layouts/HeaderSummaryLayout';
import NarrowSidebarLayout from './layouts/NarrowSidebarLayout';
import QuadrantLayout from './layouts/QuadrantLayout';

const FinalResumePage = () => {
  const navigate = useNavigate();
  const { resumeData: data, selectedDesign, setResumeData, setSelectedDesign } = useResume();

  const template = templates.find(t => t.id === selectedDesign);

  const renderTemplate = () => {
    if (!template) return null;
    const props = { data: data, theme: template.theme };

    switch (template.layout) {
      case 'sidebar': return <SidebarLayout {...props} />;
      case 'single-column': return <SingleColumnLayout {...props} />;
      case 'header-split': return <HeaderSplitLayout {...props} />;
      case 'header-block': return <HeaderBlockLayout {...props} />;
      case 'visual-block': return <VisualBlockLayout {...props} />;
      case 'header-summary': return <HeaderSummaryLayout {...props} />;
      case 'narrow-sidebar': return <NarrowSidebarLayout {...props} />;
      case 'quadrant': return <QuadrantLayout {...props} />;
      default: return <SingleColumnLayout {...props} />;
    }
  };

  const handleBackToDesigns = () => {
    navigate('/design');
  };

  const handleEditInfo = () => {
    navigate('/');
  };

  const handleStartOver = () => {
    // طلب تأكيد من المستخدم قبل مسح البيانات
    if (window.confirm('هل أنت متأكد من أنك تريد البدء من جديد؟ سيتم فقدان جميع البيانات المدخلة.')) {
      setResumeData({
        personal: { fullName: '', jobTitle: '', email: '', phone: '', linkedIn: '', location: '' },
        summary: '',
        experience: [],
        education: [],
        skills: [],
        languages: [],
        certifications: [],
        projects: [],
        volunteer: [],
        references: [],
        preferredIndustry: ''
      });
      setSelectedDesign('');
      navigate('/');
    }
  };

  return (
    <div className="resume-preview-container">
      <div id="resume-preview-area">
        {renderTemplate()}
      </div>

      <div className="download-buttons">
        <button onClick={() => downloadAsWord(data)} className="btn-primary">
          Download as Word
        </button>
        <button onClick={handleBackToDesigns} className="btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: "8px"}}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="9" x2="15" y2="15"></line>
            <line x1="15" y1="9" x2="9" y2="15"></line>
          </svg>
          Change Design
        </button>
        <button onClick={handleEditInfo} className="btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: "8px"}}>
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Edit Information
        </button>
        <button onClick={handleStartOver} className="btn-primary">
          Start Over
        </button>
      </div>
    </div>
  );
};

export default FinalResumePage;

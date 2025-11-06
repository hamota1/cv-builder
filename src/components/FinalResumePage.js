import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import templates from '../templates.json';
import { downloadAsPDF } from './downloadPdf';
import { downloadAsWord } from './downloadWordFixed';
import { downloadAsHTML } from './downloadHtml';

// Layout components
import SidebarLayout from './layouts/SidebarLayout';
import SingleColumnLayout from './layouts/SingleColumnLayout';

import HeaderBlockLayout from './layouts/HeaderBlockLayout';
import VisualBlockLayout from './layouts/VisualBlockLayout';
import HeaderSummaryPeachLayout from './layouts/HeaderSummaryPeachLayout';
import CorporateGreenLayout from './layouts/CorporateGreenLayout';
import NarrowSidebarLayout from './layouts/NarrowSidebarLayout';
import QuadrantLayout from './layouts/QuadrantLayout';
import ExecutiveGoldSidebarLayout from './layouts/ExecutiveGoldSidebarLayout';
import QuadrantPurpleLayout from './layouts/QuadrantPurpleLayout';
import YellowHeaderLayout from './layouts/YellowHeaderLayout';
import VisualYellowLayout from './layouts/VisualYellowLayout';
import ElegantSerifLayout from './layouts/ElegantSerifLayout';
import UltraMinimalistLayout from './layouts/UltraMinimalistLayout';
import ClassicBlueSidebarLayout from './layouts/ClassicBlueSidebarLayout';
import LightBlueSidebarLayout from './layouts/LightBlueSidebarLayout';
import TealSidebarLayout from './layouts/TealSidebarLayout';
import ModernBoldLayout from './layouts/ModernBoldLayout';
import SoftwareEngineerProLayout from './layouts/SoftwareEngineerProLayout';

import SettingsPanel from './SettingsPanel';

const FinalResumePage = () => {
  const navigate = useNavigate();
  const { resumeData: data, selectedDesign, setResumeData, setSelectedDesign, sectionSpacing, fontSize, lineHeight, letterSpacing, fontFamily } = useResume();

  const template = templates.find(t => t.id === selectedDesign);

  const renderTemplate = () => {
    if (!template) return null;
    const props = { data: data, theme: template.theme };

    switch (template.layout) {

      case 'sidebar': return <SidebarLayout {...props} />;
      case 'single-column': return <SingleColumnLayout {...props} />;

      case 'header-block': return <HeaderBlockLayout {...props} />;
      case 'visual-block': return <VisualBlockLayout {...props} />;
      // case 'header-summary': return <HeaderSummaryLayout {...props} />; // Deprecated
      case 'header-summary-peach': return <HeaderSummaryPeachLayout {...props} />;
      case 'corporate-green': return <CorporateGreenLayout {...props} />;
      case 'narrow-sidebar': return <NarrowSidebarLayout {...props} />;
      case 'quadrant': return <QuadrantLayout {...props} />;
      case 'executive-gold-sidebar': return <ExecutiveGoldSidebarLayout {...props} />;
      case 'quadrant-purple': return <QuadrantPurpleLayout {...props} />;
      case 'yellow-header': return <YellowHeaderLayout {...props} />;
      case 'visual-yellow': return <VisualYellowLayout {...props} />;
      case 'elegant-serif': return <ElegantSerifLayout {...props} />;
      case 'ultra-minimalist': return <UltraMinimalistLayout {...props} />;
      case 'classic-blue-sidebar': return <ClassicBlueSidebarLayout {...props} />;
      case 'light-blue-sidebar': return <LightBlueSidebarLayout {...props} />;
      case 'teal-sidebar': return <TealSidebarLayout {...props} />;
      case 'modern-bold': return <ModernBoldLayout {...props} />;
      case 'software-engineer-pro': return <SoftwareEngineerProLayout {...props} />;
      default: return <SingleColumnLayout {...props} />;
    }
  };



  // eslint-disable-next-line no-unused-vars
  const downloadAsHTML_old = () => {
    const element = document.getElementById('resume-preview-area');
    const htmlContent = element.innerHTML;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume.html`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleBackToDesigns = () => {
    navigate('/design');
  };

  const handleEditInfo = () => {
    // الحفاظ على البيانات الحالية عند العودة للتعديل
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
    <div 
      className="final-resume-page"
    >
      <div 
        className="resume-preview-container"
        style={{
          '--section-spacing': `${sectionSpacing}px`,
          '--font-size': `${fontSize}px`,
          '--line-height': lineHeight,
          '--letter-spacing': `${letterSpacing}px`,
          '--font-family': fontFamily,
        }}
      >
        <SettingsPanel />
        <div id="resume-preview-area">
          {renderTemplate()}
        </div>

        <div className="download-buttons">
          <button onClick={downloadAsPDF} className="btn-primary">
            Download as PDF
          </button>
          <button onClick={() => downloadAsHTML(data)} className="btn-primary">
            Download as HTML
          </button>
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
    </div>
  );
};

export default FinalResumePage;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import templates from '../templates.json';

const DesignSelectionPage = () => {
  const navigate = useNavigate();
  const { setSelectedDesign } = useResume();

  const handleSelectTemplate = (templateId) => {
    setSelectedDesign(templateId);
    navigate('/resume');
  };

  return (
    <div className="design-selection">
      <h1>Choose Your Resume Design</h1>
      <div className="templates-grid">
        {templates.map((template) => (
          <div key={template.id} className="template-card">
            <img 
              src={template.thumbnail} 
              alt={template.name} 
              className="template-preview"
            />
            <div className="template-info">
              <h3>{template.name}</h3>
              <p>{template.description}</p>
              <button
                onClick={() => handleSelectTemplate(template.id)}
                className="btn-primary"
              >
                Select This Design
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignSelectionPage;
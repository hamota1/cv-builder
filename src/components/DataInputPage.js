import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './DataInputPage.css';

const DataInputPage = () => {
  const navigate = useNavigate();
  const { resumeData, setResumeData } = useResume();
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState();
  const imgRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateSummary = async () => {
    setIsGenerating(true);

    try {
      const { personal, experience, skills } = resumeData;

      const response = await fetch('/.netlify/functions/generate-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobTitle: personal.jobTitle,
          experience: experience,
          skills: skills
        }),
      });

      if (!response.ok) {
        // Try to get more specific error from backend
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate summary');
      }

      const data = await response.json();
      handleSummaryChange(data.summary);

    } catch (error) {
      console.error("Error generating summary:", error);
      alert(`Failed to generate summary: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };



  // Personal info handlers
      const handlePersonalChange = (field, value) => {
          setResumeData(prev => ({
              ...prev,
              personal: {
                  ...prev.personal,
                  [field]: typeof value === 'string' ? value.trim() : value
              }
          }));
      };
  const handleProfilePictureChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setImgSrc(reader.result.toString() || ''),
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        1,
        width,
        height,
      ),
      width,
      height,
    );
    setCrop(crop);
  }

  const handleSaveCrop = () => {
    if (!imgRef.current || !crop) {
      return;
    }

    const canvas = document.createElement('canvas');
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      imgRef.current,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    const base64Image = canvas.toDataURL('image/jpeg');
    handlePersonalChange('profilePicture', base64Image);
    setImgSrc('');
  }

  // Summary handler
  const handleSummaryChange = (value) => {
    setResumeData(prev => ({
      ...prev,
      summary: value
    }));
  };

  // Experience handlers
  const handleExperienceAdd = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        { company: '', role: '', dates: '', achievements: [''] }
      ]
    }));
  };

  const handleExperienceRemove = (index) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const handleExperienceAchievementAdd = (index) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index ? { ...exp, achievements: [...(exp.achievements || []), ''] } : exp
      )
    }));
  };

  const handleExperienceAchievementRemove = (index, achievementIndex) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index
          ? {
              ...exp,
              achievements: exp.achievements.filter((_, j) => j !== achievementIndex)
            }
          : exp
      )
    }));
  };

  const handleExperienceAchievementChange = (index, achievementIndex, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index
          ? {
              ...exp,
              achievements: (exp.achievements || []).map((achievement, j) =>
                j === achievementIndex ? value : achievement
              )
            }
          : exp
      )
    }));
  };

  // Education handlers
  const handleEducationAdd = () => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { degree: '', major: '', university: '', year: '', achievements: [''] }
      ]
    }));
  };

  const handleEducationRemove = (index) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleEducationChange = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const handleEducationAchievementAdd = (index) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, achievements: [...(edu.achievements || []), ''] } : edu
      )
    }));
  };

  const handleEducationAchievementRemove = (index, achievementIndex) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index
          ? {
              ...edu,
              achievements: edu.achievements.filter((_, j) => j !== achievementIndex)
            }
          : edu
      )
    }));
  };

  const handleEducationAchievementChange = (index, achievementIndex, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index
          ? {
              ...edu,
              achievements: (edu.achievements || []).map((achievement, j) =>
                j === achievementIndex ? value : achievement
              )
            }
          : edu
      )
    }));
  };

  // Skills handlers
  const handleSkillAdd = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, { skill: '', percentage: 0 }]
    }));
  };

  const handleSkillRemove = (index) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleSkillChange = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) =>
        i === index ? { ...skill, [field]: value } : skill
      )
    }));
  };

  // Projects handlers
  const handleProjectAdd = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        { title: '', dates: '', description: '', technologies: '', achievements: [''], imageURL: '' }
      ]
    }));
  };

  const handleProjectRemove = (index) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const handleProjectChange = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((project, i) =>
        i === index ? { ...project, [field]: value } : project
      )
    }));
  };

  const handleProjectImageAdd = (index, files) => {
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleProjectChange(index, 'imageURL', reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleProjectAchievementAdd = (index) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((project, i) =>
        i === index ? { ...project, achievements: [...(project.achievements || []), ''] } : project
      )
    }));
  };

  const handleProjectAchievementRemove = (index, achievementIndex) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((project, i) =>
        i === index
          ? {
              ...project,
              achievements: project.achievements.filter((_, j) => j !== achievementIndex)
            }
          : project
      )
    }));
  };

  const handleProjectAchievementChange = (index, achievementIndex, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((project, i) =>
        i === index
          ? {
              ...project,
              achievements: (project.achievements || []).map((achievement, j) =>
                j === achievementIndex ? value : achievement
              )
            }
          : project
      )
    }));
  };

  // Volunteer handlers
  const handleVolunteerAdd = () => {
    setResumeData(prev => ({
      ...prev,
      volunteer: [
        ...prev.volunteer,
        { organization: '', role: '', dates: '', description: '', achievements: [''] }
      ]
    }));
  };

  const handleVolunteerRemove = (index) => {
    setResumeData(prev => ({
      ...prev,
      volunteer: prev.volunteer.filter((_, i) => i !== index)
    }));
  };

  const handleVolunteerChange = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      volunteer: prev.volunteer.map((vol, i) =>
        i === index ? { ...vol, [field]: value } : vol
      )
    }));
  };

  const handleVolunteerAchievementAdd = (index) => {
    setResumeData(prev => ({
      ...prev,
      volunteer: prev.volunteer.map((vol, i) =>
        i === index ? { ...vol, achievements: [...(vol.achievements || []), ''] } : vol
      )
    }));
  };

  const handleVolunteerAchievementRemove = (index, achievementIndex) => {
    setResumeData(prev => ({
      ...prev,
      volunteer: prev.volunteer.map((vol, i) =>
        i === index
          ? {
              ...vol,
              achievements: vol.achievements.filter((_, j) => j !== achievementIndex)
            }
          : vol
      )
    }));
  };

  const handleVolunteerAchievementChange = (index, achievementIndex, value) => {
    setResumeData(prev => ({
      ...prev,
      volunteer: prev.volunteer.map((vol, i) =>
        i === index
          ? {
              ...vol,
              achievements: (vol.achievements || []).map((achievement, j) =>
                j === achievementIndex ? value : achievement
              )
            }
          : vol
      )
    }));
  };

  // References handlers
  const handleReferenceAdd = () => {
    setResumeData(prev => ({
      ...prev,
      references: [
        ...prev.references,
        { name: '', title: '', company: '', email: '', phone: '', achievements: [''] }
      ]
    }));
  };

  const handleReferenceRemove = (index) => {
    setResumeData(prev => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index)
    }));
  };

  const handleReferenceChange = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      references: prev.references.map((ref, i) =>
        i === index ? { ...ref, [field]: value } : ref
      )
    }));
  };

  const handleReferenceAchievementAdd = (index) => {
    setResumeData(prev => ({
      ...prev,
      references: prev.references.map((ref, i) =>
        i === index ? { ...ref, achievements: [...(ref.achievements || []), ''] } : ref
      )
    }));
  };

  const handleReferenceAchievementRemove = (index, achievementIndex) => {
    setResumeData(prev => ({
      ...prev,
      references: prev.references.map((ref, i) =>
        i === index
          ? {
              ...ref,
              achievements: ref.achievements.filter((_, j) => j !== achievementIndex)
            }
          : ref
      )
    }));
  };

  const handleReferenceAchievementChange = (index, achievementIndex, value) => {
    setResumeData(prev => ({
      ...prev,
      references: prev.references.map((ref, i) =>
        i === index
          ? {
              ...ref,
              achievements: (ref.achievements || []).map((achievement, j) =>
                j === achievementIndex ? value : achievement
              )
            }
          : ref
      )
    }));
  };

  return (
    <div className="data-input-page">
      <header className="page-header">
        <h1>CV Builder - Enter Your Information</h1>
      </header>

      <main className="form-container">
        {/* Personal Information */}
        <section className="form-section">
          <h2>Personal Information</h2>
          <div className="profile-picture-container">
            <label className="file-input-label">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="file-input"
            />
            {imgSrc && (
              <div>
                <ReactCrop
                  crop={crop}
                  onChange={c => setCrop(c)}
                  aspect={1}
                >
                  <img ref={imgRef} src={imgSrc} onLoad={handleImageLoad} alt="Crop me" />
                </ReactCrop>
                <button onClick={handleSaveCrop}>Save Image</button>
              </div>
            )}
            {resumeData.personal.profilePicture && !imgSrc && (
              <div className="image-preview-container">
                <img
                  src={resumeData.personal.profilePicture}
                  alt="Profile Preview"
                  className="profile-image-preview"
                />
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="Full Name"
            value={resumeData.personal.fullName}
            onChange={(e) => handlePersonalChange('fullName', e.target.value)}
          />
          <input
            type="text"
            placeholder="Job Title"
            value={resumeData.personal.jobTitle}
            onChange={(e) => handlePersonalChange('jobTitle', e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={resumeData.personal.email}
            onChange={(e) => handlePersonalChange('email', e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone"
            value={resumeData.personal.phone}
            onChange={(e) => handlePersonalChange('phone', e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            value={resumeData.personal.location}
            onChange={(e) => handlePersonalChange('location', e.target.value)}
          />
          <input
            type="text"
            placeholder="LinkedIn Profile"
            value={resumeData.personal.linkedIn}
            onChange={(e) => handlePersonalChange('linkedIn', e.target.value)}
          />
        </section>

        {/* Professional Summary */}
        <section className="form-section">
          <h2>Professional Summary</h2>
          <textarea
            value={resumeData.summary}
            onChange={(e) => handleSummaryChange(e.target.value)}
            placeholder="Write a brief professional summary..."
            rows={4}
          />
          <button onClick={handleGenerateSummary} disabled={isGenerating} className="btn-primary">
            {isGenerating ? '✨ Generating...' : '✨ Generate with AI'}
          </button>
        </section>

        {/* Experience */}
        <section className="form-section">
          <h2>Experience</h2>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="entry-container">
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
              />
              <input
                type="text"
                placeholder="Role"
                value={exp.role}
                onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
              />
              <input
                type="text"
                placeholder="Dates"
                value={exp.dates}
                onChange={(e) => handleExperienceChange(index, 'dates', e.target.value)}
              />
              <div className="achievements-input-container" style={{ gridColumn: 'span 2' }}>
                {exp.achievements && exp.achievements.length > 0 ? (
                  exp.achievements.map((achievement, achievementIndex) => (
                    <div key={achievementIndex} className="achievement-item">
                      <input
                        type="text"
                        placeholder="Achievement point"
                        value={achievement}
                        onChange={(e) => handleExperienceAchievementChange(index, achievementIndex, e.target.value)}
                      />
                      <button
                        onClick={() => handleExperienceAchievementRemove(index, achievementIndex)}
                        className="btn-remove-achievement"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="achievement-item">
                    <input
                      type="text"
                      placeholder="Enter your first achievement"
                      value={exp.achievements && exp.achievements[0] ? exp.achievements[0] : ""}
                      onChange={(e) => handleExperienceAchievementChange(index, 0, e.target.value)}
                    />
                  </div>
                )}
                <button
                  onClick={() => handleExperienceAchievementAdd(index)}
                  className="btn-add-achievement"
                >
                  + Add Achievement
                </button>
              </div>
              <div style={{ gridColumn: 'span 2', textAlign: 'right' }}>
                <button onClick={() => handleExperienceRemove(index)} className="btn-remove">
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button onClick={handleExperienceAdd} className="btn-primary">
            Add Experience
          </button>
        </section>

        {/* Education */}
        <section className="form-section">
          <h2>Education</h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="entry-container">
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
              />
              <input
                type="text"
                placeholder="Major"
                value={edu.major}
                onChange={(e) => handleEducationChange(index, 'major', e.target.value)}
              />
              <input
                type="text"
                placeholder="University"
                value={edu.university}
                onChange={(e) => handleEducationChange(index, 'university', e.target.value)}
              />
              <input
                type="text"
                placeholder="Year"
                value={edu.year}
                onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
              />
              <div className="achievements-input-container" style={{ gridColumn: 'span 2' }}>
                {edu.achievements && edu.achievements.length > 0 ? (
                  edu.achievements.map((achievement, achievementIndex) => (
                    <div key={achievementIndex} className="achievement-item">
                      <input
                        type="text"
                        placeholder="Achievement point"
                        value={achievement}
                        onChange={(e) => handleEducationAchievementChange(index, achievementIndex, e.target.value)}
                      />
                      <button
                        onClick={() => handleEducationAchievementRemove(index, achievementIndex)}
                        className="btn-remove-achievement"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="achievement-item">
                    <input
                      type="text"
                      placeholder="Enter your first achievement"
                      value={edu.achievements && edu.achievements[0] ? edu.achievements[0] : ""}
                      onChange={(e) => handleEducationAchievementChange(index, 0, e.target.value)}
                    />
                  </div>
                )}
                <button
                  onClick={() => handleEducationAchievementAdd(index)}
                  className="btn-add-achievement"
                >
                  + Add Achievement
                </button>
              </div>
              <div style={{ gridColumn: 'span 2', textAlign: 'right' }}>
                <button onClick={() => handleEducationRemove(index)} className="btn-remove">
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button onClick={handleEducationAdd} className="btn-primary">
            Add Education
          </button>
        </section>

        {/* Skills */}
        <section className="form-section">
          <h2>Skills & Tools</h2>
          {resumeData.skills.map((skill, index) => (
            <div key={index} className="entry-container">
              <input
                type="text"
                placeholder="Skill"
                value={skill.skill}
                onChange={(e) => handleSkillChange(index, 'skill', e.target.value)}
              />
              <input
                type="number"
                placeholder="Percentage"
                value={skill.percentage}
                onChange={(e) => handleSkillChange(index, 'percentage', e.target.value)}
              />
              <div style={{ gridColumn: 'span 2', textAlign: 'right' }}>
                <button onClick={() => handleSkillRemove(index)} className="btn-remove">
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button onClick={handleSkillAdd} className="btn-primary">
            Add Skill
          </button>
        </section>

        {/* Languages */}
        <section className="form-section">
          <h2>Languages</h2>
          <input
            type="text"
            value={resumeData.languages.join(', ')}
            onChange={(e) => setResumeData(prev => ({ ...prev, languages: e.target.value.split(',').map(lang => lang.trim()) }))}
            placeholder="Enter languages you speak separated by commas"
          />
        </section>

        {/* Projects/Research */}
        <section className="form-section">
          <h2>Projects/Research (Optional)</h2>
          {(resumeData.projects || []).map((project, index) => (
            <div key={index} className="entry-container">
              <input
                type="text"
                placeholder="Project Title"
                value={project.title}
                onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
              />
              <input
                type="text"
                placeholder="Dates (e.g., 2020-2021)"
                value={project.dates}
                onChange={(e) => handleProjectChange(index, 'dates', e.target.value)}
              />
              <div className="image-upload-container" style={{ gridColumn: 'span 2' }}>
                <label className="file-input-label">Project Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleProjectImageAdd(index, e.target.files)}
                  className="file-input"
                />
                {project.imageURL && (
                  <div className="image-preview-container">
                    <img
                      src={project.imageURL}
                      alt="Project Preview"
                      className="project-image-preview"
                    />
                  </div>
                )}
              </div>
              <div className="achievements-input-container" style={{ gridColumn: 'span 2' }}>
                {project.achievements && project.achievements.length > 0 ? (
                  project.achievements.map((achievement, achievementIndex) => (
                    <div key={achievementIndex} className="achievement-item">
                      <input
                        type="text"
                        placeholder="Achievement point"
                        value={achievement}
                        onChange={(e) => handleProjectAchievementChange(index, achievementIndex, e.target.value)}
                      />
                      <button
                        onClick={() => handleProjectAchievementRemove(index, achievementIndex)}
                        className="btn-remove-achievement"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="achievement-item">
                    <input
                      type="text"
                      placeholder="Enter your first achievement"
                      value={project.achievements && project.achievements[0] ? project.achievements[0] : ""}
                      onChange={(e) => handleProjectAchievementChange(index, 0, e.target.value)}
                    />
                  </div>
                )}
                <button
                  onClick={() => handleProjectAchievementAdd(index)}
                  className="btn-add-achievement"
                >
                  + Add Achievement
                </button>
              </div>
              <div style={{ gridColumn: 'span 2', textAlign: 'right' }}>
                <button onClick={() => handleProjectRemove(index)} className="btn-remove">
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button onClick={handleProjectAdd} className="btn-primary">
            Add Project/Research
          </button>
        </section>

        {/* Volunteer Activities */}
        <section className="form-section">
          <h2>Volunteer/Student Activities (Optional)</h2>
          {(resumeData.volunteer || []).map((volunteer, index) => (
            <div key={index} className="entry-container">
              <input
                type="text"
                placeholder="Organization Name"
                value={volunteer.organization}
                onChange={(e) => handleVolunteerChange(index, 'organization', e.target.value)}
              />
              <input
                type="text"
                placeholder="Role/Position"
                value={volunteer.role}
                onChange={(e) => handleVolunteerChange(index, 'role', e.target.value)}
              />
              <input
                type="text"
                placeholder="Dates"
                value={volunteer.dates}
                onChange={(e) => handleVolunteerChange(index, 'dates', e.target.value)}
              />
              <div className="achievements-input-container" style={{ gridColumn: 'span 2' }}>
                {volunteer.achievements && volunteer.achievements.length > 0 ? (
                  volunteer.achievements.map((achievement, achievementIndex) => (
                    <div key={achievementIndex} className="achievement-item">
                      <input
                        type="text"
                        placeholder="Achievement point"
                        value={achievement}
                        onChange={(e) => handleVolunteerAchievementChange(index, achievementIndex, e.target.value)}
                      />
                      <button
                        onClick={() => handleVolunteerAchievementRemove(index, achievementIndex)}
                        className="btn-remove-achievement"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="achievement-item">
                    <input
                      type="text"
                      placeholder="Enter your first achievement"
                      value={volunteer.achievements && volunteer.achievements[0] ? volunteer.achievements[0] : ""}
                      onChange={(e) => handleVolunteerAchievementChange(index, 0, e.target.value)}
                    />
                  </div>
                )}
                <button
                  onClick={() => handleVolunteerAchievementAdd(index)}
                  className="btn-add-achievement"
                >
                  + Add Achievement
                </button>
              </div>
              <div style={{ gridColumn: 'span 2', textAlign: 'right' }}>
                <button onClick={() => handleVolunteerRemove(index)} className="btn-remove">
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button onClick={handleVolunteerAdd} className="btn-primary">
            Add Activity
          </button>
        </section>

        {/* References */}
        <section className="form-section">
          <h2>References (Optional)</h2>
          {(resumeData.references || []).map((reference, index) => (
            <div key={index} className="entry-container">
              <input
                type="text"
                placeholder="Full Name"
                value={reference.name}
                onChange={(e) => handleReferenceChange(index, 'name', e.target.value)}
              />
              <input
                type="text"
                placeholder="Title"
                value={reference.title}
                onChange={(e) => handleReferenceChange(index, 'title', e.target.value)}
              />
              <div className="achievements-input-container" style={{ gridColumn: 'span 2' }}>
                {reference.achievements && reference.achievements.length > 0 ? (
                  reference.achievements.map((achievement, achievementIndex) => (
                    <div key={achievementIndex} className="achievement-item">
                      <input
                        type="text"
                        placeholder="Achievement point"
                        value={achievement}
                        onChange={(e) => handleReferenceAchievementChange(index, achievementIndex, e.target.value)}
                      />
                      <button
                        onClick={() => handleReferenceAchievementRemove(index, achievementIndex)}
                        className="btn-remove-achievement"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="achievement-item">
                    <input
                      type="text"
                      placeholder="Enter your first achievement"
                      value={reference.achievements && reference.achievements[0] ? reference.achievements[0] : ""}
                      onChange={(e) => handleReferenceAchievementChange(index, 0, e.target.value)}
                    />
                  </div>
                )}
                <button
                  onClick={() => handleReferenceAchievementAdd(index)}
                  className="btn-add-achievement"
                >
                  + Add Achievement
                </button>
              </div>
              <input
                type="text"
                placeholder="Company/Organization"
                value={reference.company}
                onChange={(e) => handleReferenceChange(index, 'company', e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={reference.email}
                onChange={(e) => handleReferenceChange(index, 'email', e.target.value)}
              />
              <input
                type="tel"
                placeholder="Phone"
                value={reference.phone}
                onChange={(e) => handleReferenceChange(index, 'phone', e.target.value)}
              />
              <div style={{ gridColumn: 'span 2', textAlign: 'right' }}>
                <button onClick={() => handleReferenceRemove(index)} className="btn-remove">
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button onClick={handleReferenceAdd} className="btn-primary">
            Add Reference
          </button>
        </section>

        {/* Certifications */}
        <section className="form-section">
          <h2>Certifications (Optional)</h2>
          <input
            type="text"
            value={resumeData.certifications.join(', ')}
            onChange={(e) => setResumeData(prev => ({ ...prev, certifications: e.target.value.split(',').map(cert => cert.trim()) }))}
            placeholder="Enter your certifications separated by commas"
          />
        </section>
      </main>

      <footer className="form-footer">
        <button onClick={() => navigate('/design')} className="btn-primary btn-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          <span>اختيار التصميم</span>
        </button>
      </footer>
    </div>
  );
};

export default DataInputPage;
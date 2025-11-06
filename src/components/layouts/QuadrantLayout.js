import React from 'react';
import { useResume } from '../../context/ResumeContext';
import './QuadrantLayout.css';
import { FaEnvelope, FaPhone, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';

const QuadrantLayout = () => {
    const { resumeData } = useResume();
    
    const personalInfo = resumeData.personal || {};
    const professionalSummary = resumeData.summary || '';
    const experience = resumeData.experience || [];
    const education = resumeData.education || [];
    const skills = resumeData.skills || [];
    const languages = resumeData.languages || [];
    const certifications = resumeData.certifications || [];
    const projects = resumeData.projects || [];
    const volunteering = resumeData.volunteer || [];
    const references = resumeData.references || [];

    const hasContactInfo = personalInfo.email || personalInfo.phone || personalInfo.linkedin || personalInfo.location;
    const hasProfessionalSummary = professionalSummary.length > 0;
    const hasExperience = experience.length > 0;
    const hasEducation = education.length > 0;
    const hasSkills = skills.length > 0;
    const hasLanguages = languages.length > 0;
    const hasCertifications = certifications.length > 0;
    const hasProjects = projects.length > 0;
    const hasVolunteering = volunteering.length > 0;
    const hasReferences = references.length > 0;

    return (
        <div className="quadrant-grid-container">
            {/* Full-width Header */}
            <div className="quadrant-cell quadrant-full-header">
                <div className="quadrant-header-left">
                    {personalInfo.fullName && <h1 className="quadrant-name">{personalInfo.fullName.toUpperCase()}</h1>}
                    {personalInfo.jobTitle && <h2 className="quadrant-job-title">{personalInfo.jobTitle.toUpperCase()}</h2>}
                </div>
                {personalInfo.profilePicture && (
                    <div className="quadrant-profile-picture-container">
                        <img src={personalInfo.profilePicture} alt="Profile" className="quadrant-profile-picture" />
                    </div>
                )}
            </div>

            {/* Bottom-Left Quadrant */}
            <div className="quadrant-cell bottom-left">
                {hasContactInfo && (
                    <div className="quadrant-section">
                        <h3 className="quadrant-section-title">CONTACT</h3>
                        <div className="quadrant-contact-info">
                            {personalInfo.email && <div><FaEnvelope className="quadrant-icon" /> {personalInfo.email}</div>}
                            {personalInfo.phone && <div><FaPhone className="quadrant-icon" /> {personalInfo.phone}</div>}
                            {personalInfo.LinkedIn && <div><FaLinkedin className="quadrant-icon" /> {personalInfo.LinkedIn}</div>}
                            {personalInfo.location && <div><FaMapMarkerAlt className="quadrant-icon" /> {personalInfo.location}</div>}
                        </div>
                    </div>
                )}
                {hasSkills && (
                    <div className="quadrant-section">
                        <h3 className="quadrant-section-title">SKILLS</h3>
                        <ul className="quadrant-list">
                            {skills.map((skill, index) => skill.skill && <li key={index}>{skill.skill}</li>)}
                        </ul>
                    </div>
                )}
                {hasEducation && (
                    <div className="quadrant-section">
                        <h3 className="quadrant-section-title">EDUCATION</h3>
                        {education.map((edu, index) => (
                            <div key={index} className="quadrant-item">
                                <p><strong>{edu.degree}</strong>, {edu.university}</p>
                                <p>{edu.year}</p>
                            </div>
                        ))}
                    </div>
                )}
                {hasLanguages && (
                    <div className="quadrant-section">
                        <h3 className="quadrant-section-title">LANGUAGES</h3>
                        <ul className="quadrant-list">
                            {languages.map((lang, index) => <li key={index}>{lang}</li>)}
                        </ul>
                    </div>
                )}
                {hasCertifications && (
                    <div className="quadrant-section">
                        <h3 className="quadrant-section-title">CERTIFICATIONS</h3>
                        <ul className="quadrant-list">
                            {certifications.map((cert, index) => <li key={index}>{cert}</li>)}
                        </ul>
                    </div>
                )}
            </div>

            {/* Bottom-Right Quadrant */}
            <div className="quadrant-cell bottom-right">
                {hasProfessionalSummary && (
                    <div className="quadrant-section">
                        <h3 className="quadrant-section-title">PROFILE</h3>
                        <p>{professionalSummary}</p>
                    </div>
                )}
                {hasExperience && (
                    <div className="quadrant-section">
                        <h3 className="quadrant-section-title">EXPERIENCE</h3>
                        {experience.map((exp, index) => (
                            <div key={index} className="quadrant-item">
                                <p><strong>{exp.role}</strong> at {exp.company}</p>
                                <p>{exp.dates}</p>
                                <ul className="quadrant-list">
                                    {exp.achievements && exp.achievements.map((ach, achIndex) => ach && <li key={achIndex}>{ach}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
                {hasProjects && (
                    <div className="quadrant-section">
                        <h3 className="quadrant-section-title">PROJECTS/RESEARCH</h3>
                        {projects.map((proj, index) => (
                            <div key={index} className="quadrant-item">
                                <p><strong>{proj.title}</strong></p>
                                <p>{proj.dates}</p>
                                <ul className="quadrant-list">
                                    {proj.achievements && proj.achievements.map((ach, achIndex) => ach && <li key={achIndex}>{ach}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
                {hasVolunteering && (
                    <div className="quadrant-section">
                        <h3 className="quadrant-section-title">VOLUNTEER/STUDENT ACTIVITIES</h3>
                        {volunteering.map((vol, index) => (
                            <div key={index} className="quadrant-item">
                                <p><strong>{vol.role}</strong> at {vol.organization}</p>
                                <p>{vol.dates}</p>
                                <ul className="quadrant-list">
                                    {vol.achievements && vol.achievements.map((ach, achIndex) => ach && <li key={achIndex}>{ach}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
                {hasReferences && (
                    <div className="quadrant-section">
                        <h3 className="quadrant-section-title">REFERENCES</h3>
                        {references.map((ref, index) => (
                            <div key={index} className="quadrant-item">
                                <p><strong>{ref.name}</strong>, {ref.title}</p>
                                <p>{ref.company} | {ref.email} | {ref.phone}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuadrantLayout;

import React from 'react';
import { useResume } from '../../context/ResumeContext';
import './QuadrantPurpleLayout.css';

const QuadrantPurpleLayout = () => {
    const { resumeData } = useResume();
    // Corrected destructuring with aliases
    const { personal: personalInfo, summary: professionalSummary, experience, education, skills, languages, projects, volunteer: volunteering, certifications, references } = resumeData;

    // Helper functions to check if a section has meaningful data
    const hasPersonalInfo = personalInfo && (personalInfo.fullName || personalInfo.jobTitle);
    const hasContactInfo = personalInfo && (personalInfo.email || personalInfo.phone || personalInfo.linkedIn);
    const hasSkills = skills && skills.some(s => s.skill);
    const hasLanguages = languages && languages.some(l => l);
    const hasProfessionalSummary = professionalSummary && professionalSummary.trim() !== '';
    const hasExperience = experience && experience.some(e => e.role || e.company || (e.achievements && e.achievements.some(a => a)));
    const hasEducation = education && education.some(e => e.university || e.degree || (e.achievements && e.achievements.some(a => a)));
    const hasProjects = projects && projects.some(p => p.title || (p.achievements && p.achievements.some(a => a)));
    const hasVolunteering = volunteering && volunteering.some(v => v.organization || v.role || (v.achievements && v.achievements.some(a => a)));
    const hasCertifications = certifications && certifications.length > 0;
    const hasReferences = references && references.some(r => r.name);

    return (
        <div className="quadrant-purple-container">
            {/* Top-Left Quadrant */}
            <div className="quadrant-top-left">
                <div className="hexagon-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                </div>
                {hasPersonalInfo && (
                    <div className="quadrant-section">
                        <h1>{personalInfo.fullName}</h1>
                        <h2>{personalInfo.jobTitle}</h2>
                    </div>
                )}
                {hasContactInfo && (
                     <div className="quadrant-section contact-info">
                        {personalInfo.email && <p>{personalInfo.email}</p>}
                        {personalInfo.phone && <p>{personalInfo.phone}</p>}
                        {personalInfo.linkedIn && <p><a href={personalInfo.linkedIn}>{personalInfo.linkedIn}</a></p>}
                        {personalInfo.location && <p>{personalInfo.location}</p>}
                    </div>
                )}
            </div>

            {/* Top-Right Quadrant */}
            <div className="quadrant-top-right">
                {hasProfessionalSummary && (
                    <div className="quadrant-section">
                        <h3>PROFESSIONAL SUMMARY</h3>
                        <p>{professionalSummary}</p>
                    </div>
                )}
            </div>

            {/* Bottom-Left Quadrant */}
            <div className="quadrant-bottom-left">
                {hasEducation && (
                    <div className="quadrant-section">
                        <h3>EDUCATION</h3>
                        {education.map((edu, index) => (
                            <div key={index}>
                                <h4>{edu.degree} {edu.major && `in ${edu.major}`}</h4>
                                <p>{edu.university} | {edu.year}</p>
                                {edu.achievements && <ul>{edu.achievements.map((ach, i) => ach && <li key={i}>{ach}</li>)}</ul>}
                            </div>
                        ))}
                    </div>
                )}
                {hasSkills && (
                    <div className="quadrant-section">
                        <h3>SKILLS</h3>
                        <ul>
                            {skills.map((skillObj, index) => (
                                <li key={index}>{skillObj.skill}</li>
                            ))}
                        </ul>
                    </div>
                )}
                 {hasLanguages && (
                    <div className="quadrant-section">
                        <h3>LANGUAGES</h3>
                        <ul>
                            {languages.map((lang, index) => (
                                <li key={index}>{lang}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Bottom-Right Quadrant */}
            <div className="quadrant-bottom-right">
                {hasExperience && (
                    <div className="quadrant-section">
                        <h3>EXPERIENCE</h3>
                        {experience.map((exp, index) => (
                            <div key={index}>
                                <h4>{exp.role}</h4>
                                <p><strong>{exp.company}</strong> | {exp.dates}</p>
                                {exp.achievements && <ul>{exp.achievements.map((ach, i) => ach && <li key={i}>{ach}</li>)}</ul>}
                            </div>
                        ))}
                    </div>
                )}
                {hasProjects && (
                    <div className="quadrant-section">
                        <h3>PROJECTS</h3>
                        {projects.map((proj, index) => (
                            <div key={index}>
                                <h4>{proj.title}</h4>
                                <p>{proj.dates}</p>
                                {proj.achievements && <ul>{proj.achievements.map((ach, i) => ach && <li key={i}>{ach}</li>)}</ul>}
                            </div>
                        ))}
                    </div>
                )}
                {hasVolunteering && (
                    <div className="quadrant-section">
                        <h3>VOLUNTEERING</h3>
                        {volunteering.map((vol, index) => (
                            <div key={index}>
                                <h4>{vol.role} at {vol.organization}</h4>
                                <p>{vol.dates}</p>
                                {vol.achievements && <ul>{vol.achievements.map((ach, i) => ach && <li key={i}>{ach}</li>)}</ul>}
                            </div>
                        ))}
                    </div>
                )}
                {hasCertifications && (
                    <div className="quadrant-section">
                        <h3>CERTIFICATIONS</h3>
                        <ul>
                            {certifications.map((cert, index) => (
                                <li key={index}>{cert}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {hasReferences && (
                    <div className="quadrant-section">
                        <h3>REFERENCES</h3>
                        {references.map((ref, index) => (
                            <div key={index}>
                                <p>{ref.name} - {ref.contact}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuadrantPurpleLayout;

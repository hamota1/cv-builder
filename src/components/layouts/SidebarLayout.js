
import React from 'react';
import { useResume } from '../../context/ResumeContext';
import './SidebarLayout.css';

const SidebarLayout = () => {
    const { resumeData } = useResume();
    // Corrected destructuring with aliases to match the actual data object keys
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
        <div className="sidebar-layout-container">
            <div className="sidebar">
                {hasPersonalInfo && (
                    <div className="sidebar-section text-center">
                        {personalInfo.profilePicture && <img src={personalInfo.profilePicture} alt="Profile" className="profile-picture" />}
                        <h1>{personalInfo.fullName}</h1>
                        <h2>{personalInfo.jobTitle}</h2>
                    </div>
                )}

                {hasContactInfo && (
                    <div className="sidebar-section">
                        <h3>Contact</h3>
                        {personalInfo.email && <p>{personalInfo.email}</p>}
                        {personalInfo.phone && <p>{personalInfo.phone}</p>}
                        {personalInfo.linkedIn && <p><a href={personalInfo.linkedIn}>{personalInfo.linkedIn}</a></p>}
                        {personalInfo.location && <p>{personalInfo.location}</p>}
                    </div>
                )}

                {hasSkills && (
                    <div className="sidebar-section">
                        <h3>Skills</h3>
                        <ul>
                            {skills.map((skillObj, index) => (
                                <li key={index}>{skillObj.skill}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {hasLanguages && (
                    <div className="sidebar-section">
                        <h3>Languages</h3>
                        <ul>
                            {languages.map((lang, index) => (
                                <li key={index}>{lang}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="main-content">
                {hasProfessionalSummary && (
                    <div className="main-content-section">
                        <h3>Professional Summary</h3>
                        <p>{professionalSummary}</p>
                    </div>
                )}

                {hasExperience && (
                    <div className="main-content-section">
                        <h3>Experience</h3>
                        {experience.map((exp, index) => (
                            <div key={index} className="job">
                                <h4>{exp.role}</h4>
                                <p><strong>{exp.company}</strong> | {exp.dates}</p>
                                {exp.achievements && <ul>{exp.achievements.map((ach, i) => ach && <li key={i}>{ach}</li>)}</ul>}
                            </div>
                        ))}
                    </div>
                )}

                {hasEducation && (
                    <div className="main-content-section">
                        <h3>Education</h3>
                        {education.map((edu, index) => (
                            <div key={index} className="education-item">
                                <h4>{edu.degree} {edu.major && `in ${edu.major}`}</h4>
                                <p>{edu.university} | {edu.year}</p>
                                {edu.achievements && <ul>{edu.achievements.map((ach, i) => ach && <li key={i}>{ach}</li>)}</ul>}
                            </div>
                        ))}
                    </div>
                )}

                {hasProjects && (
                    <div className="main-content-section">
                        <h3>Projects/Research</h3>
                        {projects.map((proj, index) => (
                            <div key={index} className="project-item">
                                <h4>{proj.title}</h4>
                                <p>{proj.dates}</p>
                                {proj.achievements && <ul>{proj.achievements.map((ach, i) => ach && <li key={i}>{ach}</li>)}</ul>}
                            </div>
                        ))}
                    </div>
                )}

                {hasVolunteering && (
                    <div className="main-content-section">
                        <h3>Volunteering</h3>
                        {volunteering.map((vol, index) => (
                            <div key={index} className="volunteer-item">
                                <h4>{vol.role}</h4>
                                <p><strong>{vol.organization}</strong> | {vol.dates}</p>
                                {vol.achievements && <ul>{vol.achievements.map((ach, i) => ach && <li key={i}>{ach}</li>)}</ul>}
                            </div>
                        ))}
                    </div>
                )}

                {hasCertifications && (
                    <div className="main-content-section">
                        <h3>Certifications</h3>
                        <ul>
                            {certifications.map((cert, index) => (
                                <li key={index}>{cert}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {hasReferences && (
                    <div className="main-content-section">
                        <h3>References</h3>
                        {references.map((ref, index) => (
                            <div key={index} className="reference-item">
                                <h4>{ref.name}</h4>
                                <p>{ref.contact}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SidebarLayout;

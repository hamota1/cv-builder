
import React from 'react';
import { useResume } from '../../context/ResumeContext';
import './TealSidebarLayout.css';
import { FaEnvelope, FaPhone, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';

const TealSidebarLayout = () => {
    const { resumeData } = useResume();
    const {
        personal: personalInfo,
        summary: professionalSummary,
        experience,
        education,
        skills,
        languages,
        projects,
        volunteer: volunteering,
        certifications,
        references
    } = resumeData || {};

    const pInfo = personalInfo || {};

    // Define all sections and their content
    const sections = [
        { id: 'summary', title: 'SUMMARY', content: professionalSummary, hasData: professionalSummary && professionalSummary.trim() !== '' },
        { id: 'skills', title: 'CORE COMPETENCIES', content: skills, hasData: skills && skills.some(s => s.skill) },
        { id: 'languages', title: 'LANGUAGES', content: languages, hasData: languages && languages.length > 0 },
        { id: 'certifications', title: 'CERTIFICATIONS', content: certifications, hasData: certifications && certifications.length > 0 },
        { id: 'experience', title: 'WORK EXPERIENCE', content: experience, hasData: experience && experience.length > 0 },
        { id: 'education', title: 'EDUCATION', content: education, hasData: education && education.length > 0 },
        { id: 'projects', title: 'PORTFOLIO / PROJECTS', content: projects, hasData: projects && projects.length > 0 },
        { id: 'volunteering', title: 'VOLUNTEER/STUDENT ACTIVITIES', content: volunteering, hasData: volunteering && volunteering.length > 0 },
        { id: 'references', title: 'REFERENCES', content: references, hasData: references && references.length > 0 },
    ];

    // Filter out sections that have no data
    const filledSections = sections.filter(sec => sec.hasData);

    return (
        <div className="tsl-container">
            <div className="tsl-left-sidebar">
                {pInfo.profilePicture && (
                    <div className="tsl-profile-picture-container">
                        <img src={pInfo.profilePicture} alt="Profile" className="tsl-profile-picture" />
                    </div>
                )}

                {/* Sidebar sections */}
                {filledSections.map((section) => (
                    (section.id === 'summary' || section.id === 'skills' || section.id === 'languages' || section.id === 'certifications') && section.hasData && (
                        <section key={section.id} className="tsl-section">
                            <h3>{section.title}</h3>
                            {section.id === 'summary' && <p>{section.content}</p>}
                            {section.id === 'skills' && (
                                <ul className="tsl-simple-list">
                                    {section.content.map((s, i) => s.skill && <li key={i}>{s.skill}</li>)}
                                </ul>
                            )}
                            {section.id === 'languages' && (
                                <ul className="tsl-simple-list">
                                    {section.content.map((l, i) => l && <li key={i}>{l}</li>)}
                                </ul>
                            )}
                            {section.id === 'certifications' && (
                                <ul className="tsl-simple-list">
                                    {section.content.map((c, i) => c && <li key={i}>{c}</li>)}</ul>
                            )}
                        </section>
                    )
                ))}
            </div>

            <div className="tsl-right-main-content">
                <div className="tsl-main-header">
                    <h1>{pInfo.fullName}</h1>
                    <h2>{pInfo.jobTitle}</h2>
                    <div className="tsl-contact-info">
                        {pInfo.email && <p><FaEnvelope className="tsl-icon" /> {pInfo.email}</p>}
                        {pInfo.phone && <p><FaPhone className="tsl-icon" /> {pInfo.phone}</p>}
                        {pInfo.LinkedIn && <p><FaLinkedin className="tsl-icon" /> {pInfo.LinkedIn}</p>}
                        {pInfo.location && <p><FaMapMarkerAlt className="tsl-icon" /> {pInfo.location}</p>}
                    </div>
                </div>

                {/* Main content sections */}
                {filledSections.map((section) => (
                    (section.id === 'experience' || section.id === 'education' || section.id === 'projects' || section.id === 'volunteering' || section.id === 'references') && section.hasData && (
                        <section key={section.id} className="tsl-section">
                            <h3>{section.title}</h3>
                            {section.id === 'experience' && (
                                <ul>
                                    {section.content.map((exp, i) => (
                                        <li key={i} className="tsl-item">
                                            <h4>{exp.role}</h4>
                                            <p><strong>{exp.company}</strong> | {exp.dates}</p>
                                            {exp.achievements && exp.achievements.length > 0 && (
                                                <ul className="tsl-achievements-list">{exp.achievements.map((a, idx) => a && <li key={idx}>{a}</li>)}</ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {section.id === 'education' && (
                                <ul>
                                    {section.content.map((edu, i) => (
                                        <li key={i} className="tsl-item">
                                            <h4>{edu.degree}{edu.major && `, ${edu.major}`}</h4>
                                            <p><strong>{edu.university}</strong> | {edu.year}</p>
                                            {edu.achievements && edu.achievements.length > 0 && (
                                                <ul className="tsl-achievements-list">{edu.achievements.map((a, idx) => a && <li key={idx}>{a}</li>)}</ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {section.id === 'projects' && (
                                <ul>
                                    {section.content.map((p, i) => (
                                        <li key={i} className="tsl-item">
                                            <h4>{p.title}</h4>
                                            <p>{p.dates}</p>
                                            {p.description && <p>{p.description}</p>}
                                            {p.achievements && p.achievements.length > 0 && (
                                                <ul className="tsl-achievements-list">{p.achievements.map((a, idx) => a && <li key={idx}>{a}</li>)}</ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {section.id === 'volunteering' && (
                                <ul>
                                    {section.content.map((v, i) => (
                                        <li key={i} className="tsl-item">
                                            <h4>{v.role}</h4>
                                            <p><strong>{v.organization}</strong> | {v.dates}</p>
                                            {v.description && <p>{v.description}</p>}
                                            {v.achievements && v.achievements.length > 0 && (
                                                <ul className="tsl-achievements-list">{v.achievements.map((a, idx) => a && <li key={idx}>{a}</li>)}</ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {section.id === 'references' && (
                                <ul>
                                    {section.content.map((r, i) => (
                                        <li key={i} className="tsl-item">
                                            <p><strong>{r.name}</strong>, {r.title} at {r.company}</p>
                                            <p>{r.email} | {r.phone}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    )
                ))}
            </div>
        </div>
    );
};

export default TealSidebarLayout;

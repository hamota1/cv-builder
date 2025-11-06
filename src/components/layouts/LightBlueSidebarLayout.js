import React from 'react';
import { useResume } from '../../context/ResumeContext';
import './LightBlueSidebarLayout.css';
import { FaEnvelope, FaPhone, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';

const LightBlueSidebarLayout = () => {
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
        { id: 'summary', title: 'PROFILE', content: professionalSummary, hasData: professionalSummary && professionalSummary.trim() !== '' },
        { id: 'skills', title: 'SKILLS', content: skills, hasData: skills && skills.some(s => s.skill) },
        { id: 'languages', title: 'LANGUAGES', content: languages, hasData: languages && languages.length > 0 },
        { id: 'experience', title: 'EXPERIENCE', content: experience, hasData: experience && experience.length > 0 },
        { id: 'education', title: 'EDUCATION', content: education, hasData: education && education.length > 0 },
        { id: 'projects', title: 'PROJECTS/RESEARCH', content: projects, hasData: projects && projects.length > 0 },
        { id: 'volunteering', title: 'VOLUNTEER/STUDENT ACTIVITIES', content: volunteering, hasData: volunteering && volunteering.length > 0 },
        { id: 'certifications', title: 'CERTIFICATIONS', content: certifications, hasData: certifications && certifications.length > 0 },
        { id: 'references', title: 'REFERENCES', content: references, hasData: references && references.length > 0 },
    ];

    // Filter out sections that have no data
    const filledSections = sections.filter(sec => sec.hasData);

    return (
        <div className="lbl-container">
            <div className="lbl-left-sidebar">
                {pInfo.profilePicture && (
                    <div className="lbl-profile-picture-container">
                        <img src={pInfo.profilePicture} alt="Profile" className="lbl-profile-picture" />
                    </div>
                )}
                <div className="lbl-personal-header">
                    <h1>{pInfo.fullName}</h1>
                    <h2>{pInfo.jobTitle}</h2>
                </div>

                {/* Contact Info */}
                {(pInfo.email || pInfo.phone || pInfo.LinkedIn) && (
                    <section className="lbl-section">
                        <h3>CONTACT</h3>
                        <div className="lbl-contact-info">
                            {pInfo.email && <p><FaEnvelope className="lbl-icon" /> {pInfo.email}</p>}
                            {pInfo.phone && <p><FaPhone className="lbl-icon" /> {pInfo.phone}</p>}
                            {pInfo.LinkedIn && <p><FaLinkedin className="lbl-icon" /> {pInfo.LinkedIn}</p>}
                            {pInfo.location && <p><FaMapMarkerAlt className="lbl-icon" /> {pInfo.location}</p>}
                        </div>
                    </section>
                )}

                {/* Profile Summary, Skills, Languages, Certifications in Sidebar */}
                {filledSections.map((section) => (
                    (section.id === 'summary' || section.id === 'skills' || section.id === 'languages') && section.hasData && (
                        <section key={section.id} className="lbl-section">
                            <h3>{section.title}</h3>
                            {section.id === 'summary' && <p>{section.content}</p>}
                            {section.id === 'skills' && (
                                <ul className="lbl-skills-list">
                                    {section.content.map((s, i) => s.skill && <li key={i}>{s.skill}</li>)}
                                </ul>
                            )}
                            {section.id === 'languages' && (
                                <ul className="lbl-simple-list">
                                    {section.content.map((l, i) => l && <li key={i}>{l}</li>)}</ul>
                            )}
                        </section>
                    )
                ))}
            </div>

            <div className="lbl-right-main-content">
                {/* Experience, Education, Projects, Volunteering, Certifications, References in Main Content */}
                {filledSections.map((section) => (
                    (section.id === 'experience' || section.id === 'education' || section.id === 'projects' || section.id === 'volunteering' || section.id === 'certifications' || section.id === 'references') && section.hasData && (
                        <section key={section.id} className="lbl-section">
                            <h3>{section.title}</h3>
                            {section.id === 'experience' && (
                                <ul>
                                    {section.content.map((exp, i) => (
                                        <li key={i} className="lbl-item">
                                            <h4>{exp.role}</h4>
                                            <p><strong>{exp.company}</strong> | {exp.dates}</p>
                                            {exp.achievements && exp.achievements.length > 0 && (
                                                <ul className="lbl-achievements-list">{exp.achievements.map((a, idx) => a && <li key={idx}>{a}</li>)}</ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {section.id === 'education' && (
                                <ul>
                                    {section.content.map((edu, i) => (
                                        <li key={i} className="lbl-item">
                                            <h4>{edu.degree}{edu.major && `, ${edu.major}`}</h4>
                                            <p><strong>{edu.university}</strong> | {edu.year}</p>
                                            {edu.achievements && edu.achievements.length > 0 && (
                                                <ul className="lbl-achievements-list">{edu.achievements.map((a, idx) => a && <li key={idx}>{a}</li>)}</ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {section.id === 'projects' && (
                                <ul>
                                    {section.content.map((p, i) => (
                                        <li key={i} className="lbl-item">
                                            <h4>{p.title}</h4>
                                            <p>{p.dates}</p>
                                            {p.description && <p>{p.description}</p>}
                                            {p.achievements && p.achievements.length > 0 && (
                                                <ul className="lbl-achievements-list">{p.achievements.map((a, idx) => a && <li key={idx}>{a}</li>)}</ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {section.id === 'volunteering' && (
                                <ul>
                                    {section.content.map((v, i) => (
                                        <li key={i} className="lbl-item">
                                            <h4>{v.role}</h4>
                                            <p><strong>{v.organization}</strong> | {v.dates}</p>
                                            {v.description && <p>{v.description}</p>}
                                            {v.achievements && v.achievements.length > 0 && (
                                                <ul className="lbl-achievements-list">{v.achievements.map((a, idx) => a && <li key={idx}>{a}</li>)}</ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {section.id === 'certifications' && (
                                <ul className="lbl-simple-list">
                                    {section.content.map((c, i) => c && <li key={i}>{c}</li>)}</ul>
                            )}
                            {section.id === 'references' && (
                                <ul>
                                    {section.content.map((r, i) => (
                                        <li key={i} className="lbl-item">
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

export default LightBlueSidebarLayout;
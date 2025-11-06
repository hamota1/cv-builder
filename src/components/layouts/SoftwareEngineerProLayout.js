
import React from 'react';
import { useResume } from '../../context/ResumeContext';
import './SoftwareEngineerProLayout.css';
import { FaEnvelope, FaPhone, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';

const SoftwareEngineerProLayout = () => {
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
        { id: 'contact', title: 'CONTACT', content: pInfo, hasData: pInfo.email || pInfo.phone || pInfo.LinkedIn },
        { id: 'education', title: 'EDUCATION', content: education, hasData: education && education.length > 0 },
        { id: 'skills', title: 'SKILLS', content: skills, hasData: skills && skills.some(s => s.skill) },
        { id: 'languages', title: 'LANGUAGES', content: languages, hasData: languages && languages.length > 0 },
        { id: 'certifications', title: 'CERTIFICATIONS', content: certifications, hasData: certifications && certifications.length > 0 },
        { id: 'profile', title: 'PROFILE', content: professionalSummary, hasData: professionalSummary && professionalSummary.trim() !== '' },
        { id: 'experience', title: 'WORK EXPERIENCE', content: experience, hasData: experience && experience.length > 0 },
        { id: 'projects', title: 'PROJECTS/RESEARCH', content: projects, hasData: projects && projects.length > 0 },
        { id: 'volunteering', title: 'VOLUNTEER/STUDENT ACTIVITIES', content: volunteering, hasData: volunteering && volunteering.length > 0 },
        { id: 'references', title: 'REFERENCES', content: references, hasData: references && references.length > 0 },
    ];

    // Filter out sections that have no data
    const filledSections = sections.filter(sec => sec.hasData);

    return (
        <div className="sep-container">
            <div className="sep-left-sidebar">
                {pInfo.profilePicture && (
                    <div className="sep-profile-picture-container">
                        <img src={pInfo.profilePicture} alt="Profile" className="sep-profile-picture" />
                    </div>
                )}
                <div className="sep-personal-header">
                    <h1>{pInfo.fullName}</h1>
                    <h2>{pInfo.jobTitle}</h2>
                </div>

                {/* Contact Info, Education, Skills, Languages, Certifications in Sidebar */}
                {filledSections.map((section) => (
                    (section.id === 'contact' || section.id === 'education' || section.id === 'skills' || section.id === 'languages' || section.id === 'certifications') && section.hasData && (
                        <section key={section.id} className="sep-section">
                            <h3>{section.title}</h3>
                            {section.id === 'contact' && (
                                <div className="sep-contact-info">
                                    {pInfo.email && <p><FaEnvelope className="sep-icon" /> {pInfo.email}</p>}
                                    {pInfo.phone && <p><FaPhone className="sep-icon" /> {pInfo.phone}</p>}
                                    {pInfo.LinkedIn && <p><FaLinkedin className="sep-icon" /> {pInfo.LinkedIn}</p>}
                                    {pInfo.location && <p><FaMapMarkerAlt className="sep-icon" /> {pInfo.location}</p>}
                                </div>
                            )}
                            {section.id === 'education' && (
                                <ul>
                                    {section.content.map((edu, i) => (
                                        <li key={i} className="sep-item">
                                            <h4>{edu.degree}{edu.major && `, ${edu.major}`}</h4>
                                            <p><strong>{edu.university}</strong> | {edu.year}</p>
                                            {edu.achievements && edu.achievements.length > 0 && (
                                                <ul className="sep-achievements-list">{edu.achievements.map((a, idx) => a && <li key={idx}>{a}</li>)}</ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {section.id === 'skills' && (
                                <ul className="sep-skills-list">
                                    {section.content.map((s, i) => s.skill && <li key={i}>{s.skill}</li>)}
                                </ul>
                            )}
                            {section.id === 'languages' && (
                                <ul className="sep-simple-list">
                                    {section.content.map((l, i) => l && <li key={i}>{l}</li>)}</ul>
                            )}
                            {section.id === 'certifications' && (
                                <ul className="sep-simple-list">
                                    {section.content.map((c, i) => c && <li key={i}>{c}</li>)}</ul>
                            )}
                        </section>
                    )
                ))}
            </div>

            <div className="sep-right-main-content">
                {/* Profile, Experience, Projects, Volunteering, References in Main Content */}
                {filledSections.map((section) => (
                    (section.id === 'profile' || section.id === 'experience' || section.id === 'projects' || section.id === 'volunteering' || section.id === 'references') && section.hasData && (
                        <section key={section.id} className="sep-section">
                            <h3>{section.title}</h3>
                            {section.id === 'profile' && <p>{section.content}</p>}
                            {section.id === 'experience' && (
                                <ul>
                                    {section.content.map((exp, i) => (
                                        <li key={i} className="sep-item">
                                            <h4>{exp.role}</h4>
                                            <p><strong>{exp.company}</strong> | {exp.dates}</p>
                                            {exp.achievements && exp.achievements.length > 0 && (
                                                <ul className="sep-achievements-list">{exp.achievements.map((a, idx) => a && <li key={idx}>{a}</li>)}</ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {section.id === 'projects' && (
                                <ul>
                                    {section.content.map((p, i) => (
                                        <li key={i} className="sep-item">
                                            <h4>{p.title}</h4>
                                            <p>{p.dates}</p>
                                            {p.description && <p>{p.description}</p>}
                                            {p.achievements && p.achievements.length > 0 && (
                                                <ul className="sep-achievements-list">{p.achievements.map((a, idx) => a && <li key={idx}>{a}</li>)}</ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {section.id === 'volunteering' && (
                                <ul>
                                    {section.content.map((v, i) => (
                                        <li key={i} className="sep-item">
                                            <h4>{v.role}</h4>
                                            <p><strong>{v.organization}</strong> | {v.dates}</p>
                                            {v.description && <p>{v.description}</p>}
                                            {v.achievements && v.achievements.length > 0 && (
                                                <ul className="sep-achievements-list">{v.achievements.map((a, idx) => a && <li key={idx}>{a}</li>)}</ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {section.id === 'references' && (
                                <ul>
                                    {section.content.map((r, i) => (
                                        <li key={i} className="sep-item">
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

export default SoftwareEngineerProLayout;

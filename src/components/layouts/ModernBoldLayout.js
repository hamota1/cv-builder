
import React from 'react';
import { useResume } from '../../context/ResumeContext';
import './ModernBoldLayout.css';


const ModernBoldLayout = () => {
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
        { id: 'profile', title: 'PROFILE', content: professionalSummary, hasData: professionalSummary && professionalSummary.trim() !== '' },
        { id: 'experience', title: 'WORK EXPERIENCE', content: experience, hasData: experience && experience.length > 0 },
        { id: 'education', title: 'EDUCATION', content: education, hasData: education && education.length > 0 },
        { id: 'skills', title: 'SKILLS', content: skills, hasData: skills && skills.some(s => s.skill) },
        { id: 'projects', title: 'PROJECTS/RESEARCH', content: projects, hasData: projects && projects.length > 0 },
        { id: 'volunteering', title: 'VOLUNTEER/STUDENT ACTIVITIES', content: volunteering, hasData: volunteering && volunteering.length > 0 },
        { id: 'languages', title: 'LANGUAGES', content: languages, hasData: languages && languages.length > 0 },
        { id: 'certifications', title: 'CERTIFICATIONS', content: certifications, hasData: certifications && certifications.length > 0 },
        { id: 'references', title: 'REFERENCES', content: references, hasData: references && references.length > 0 },
    ];

    // Filter out sections that have no data
    const filledSections = sections.filter(sec => sec.hasData);

    return (
        <div className="mbl-container">
            <header className="mbl-header">
                {pInfo.fullName && <h1 className="mbl-name">{pInfo.fullName.toUpperCase()}</h1>}
                {pInfo.jobTitle && <h2 className="mbl-job-title">{pInfo.jobTitle}</h2>}
                <div className="mbl-contact-info">
                    {pInfo.email && <p>{pInfo.email}</p>}
                    {pInfo.phone && <p>{pInfo.phone}</p>}
                    {pInfo.location && <p>{pInfo.location}</p>}
                    {pInfo.LinkedIn && <p>{pInfo.LinkedIn}</p>}
                </div>
            </header>

            <main className="mbl-content-area">
                {filledSections.map((section, index) => (
                    <React.Fragment key={section.id}>
                        <section className="mbl-section">
                            <h3>{section.title}</h3>
                            {section.id === 'profile' && <p>{section.content}</p>}
                            {section.id === 'experience' && (
                                <ul>
                                    {section.content.map((exp, i) => (
                                        <li key={i} className="mbl-experience-item">
                                            <div className="mbl-experience-dates">{exp.dates}</div>
                                            <div className="mbl-experience-details">
                                                <h4>{exp.role}</h4>
                                                <p><strong>{exp.company}</strong></p>
                                                {exp.achievements && exp.achievements.length > 0 && (
                                                    <ul className="mbl-achievements-list">{exp.achievements.map((a, idx) => a && <li key={idx}>{a}</li>)}</ul>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {section.id === 'education' && (
                                <ul>
                                    {section.content.map((edu, i) => (
                                        <li key={i} className="mbl-item">
                                            <h4>{edu.degree}{edu.major && `, ${edu.major}`}</h4>
                                            <p><strong>{edu.university}</strong> | {edu.year}</p>
                                            {edu.achievements && edu.achievements.length > 0 && (
                                                <ul className="mbl-achievements-list">{edu.achievements.map((a, idx) => a && <li key={idx}>{a}</li>)}</ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {section.id === 'skills' && (
                                <ul className="mbl-skills-grid">
                                    {section.content.map((s, i) => s.skill && <li key={i}>{s.skill}</li>)}
                                </ul>
                            )}
                            {section.id === 'projects' && (
                                <ul>
                                    {section.content.map((p, i) => (
                                        <li key={i} className="mbl-item">
                                            <h4>{p.title}</h4>
                                            <p>{p.dates}</p>
                                            {p.description && <p>{p.description}</p>}
                                            {p.achievements && p.achievements.length > 0 && (
                                                <ul className="mbl-achievements-list">{p.achievements.map((a, idx) => a && <li key={idx}>{a}</li>)}</ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {section.id === 'volunteering' && (
                                <ul>
                                    {section.content.map((v, i) => (
                                        <li key={i} className="mbl-item">
                                            <h4>{v.role}</h4>
                                            <p><strong>{v.organization}</strong> | {v.dates}</p>
                                            {v.description && <p>{v.description}</p>}
                                            {v.achievements && v.achievements.length > 0 && (
                                                <ul className="mbl-achievements-list">{v.achievements.map((a, idx) => a && <li key={idx}>{a}</li>)}</ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {section.id === 'languages' && (
                                <ul className="mbl-simple-list">
                                    {section.content.map((l, i) => l && <li key={i}>{l}</li>)}
                                </ul>
                            )}
                            {section.id === 'certifications' && (
                                <ul className="mbl-simple-list">
                                    {section.content.map((c, i) => c && <li key={i}>{c}</li>)}</ul>
                            )}
                            {section.id === 'references' && (
                                <ul>
                                    {section.content.map((r, i) => (
                                        <li key={i} className="mbl-item">
                                            <p><strong>{r.name}</strong>, {r.title} at {r.company}</p>
                                            <p>{r.email} | {r.phone}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    </React.Fragment>
                ))}
            </main>
        </div>
    );
};

export default ModernBoldLayout;

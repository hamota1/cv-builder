
import React from 'react';
import { useResume } from '../../context/ResumeContext';
import './UltraMinimalistLayout.css';

const UltraMinimalistLayout = () => {
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
        { id: 'experience', title: 'EXPERIENCE', content: experience, hasData: experience && experience.length > 0 },
        { id: 'education', title: 'EDUCATION', content: education, hasData: education && education.length > 0 },
        { id: 'skills', title: 'SKILLS', content: skills, hasData: skills && skills.some(s => s.skill) },
        { id: 'languages', title: 'LANGUAGES', content: languages, hasData: languages && languages.length > 0 },
        { id: 'projects', title: 'PROJECTS', content: projects, hasData: projects && projects.length > 0 },
        { id: 'volunteering', title: 'VOLUNTEER/STUDENT ACTIVITIES', content: volunteering, hasData: volunteering && volunteering.length > 0 },
        { id: 'certifications', title: 'CERTIFICATIONS', content: certifications, hasData: certifications && certifications.length > 0 },
        { id: 'references', title: 'REFERENCES', content: references, hasData: references && references.length > 0 },
    ];

    // Filter out sections that have no data
    const filledSections = sections.filter(sec => sec.hasData);

    return (
        <div className="uml-container">
            <header className="uml-header">
                {pInfo.fullName && <h1 className="uml-name">{pInfo.fullName.toUpperCase()}</h1>}
                {pInfo.jobTitle && <h2 className="uml-job-title">{pInfo.jobTitle.toUpperCase()}</h2>}
                <div className="uml-contact-info">
                    {pInfo.email && <span>{pInfo.email}</span>}
                    {pInfo.phone && <span>{pInfo.phone}</span>}
                    {pInfo.location && <span>{pInfo.location}</span>}
                    {pInfo.LinkedIn && <span>{pInfo.LinkedIn}</span>}
                </div>
            </header>

            <main className="uml-content-area">
                {filledSections.map((section, index) => (
                    <React.Fragment key={section.id}>
                        {/* Divider before each section except the first */}
                        {index > 0 && <hr className="uml-divider" />}

                        <section className="uml-section">
                            <h3>{section.title}</h3>
                            {section.id === 'summary' && <p>{section.content}</p>}
                            {section.id === 'experience' && (
                                <ul>
                                    {section.content.map((exp, i) => (
                                        <li key={i} className="uml-item">
                                            <div>
                                                <h4>{exp.role}</h4>
                                                <p><strong>{exp.company}</strong></p>
                                            </div>
                                            <span className="uml-item-dates">{exp.dates}</span>
                                            {exp.achievements && exp.achievements.length > 0 && (
                                                <ul className="uml-achievements-list">{exp.achievements.map((a, idx) => a && <li key={idx}>{a}</li>)}</ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {section.id === 'education' && (
                                <ul>
                                    {section.content.map((edu, i) => (
                                        <li key={i} className="uml-item">
                                            <div>
                                                <h4>{edu.degree}{edu.major && `, ${edu.major}`}</h4>
                                                <p><strong>{edu.university}</strong></p>
                                            </div>
                                            <span className="uml-item-dates">{edu.year}</span>
                                            {edu.achievements && edu.achievements.length > 0 && (
                                                <ul className="uml-achievements-list">{edu.achievements.map((a, idx) => a && <li key={idx}>{a}</li>)}</ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {section.id === 'skills' && (
                                <ul className="uml-skills-list">
                                    {section.content.map((s, i) => s.skill && <li key={i}>{s.skill}</li>)}
                                </ul>
                            )}
                            {section.id === 'languages' && (
                                <ul className="uml-simple-list">
                                    {section.content.map((l, i) => l && <li key={i}>{l}</li>)}
                                </ul>
                            )}
                            {section.id === 'projects' && (
                                <ul>
                                    {section.content.map((p, i) => (
                                        <li key={i} className="uml-item">
                                            <div>
                                                <h4>{p.title}</h4>
                                                {p.description && <p>{p.description}</p>}
                                            </div>
                                            <span className="uml-item-dates">{p.dates}</span>
                                            {p.achievements && p.achievements.length > 0 && (
                                                <ul className="uml-achievements-list">{p.achievements.map((a, idx) => a && <li key={idx}>{a}</li>)}</ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {section.id === 'volunteering' && (
                                <ul>
                                    {section.content.map((v, i) => (
                                        <li key={i} className="uml-item">
                                            <div>
                                                <h4>{v.role}</h4>
                                                <p><strong>{v.organization}</strong></p>
                                            </div>
                                            <span className="uml-item-dates">{v.dates}</span>
                                            {v.description && <p>{v.description}</p>}
                                            {v.achievements && v.achievements.length > 0 && (
                                                <ul className="uml-achievements-list">{v.achievements.map((a, idx) => a && <li key={idx}>{a}</li>)}</ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {section.id === 'certifications' && (
                                <ul className="uml-simple-list">
                                    {section.content.map((c, i) => c && <li key={i}>{c}</li>)}
                                </ul>
                            )}
                            {section.id === 'references' && (
                                <ul>
                                    {section.content.map((r, i) => (
                                        <li key={i} className="uml-item">
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

export default UltraMinimalistLayout;

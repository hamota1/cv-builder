import React from 'react';
import { useResume } from '../../context/ResumeContext';
import './HeaderSummaryPeachLayout.css';

// Final corrected version with all data fields mapped.
const HeaderSummaryPeachLayout = () => {
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

    // Conditional rendering checks
    const hasSummary = professionalSummary && professionalSummary.trim() !== '';
    const hasSkills = skills && skills.some(s => s.skill);
    const hasLanguages = languages && languages.length > 0;
    const hasCertifications = certifications && certifications.length > 0;
    const hasExperience = experience && experience.length > 0;
    const hasEducation = education && education.length > 0;
    const hasProjects = projects && projects.length > 0;
    const hasVolunteering = volunteering && volunteering.length > 0;
    const hasReferences = references && references.length > 0;

    return (
        <div className="hsl-v3-container">
            <header className="hsl-v3-top-section">
                {pInfo.profilePicture && (
                    <div className="hsl-v3-profile-picture-container">
                        <img src={pInfo.profilePicture} alt="Profile" className="hsl-v3-profile-picture" />
                    </div>
                )}
                <div className="hsl-v3-peach-header">
                    <h1>{pInfo.fullName}</h1>
                    <h2>{pInfo.jobTitle}</h2>
                    <div className="hsl-v3-contact-info">
                        {pInfo.email && <span>{pInfo.email}</span>}
                        {pInfo.phone && <span>{pInfo.phone}</span>}
                        {pInfo.location && <span>{pInfo.location}</span>}
                        {pInfo.LinkedIn && <span>{pInfo.LinkedIn}</span>}
                    </div>
                </div>
            </header>

            <main className="hsl-v3-content-area">
                <div className="hsl-v3-left-grey-column">
                    {hasSummary && (
                        <section className="hsl-v3-section">
                            <h3>Summary</h3>
                            <p>{professionalSummary}</p>
                        </section>
                    )}
                    {hasSkills && (
                        <section className="hsl-v3-section">
                            <h3>Tech Skills</h3>
                            <ul className="hsl-v3-skills-list">
                                {skills.map((s, i) => s.skill && (
                                    <li key={i}>
                                        <span>{s.skill}</span>
                                        <div className="hsl-v3-skill-bar">
                                            <div 
                                                className="hsl-v3-skill-level"
                                                style={{ width: `${s.percentage || 0}%` }}
                                            ></div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                    {hasLanguages && (
                        <section className="hsl-v3-section">
                            <h3>Languages</h3>
                            <ul className="hsl-v3-simple-list">{languages.map((l, i) => l && <li key={i}>{l}</li>)}</ul>
                        </section>
                    )}
                    {hasCertifications && (
                        <section className="hsl-v3-section">
                            <h3>Certifications</h3>
                            <ul className="hsl-v3-simple-list">{certifications.map((c, i) => c && <li key={i}>{c}</li>)}</ul>
                        </section>
                    )}
                </div>

                <div className="hsl-v3-right-white-column">
                    {hasExperience && (
                        <section className="hsl-v3-section">
                            <h3>Experience</h3>
                            {experience.map((exp, i) => (
                                <div key={i} className="hsl-v3-item">
                                    <h4>{exp.role}</h4>
                                    <p><strong>{exp.company}</strong> | {exp.dates}</p>
                                    <ul>{exp.achievements && exp.achievements.map((a, idx) => a && <li key={idx}>{a}</li>)}</ul>
                                </div>
                            ))}
                        </section>
                    )}
                    {hasEducation && (
                        <section className="hsl-v3-section">
                            <h3>Education</h3>
                            {education.map((edu, i) => (
                                <div key={i} className="hsl-v3-item">
                                    <h4>{edu.degree}{edu.major && `, ${edu.major}`}</h4>
                                    <p><strong>{edu.university}</strong> | {edu.year}</p>
                                    <ul>{edu.achievements && edu.achievements.map((a, idx) => a && <li key={idx}>{a}</li>)}</ul>
                                </div>
                            ))}
                        </section>
                    )}
                    {hasProjects && (
                        <section className="hsl-v3-section">
                            <h3>Projects/Research</h3>
                            {projects.map((p, i) => (
                                <div key={i} className="hsl-v3-item">
                                    <h4>{p.title}</h4>
                                    <p>{p.dates}</p>
                                    {p.description && <p>{p.description}</p>}
                                    <ul>{p.achievements && p.achievements.map((a, idx) => a && <li key={idx}>{a}</li>)}</ul>
                                </div>
                            ))}
                        </section>
                    )}
                    {hasVolunteering && (
                        <section className="hsl-v3-section">
                            <h3>Volunteer/Student Activities</h3>
                            {volunteering.map((v, i) => (
                                <div key={i} className="hsl-v3-item">
                                    <h4>{v.role}</h4>
                                    <p><strong>{v.organization}</strong> | {v.dates}</p>
                                    {v.description && <p>{v.description}</p>}
                                    <ul>{v.achievements && v.achievements.map((a, idx) => a && <li key={idx}>{a}</li>)}</ul>
                                </div>
                            ))}
                        </section>
                    )}
                    {hasReferences && (
                        <section className="hsl-v3-section">
                            <h3>References</h3>
                            {references.map((r, i) => (
                                <div key={i} className="hsl-v3-item">
                                    <p><strong>{r.name}</strong>, {r.title} at {r.company}</p>
                                    <p>{r.email} | {r.phone}</p>
                                </div>
                            ))}
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
};

export default HeaderSummaryPeachLayout;
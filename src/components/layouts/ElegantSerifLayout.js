import React from 'react';
import { useResume } from '../../context/ResumeContext';
import './ElegantSerifLayout.css';

const ElegantSerifLayout = () => {
    const { resumeData } = useResume();
    const { personal: personalInfo, summary: professionalSummary, experience, education, skills, languages, projects, volunteer: volunteering, certifications, references } = resumeData;

    // Helper functions remain the same
    const hasContact = personalInfo && (personalInfo.email || personalInfo.phone || personalInfo.linkedIn);
    const hasSkills = skills && skills.some(s => s.skill);
    const hasLanguages = languages && languages.some(l => l);
    const hasSummary = professionalSummary && professionalSummary.trim() !== '';
    const hasExperience = experience && experience.some(e => e.role || e.company);
    const hasEducation = education && education.some(e => e.university || e.degree);
    const hasProjects = projects && projects.some(p => p.title);
    const hasVolunteering = volunteering && volunteering.some(v => v.organization || v.role);
    const hasCertifications = certifications && certifications.length > 0;
    const hasReferences = references && references.some(r => r.name);

    return (
        <div className="elegant-serif-layout">
            {/* --- Page Header (Picture + Name/Title) --- */}
            <header className="esl-page-header">
                <div className="esl-header-text">
                    {personalInfo && (personalInfo.fullName || personalInfo.jobTitle) && (
                        <>
                            <h1>{personalInfo.fullName}</h1>
                            <h2>{personalInfo.jobTitle}</h2>
                        </>
                    )}
                </div>
                {personalInfo && personalInfo.profilePicture && (
                    <div className="esl-profile-picture-container">
                        <img src={personalInfo.profilePicture} alt="Profile" className="esl-profile-picture" />
                    </div>
                )}
            </header>

            {/* --- Horizontal Divider --- */}
            <hr className="esl-divider" />

            {/* --- Main Content (Two Columns) --- */}
            <main className="esl-main-content">
                {/* Left (Narrow) Column */}
                <div className="esl-left-column">
                    {hasContact && (
                        <section className="esl-section">
                            <h3>Contact</h3>
                            {personalInfo.email && <p>{personalInfo.email}</p>}
                            {personalInfo.phone && <p>{personalInfo.phone}</p>}
                            {personalInfo.linkedIn && <p>{personalInfo.linkedIn}</p>}
                            {personalInfo.location && <p>{personalInfo.location}</p>}
                        </section>
                    )}
                    {hasSkills && (
                        <section className="esl-section">
                            <h3>Skills</h3>
                            <ul>{skills.map((s, i) => s.skill && <li key={i}>{s.skill}</li>)}</ul>
                        </section>
                    )}
                    {hasLanguages && (
                        <section className="esl-section">
                            <h3>Languages</h3>
                            <ul>{languages.map((l, i) => l && <li key={i}>{l}</li>)}</ul>
                        </section>
                    )}
                    {hasCertifications && (
                        <section className="esl-section">
                            <h3>Certifications</h3>
                            <ul>{certifications.map((cert, i) => cert && <li key={i}>{cert}</li>)}</ul>
                        </section>
                    )}
                </div>

                {/* Right (Wider) Column */}
                <div className="esl-right-column">
                    {hasSummary && (
                        <section className="esl-section">
                            <h3>Professional Summary</h3>
                            <p>{professionalSummary}</p>
                        </section>
                    )}
                    {hasExperience && (
                        <section className="esl-section">
                            <h3>Experience</h3>
                            {experience.map((exp, index) => (
                                <div key={index}>
                                    <h4>{exp.role}</h4>
                                    <p><strong>{exp.company}</strong> | {exp.dates}</p>
                                    {exp.achievements && <ul>{exp.achievements.map((ach, i) => ach && <li key={i}>{ach}</li>)}</ul>}
                                </div>
                            ))}
                        </section>
                    )}
                    {hasEducation && (
                        <section className="esl-section">
                            <h3>Education</h3>
                            {education.map((edu, index) => (
                                <div key={index}>
                                    <h4>{edu.degree} {edu.major && `in ${edu.major}`}</h4>
                                    <p>{edu.university} | {edu.year}</p>
                                    {edu.achievements && <ul>{edu.achievements.map((ach, i) => ach && <li key={i}>{ach}</li>)}</ul>}
                                </div>
                            ))}
                        </section>
                    )}
                    {hasProjects && (
                        <section className="esl-section">
                            <h3>Projects/Research</h3>
                            {projects.map((proj, index) => (
                                <div key={index}>
                                    <h4>{proj.title}</h4>
                                    <p>{proj.dates}</p>
                                    {proj.imageURL && <img src={proj.imageURL} alt={proj.title} style={{ maxWidth: '100px', maxHeight: '100px' }} />}
                                    {proj.technologies && <p><strong>Technologies:</strong> {proj.technologies}</p>}
                                    {proj.achievements && <ul>{proj.achievements.map((ach, i) => ach && <li key={i}>{ach}</li>)}</ul>}
                                </div>
                            ))}
                        </section>
                    )}
                    {hasVolunteering && (
                        <section className="esl-section">
                            <h3>Volunteer/Student Activities</h3>
                            {volunteering.map((vol, index) => (
                                <div key={index}>
                                    <h4>{vol.role}</h4>
                                    <p><strong>{vol.organization}</strong> | {vol.dates}</p>
                                    {vol.achievements && <ul>{vol.achievements.map((ach, i) => ach && <li key={i}>{ach}</li>)}</ul>}
                                </div>
                            ))}
                        </section>
                    )}
                    {hasReferences && (
                        <section className="esl-section">
                            <h3>References</h3>
                            {references.map((ref, index) => (
                                <div key={index}>
                                    <p><strong>{ref.name}</strong>, {ref.title}</p>
                                    <p>{ref.contact}</p>
                                    {ref.achievements && <ul>{ref.achievements.map((ach, i) => ach && <li key={i}>{ach}</li>)}</ul>}
                                </div>
                            ))}
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ElegantSerifLayout;
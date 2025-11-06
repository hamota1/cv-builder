/* >  * هذا هو ملف الهيكل العظمي لـ HeaderSplitLayout.js
* مهمتك هي ملء كل الأجزاء التي تبدأ بـ // TODO:
*/
import React, { useContext } from 'react';
import { ResumeContext } from '../context/ResumeContext'; // افترض أن هذا هو المسار الصحيح
import '../styles/HeaderSplitLayout.css'; // (تأكد من إنشاء هذا الملف أيضاً)

// --- TODO: قم بإنشاء المكونات الفرعية هنا (Timeline, Slider) إذا أردت ---
// مكون أيقونة بسيط
const Icon = ({ name, className = "" }) => (
  <span className={`icon ${className}`} data-icon={name}></span>
);

// مكون شريط المهارات
const SkillBar = ({ skill, level }) => (
  <div className="skill-bar">
    <div className="skill-name">{skill}</div>
    <div className="skill-level">
      <div className="skill-progress" style={{ width: `${level}%` }}></div>
    </div>
  </div>
);

// مكون الخط الزمني
const TimelineItem = ({ title, subtitle, date, description, location }) => (
  <div className="timeline-item">
    <div className="timeline-dot"></div>
    <div className="timeline-content">
      <div className="timeline-date">{date}</div>
      <h4 className="timeline-title">{title}</h4>
      {subtitle && <div className="timeline-subtitle">{subtitle}</div>}
      {location && <div className="timeline-location">{location}</div>}
      {description && <p className="timeline-description">{description}</p>}
    </div>
  </div>
);

const HeaderSplitLayout = () => {
  // --- TODO: اقرأ كل بيانات الـ Context هنا ---
  const { personalInfo, professionalSummary, skills, experience, education, languages, certifications, projects, volunteering, references } = useContext(ResumeContext);

  return (
    <div className="header-split-container">
      {/* === 1. بناء الرأس === */}
      <div className="header-white-block">
        {/* --- TODO: أضف CSS لجعل هذا بخلفية بيضاء وحافة سفلية منحنية --- */}
        <div className="contact-info-left">
          {/* --- TODO: اعرض personalInfo.phone و personalInfo.location هنا --- */}
          {personalInfo.phone && <div className="contact-item"><Icon name="phone" /> {personalInfo.phone}</div>}
          {personalInfo.location && <div className="contact-item"><Icon name="location" /> {personalInfo.location}</div>}
        </div>
        <div className="contact-info-right">
          {/* --- TODO: اعرض personalInfo.email و personalInfo.linkedin هنا --- */}
          {personalInfo.email && <div className="contact-item"><Icon name="email" /> {personalInfo.email}</div>}
          {personalInfo.linkedin && <div className="contact-item"><Icon name="linkedin" /> {personalInfo.linkedin}</div>}
        </div>
        <div className="header-name-title">
          {/* --- TODO: اعرض personalInfo.fullName و personalInfo.jobTitle هنا --- */}
          <h1 className="full-name">{personalInfo.fullName || "الاسم الكامل"}</h1>
          <h2 className="job-title">{personalInfo.jobTitle || "المسمى الوظيفي"}</h2>
        </div>
        {personalInfo.profilePicture && (
          <img 
            src={personalInfo.profilePicture} 
            className="profile-picture-split" 
            alt="Profile" 
          />
        )}
        {/* --- TODO: أضف CSS (position: absolute, z-index: 10) لجعل الصورة "تتداخل" مع المنحنى --- */}
      </div>

      {/* === 2. بناء شبكة المحتوى === */}
      <div className="content-grid">
        {/* --- TODO: أضف CSS Grid لإنشاء عمودين (1fr 1.5fr) مع gap --- */}

        {/* --- العمود الأيسر --- */}
        <div className="grid-left-column">
          {/* --- TODO: قم بإنشاء "منطق" (Logic) لعرض الأقسام التالية هنا --- */}
          {/* (اعرض القسم فقط إذا كان موجوداً) */}

          {/* 1. PROFESSIONAL SUMMARY (مع أيقونة) */}
          {professionalSummary && (
            <div className="section">
              <h3 className="section-title"><Icon name="summary" /> الملخص المهني</h3>
              <p>{professionalSummary}</p>
            </div>
          )}

          {/* 2. SKILLS (مع أيقونة وتصميم "Slider-style bar") */}
          {skills && skills.length > 0 && (
            <div className="section">
              <h3 className="section-title"><Icon name="skills" /> المهارات</h3>
              <div className="skills-container">
                {skills.map((skill, index) => (
                  <SkillBar key={index} skill={skill.name} level={skill.level || 80} />
                ))}
              </div>
            </div>
          )}

          {/* 3. LANGUAGES (مع أيقونة) */}
          {languages && languages.length > 0 && (
            <div className="section">
              <h3 className="section-title"><Icon name="languages" /> اللغات</h3>
              <ul className="languages-list">
                {languages.map((language, index) => (
                  <li key={index}>
                    <span className="language-name">{language.name}</span>
                    <span className="language-level">{language.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 4. CERTIFICATIONS (مع أيقونة) */}
          {certifications && certifications.length > 0 && (
            <div className="section">
              <h3 className="section-title"><Icon name="certifications" /> الشهادات</h3>
              <ul className="certifications-list">
                {certifications.map((cert, index) => (
                  <li key={index}>
                    <div className="cert-name">{cert.name}</div>
                    <div className="cert-issuer">{cert.issuer} - {cert.date}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* --- العمود الأيمن --- */}
        <div className="grid-right-column">
          {/* --- TODO: قم بإنشاء "منطق" (Logic) لعرض الأقسام التالية هنا --- */}
          {/* (اعرض القسم فقط إذا كان موجوداً) */}

          {/* 1. EXPERIENCE (مع أيقونة وتصميم "Timeline") */}
          {experience && experience.length > 0 && (
            <div className="section">
              <h3 className="section-title"><Icon name="experience" /> الخبرة العملية</h3>
              <div className="timeline">
                {experience.map((exp, index) => (
                  <TimelineItem 
                    key={index}
                    title={exp.position}
                    subtitle={exp.company}
                    date={`${exp.startDate} - ${exp.endDate}`}
                    description={exp.description}
                    location={exp.location}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 2. EDUCATION (مع أيقونة وتصميم "Timeline") */}
          {education && education.length > 0 && (
            <div className="section">
              <h3 className="section-title"><Icon name="education" /> التعليم</h3>
              <div className="timeline">
                {education.map((edu, index) => (
                  <TimelineItem 
                    key={index}
                    title={edu.degree}
                    subtitle={edu.institution}
                    date={`${edu.startDate} - ${edu.endDate}`}
                    description={edu.description}
                    location={edu.location}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 3. PROJECTS (مع أيقونة) */}
          {projects && projects.length > 0 && (
            <div className="section">
              <h3 className="section-title"><Icon name="projects" /> المشاريع</h3>
              <div className="projects-list">
                {projects.map((project, index) => (
                  <div key={index} className="project-item">
                    <h4 className="project-name">{project.name}</h4>
                    <p className="project-description">{project.description}</p>
                    {project.technologies && (
                      <div className="project-technologies">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. VOLUNTEERING (مع أيقونة) */}
          {volunteering && volunteering.length > 0 && (
            <div className="section">
              <h3 className="section-title"><Icon name="volunteering" /> العمل التطوعي</h3>
              <div className="timeline">
                {volunteering.map((vol, index) => (
                  <TimelineItem 
                    key={index}
                    title={vol.position}
                    subtitle={vol.organization}
                    date={`${vol.startDate} - ${vol.endDate}`}
                    description={vol.description}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 5. REFERENCES (مع أيقونة) */}
          {references && references.length > 0 && (
            <div className="section">
              <h3 className="section-title"><Icon name="references" /> المراجع</h3>
              <div className="references-list">
                {references.map((ref, index) => (
                  <div key={index} className="reference-item">
                    <div className="reference-name">{ref.name}</div>
                    <div className="reference-position">{ref.position}</div>
                    <div className="reference-company">{ref.company}</div>
                    <div className="reference-contact">{ref.email} | {ref.phone}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderSplitLayout;

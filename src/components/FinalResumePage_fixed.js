import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import templates from '../templates.json';

// Layout components
import SidebarLayout from './layouts/SidebarLayout';
import SingleColumnLayout from './layouts/SingleColumnLayout';
import HeaderSplitLayout from './layouts/HeaderSplitLayout';
import HeaderBlockLayout from './layouts/HeaderBlockLayout';
import VisualBlockLayout from './layouts/VisualBlockLayout';
import HeaderSummaryLayout from './layouts/HeaderSummaryLayout';
import NarrowSidebarLayout from './layouts/NarrowSidebarLayout';
import QuadrantLayout from './layouts/QuadrantLayout';

const FinalResumePage = () => {
  const navigate = useNavigate();
  const { resumeData: data, selectedDesign, setResumeData, setSelectedDesign } = useResume();

  const template = templates.find(t => t.id === selectedDesign);

  const renderTemplate = () => {
    if (!template) return null;
    const props = { data: data, theme: template.theme };

    switch (template.layout) {
      case 'sidebar': return <SidebarLayout {...props} />;
      case 'single-column': return <SingleColumnLayout {...props} />;
      case 'header-split': return <HeaderSplitLayout {...props} />;
      case 'header-block': return <HeaderBlockLayout {...props} />;
      case 'visual-block': return <VisualBlockLayout {...props} />;
      case 'header-summary': return <HeaderSummaryLayout {...props} />;
      case 'narrow-sidebar': return <NarrowSidebarLayout {...props} />;
      case 'quadrant': return <QuadrantLayout {...props} />;
      default: return <SingleColumnLayout {...props} />;
    }
  };

  const handleApiDownload = async () => {
    // استبدل "YOUR_API_KEY_HERE" بالمفتاح الذي حصلت عليه
    const API_KEY = "d6eee96e-fcec-485e-94c0-2914b55f8d36";

    // 1. احصل على كود الـ HTML للسيرة الذاتية
    const resumeElement = document.getElementById("resume-preview-area");
    if (!resumeElement) {
      alert("لا يمكن العثور على السيرة الذاتية!");
      return;
    }
    const resumeHtml = resumeElement.innerHTML;

    // 2. احصل على كود الـ CSS من ملف themes.css
    const themesCss = `/* --- Base Resume Styles --- */
.resume-container {
  background: #fff;
  color: #333;
  font-family: 'Lato', 'Roboto', sans-serif;
  line-height: 1.5;
  width: 8.5in;
  min-height: 11in;
  margin: 0 auto;
  box-shadow: 0 0 15px rgba(0,0,0,0.15);
  position: relative;
  padding: 0.5in;
}

/* Common Layout Elements */
.header-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.header-text {
  flex: 1;
}

.contact-row, .contact-grid {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.profile-section {
  text-align: center;
  margin-bottom: 2rem;
}

/* Icon styles for contact information */
.fas {
  margin-right: 0.5rem;
  opacity: 0.7;
}

/* Responsive adjustments */
@media print {
  .resume-container {
    box-shadow: none;
    margin: 0;
    padding: 0.25in;
  }
}

.resume-container h1, .resume-container h2, .resume-container h3 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  margin: 0 0 1rem 0;
}

/* Resume Layout Common Styles */
.resume-container .sidebar {
  width: 30%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  padding: 1.5rem;
}

.resume-container .main-content {
  margin-left: 32%;
  padding: 1.5rem;
}

.resume-container .experience-item,
.resume-container .education-item {
  margin-bottom: 1.5rem;
}

.resume-container .skill-item,
.resume-container .language-item {
  display: inline-block;
  margin: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.resume-container .dates {
  color: #666;
  font-size: 0.9em;
}

.resume-container .achievements {
  margin-top: 0.5rem;
  padding-left: 1.2rem;
}

.resume-container .achievements li {
  margin-bottom: 0.5rem;
}

.resume-container ul {
  margin: 0;
  padding-left: 1.2rem;
}

.resume-container .contact-info p {
  margin: 0.5rem 0;
}

/* Paragraph formatting */
.resume-container p {
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

/* New Sections Styling */
.resume-container .project-item,
.resume-container .volunteer-item,
.resume-container .reference-item {
  margin-bottom: 1.5rem;
}

.resume-container .project-item h3,
.resume-container .volunteer-item h3,
.resume-container .reference-item h3 {
  margin-bottom: 0.25rem;
}

.resume-container .project-images {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.resume-container .project-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #eee;
}`;

    // 3. أنشئ HTML كامل
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${data.personal.fullName} - Resume</title>
          <style>${themesCss}</style>
        </head>
        <body>
          ${resumeHtml}
        </body>
      </html>
    `;

    // 4. أرسل إلى API لتحويله إلى PDF
    try {
      const response = await fetch('https://api.html2pdf.app/v1/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          html: fullHtml,
          fileName: `${data.personal.fullName.toLowerCase().replace(/\s+/g, '-')}-resume.pdf`,
          options: {
            format: 'A4',
            margin: {
              top: '0.5in',
              right: '0.5in',
              bottom: '0.5in',
              left: '0.5in'
            }
          }
        })
      });

      if (!response.ok) {
        throw new Error('فشل في تحويل الملف إلى PDF');
      }

      // 5. احصل على الملف وقم بتنزيله
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = `${data.personal.fullName.toLowerCase().replace(/\s+/g, '-')}-resume.pdf`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // تنظيف الرابط المؤقت
      setTimeout(() => URL.revokeObjectURL(url), 100);

      alert('تم تحميل ملف PDF بنجاح!');
    } catch (error) {
      console.error('Error:', error);
      alert('حدث خطأ أثناء تحويل الملف. يرجى المحاولة مرة أخرى.');
    }
  };

  const downloadAsPDF = () => {
    // استخدم واجهة برمجة تطبيقات الطرف الثالث لتحويل HTML إلى PDF
    const element = document.getElementById('resume-preview-area');

    if (!element) {
      alert('لا يمكن العثور على السيرة الذاتية!');
      return;
    }

    // الحصول على محتوى HTML
    const htmlContent = element.innerHTML;

    // استخدم API لتحويل HTML إلى PDF
    const API_KEY = "d6eee96e-fcec-485e-94c0-2914b55f8d36";

    // إنشاء محتوى HTML كامل مع CSS
    const themesCss = `
      .resume-container {
        background: #fff;
        color: #333;
        font-family: 'Lato', 'Roboto', sans-serif;
        line-height: 1.5;
        width: 8.5in;
        min-height: 11in;
        margin: 0 auto;
        box-shadow: 0 0 15px rgba(0,0,0,0.15);
        position: relative;
        padding: 0.5in;
      }

      /* Common Layout Elements */
      .header-content {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin-bottom: 1.5rem;
      }

      .header-text {
        flex: 1;
      }

      .contact-row, .contact-grid {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        margin-top: 0.5rem;
      }

      .contact-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.5rem;
      }

      .profile-section {
        text-align: center;
        margin-bottom: 2rem;
      }

      /* Icon styles for contact information */
      .fas {
        margin-right: 0.5rem;
        opacity: 0.7;
      }

      .resume-container h1, .resume-container h2, .resume-container h3 {
        font-family: 'Montserrat', sans-serif;
        font-weight: 700;
        margin: 0 0 1rem 0;
      }

      /* Resume Layout Common Styles */
      .resume-container .sidebar {
        width: 30%;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        padding: 1.5rem;
      }

      .resume-container .main-content {
        margin-left: 32%;
        padding: 1.5rem;
      }

      .resume-container .experience-item,
      .resume-container .education-item {
        margin-bottom: 1.5rem;
      }

      .resume-container .skill-item,
      .resume-container .language-item {
        display: inline-block;
        margin: 0.25rem;
        padding: 0.25rem 0.5rem;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 4px;
      }

      .resume-container .dates {
        color: #666;
        font-size: 0.9em;
      }

      .resume-container .achievements {
        margin-top: 0.5rem;
        padding-left: 1.2rem;
      }

      .resume-container .achievements li {
        margin-bottom: 0.5rem;
      }

      .resume-container ul {
        margin: 0;
        padding-left: 1.2rem;
      }

      .resume-container .contact-info p {
        margin: 0.5rem 0;
      }

      /* Paragraph formatting */
      .resume-container p {
        margin-bottom: 0.75rem;
        line-height: 1.6;
      }

      /* New Sections Styling */
      .resume-container .project-item,
      .resume-container .volunteer-item,
      .resume-container .reference-item {
        margin-bottom: 1.5rem;
      }

      .resume-container .project-item h3,
      .resume-container .volunteer-item h3,
      .resume-container .reference-item h3 {
        margin-bottom: 0.25rem;
      }

      .resume-container .project-images {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.5rem;
      }

      .resume-container .project-image {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 4px;
        border: 1px solid #eee;
      }
    `;

    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${data.personal.fullName} - Resume</title>
          <style>${themesCss}</style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;

    // إظهار مؤشر التحميل
    const loadingIndicator = document.createElement('div');
    loadingIndicator.style.position = 'fixed';
    loadingIndicator.style.top = '0';
    loadingIndicator.style.left = '0';
    loadingIndicator.style.width = '100%';
    loadingIndicator.style.height = '100%';
    loadingIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    loadingIndicator.style.color = 'white';
    loadingIndicator.style.display = 'flex';
    loadingIndicator.style.justifyContent = 'center';
    loadingIndicator.style.alignItems = 'center';
    loadingIndicator.style.fontSize = '1.5rem';
    loadingIndicator.style.zIndex = '9999';
    loadingIndicator.innerHTML = 'جاري تحويل السيرة الذاتية إلى PDF...';
    document.body.appendChild(loadingIndicator);

    // استخدام API لتحويل HTML إلى PDF
    fetch('https://api.html2pdf.app/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        html: fullHtml,
        fileName: `${data.personal.fullName.toLowerCase().replace(/\s+/g, '-')}-resume.pdf`,
        options: {
          format: 'A4',
          margin: {
            top: '0.5in',
            right: '0.5in',
            bottom: '0.5in',
            left: '0.5in'
          }
        }
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('فشل في تحويل الملف');
      }
      return response.blob();
    })
    .then(blob => {
      // إنشاء رابط للملف المحول
      const url = URL.createObjectURL(blob);

      // إنشاء رابط تنزيل
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = `${data.personal.fullName.toLowerCase().replace(/\s+/g, '-')}-resume.pdf`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // تنظيف الرابط المؤقت
      setTimeout(() => URL.revokeObjectURL(url), 100);

      // إزالة مؤشر التحميل
      document.body.removeChild(loadingIndicator);

      // إشعار للمستخدم
      alert('تم تحميل ملف PDF بنجاح!');
    })
    .catch(error => {
      // إزالة مؤشر التحميل
      document.body.removeChild(loadingIndicator);

      console.error('Error:', error);
      alert('حدث خطأ أثناء تحويل الملف. يرجى المحاولة مرة أخرى.');
    });
  };

  const downloadAsHTML = () => {
    // استخدم واجهة برمجة تطبيقات الطرف الثالث لتحويل HTML إلى HTML
    const element = document.getElementById('resume-preview-area');

    if (!element) {
      alert('لا يمكن العثور على السيرة الذاتية!');
      return;
    }

    // الحصول على محتوى HTML
    const htmlContent = element.innerHTML;

    // إنشاء محتوى HTML كامل مع CSS
    const themesCss = `
      .resume-container {
        background: #fff;
        color: #333;
        font-family: 'Lato', 'Roboto', sans-serif;
        line-height: 1.5;
        width: 8.5in;
        min-height: 11in;
        margin: 0 auto;
        box-shadow: 0 0 15px rgba(0,0,0,0.15);
        position: relative;
        padding: 0.5in;
      }

      /* Common Layout Elements */
      .header-content {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin-bottom: 1.5rem;
      }

      .header-text {
        flex: 1;
      }

      .contact-row, .contact-grid {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        margin-top: 0.5rem;
      }

      .contact-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.5rem;
      }

      .profile-section {
        text-align: center;
        margin-bottom: 2rem;
      }

      /* Icon styles for contact information */
      .fas {
        margin-right: 0.5rem;
        opacity: 0.7;
      }

      .resume-container h1, .resume-container h2, .resume-container h3 {
        font-family: 'Montserrat', sans-serif;
        font-weight: 700;
        margin: 0 0 1rem 0;
      }

      /* Resume Layout Common Styles */
      .resume-container .sidebar {
        width: 30%;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        padding: 1.5rem;
      }

      .resume-container .main-content {
        margin-left: 32%;
        padding: 1.5rem;
      }

      .resume-container .experience-item,
      .resume-container .education-item {
        margin-bottom: 1.5rem;
      }

      .resume-container .skill-item,
      .resume-container .language-item {
        display: inline-block;
        margin: 0.25rem;
        padding: 0.25rem 0.5rem;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 4px;
      }

      .resume-container .dates {
        color: #666;
        font-size: 0.9em;
      }

      .resume-container .achievements {
        margin-top: 0.5rem;
        padding-left: 1.2rem;
      }

      .resume-container .achievements li {
        margin-bottom: 0.5rem;
      }

      .resume-container ul {
        margin: 0;
        padding-left: 1.2rem;
      }

      .resume-container .contact-info p {
        margin: 0.5rem 0;
      }

      /* Paragraph formatting */
      .resume-container p {
        margin-bottom: 0.75rem;
        line-height: 1.6;
      }

      /* New Sections Styling */
      .resume-container .project-item,
      .resume-container .volunteer-item,
      .resume-container .reference-item {
        margin-bottom: 1.5rem;
      }

      .resume-container .project-item h3,
      .resume-container .volunteer-item h3,
      .resume-container .reference-item h3 {
        margin-bottom: 0.25rem;
      }

      .resume-container .project-images {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.5rem;
      }

      .resume-container .project-image {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 4px;
        border: 1px solid #eee;
      }
    `;

    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${data.personal.fullName} - Resume</title>
          <style>${themesCss}</style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;

    // تحويل HTML إلى Blob
    const htmlBlob = new Blob([fullHtml], { type: 'text/html' });

    // إنشاء رابط مؤقت للملف
    const url = URL.createObjectURL(htmlBlob);

    // إنشاء رابط تنزيل
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `${data.personal.fullName.toLowerCase().replace(/\s+/g, '-')}-resume.html`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // تنظيف الرابط المؤقت
    setTimeout(() => URL.revokeObjectURL(url), 100);

    // إشعار للمستخدم
    alert('تم تحميل ملف HTML بنجاح!');
  };

  const downloadAsWord = () => {
    // استخدم واجهة برمجة تطبيقات الطرف الثالث لتحويل HTML إلى Word
    const element = document.getElementById('resume-preview-area');

    if (!element) {
      alert('لا يمكن العثور على السيرة الذاتية!');
      return;
    }

    // الحصول على محتوى HTML
    const htmlContent = element.innerHTML;

    // استخدم API لتحويل HTML إلى Word
    const API_KEY = "d6eee96e-fcec-485e-94c0-2914b55f8d36";

    // إنشاء محتوى HTML كامل مع CSS
    const themesCss = `
      .resume-container {
        background: #fff;
        color: #333;
        font-family: 'Lato', 'Roboto', sans-serif;
        line-height: 1.5;
        width: 8.5in;
        min-height: 11in;
        margin: 0 auto;
        box-shadow: 0 0 15px rgba(0,0,0,0.15);
        position: relative;
        padding: 0.5in;
      }

      /* Common Layout Elements */
      .header-content {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin-bottom: 1.5rem;
      }

      .header-text {
        flex: 1;
      }

      .contact-row, .contact-grid {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        margin-top: 0.5rem;
      }

      .contact-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.5rem;
      }

      .profile-section {
        text-align: center;
        margin-bottom: 2rem;
      }

      /* Icon styles for contact information */
      .fas {
        margin-right: 0.5rem;
        opacity: 0.7;
      }

      .resume-container h1, .resume-container h2, .resume-container h3 {
        font-family: 'Montserrat', sans-serif;
        font-weight: 700;
        margin: 0 0 1rem 0;
      }

      /* Resume Layout Common Styles */
      .resume-container .sidebar {
        width: 30%;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        padding: 1.5rem;
      }

      .resume-container .main-content {
        margin-left: 32%;
        padding: 1.5rem;
      }

      .resume-container .experience-item,
      .resume-container .education-item {
        margin-bottom: 1.5rem;
      }

      .resume-container .skill-item,
      .resume-container .language-item {
        display: inline-block;
        margin: 0.25rem;
        padding: 0.25rem 0.5rem;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 4px;
      }

      .resume-container .dates {
        color: #666;
        font-size: 0.9em;
      }

      .resume-container .achievements {
        margin-top: 0.5rem;
        padding-left: 1.2rem;
      }

      .resume-container .achievements li {
        margin-bottom: 0.5rem;
      }

      .resume-container ul {
        margin: 0;
        padding-left: 1.2rem;
      }

      .resume-container .contact-info p {
        margin: 0.5rem 0;
      }

      /* Paragraph formatting */
      .resume-container p {
        margin-bottom: 0.75rem;
        line-height: 1.6;
      }

      /* New Sections Styling */
      .resume-container .project-item,
      .resume-container .volunteer-item,
      .resume-container .reference-item {
        margin-bottom: 1.5rem;
      }

      .resume-container .project-item h3,
      .resume-container .volunteer-item h3,
      .resume-container .reference-item h3 {
        margin-bottom: 0.25rem;
      }

      .resume-container .project-images {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.5rem;
      }

      .resume-container .project-image {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 4px;
        border: 1px solid #eee;
      }
    `;

    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${data.personal.fullName} - Resume</title>
          <style>${themesCss}</style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;

    // إظهار مؤشر التحميل
    const loadingIndicator = document.createElement('div');
    loadingIndicator.style.position = 'fixed';
    loadingIndicator.style.top = '0';
    loadingIndicator.style.left = '0';
    loadingIndicator.style.width = '100%';
    loadingIndicator.style.height = '100%';
    loadingIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    loadingIndicator.style.color = 'white';
    loadingIndicator.style.display = 'flex';
    loadingIndicator.style.justifyContent = 'center';
    loadingIndicator.style.alignItems = 'center';
    loadingIndicator.style.fontSize = '1.5rem';
    loadingIndicator.style.zIndex = '9999';
    loadingIndicator.innerHTML = 'جاري تحويل السيرة الذاتية إلى ملف Word...';
    document.body.appendChild(loadingIndicator);

    // استخدام API لتحويل HTML إلى Word
    fetch('https://api.html2docx.com/v1/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      },
      body: JSON.stringify({
        html: fullHtml,
        options: {
          filename: `${data.personal.fullName.toLowerCase().replace(/\s+/g, '-')}-resume`,
          format: 'docx',
          margin: '0.5in',
          pageSize: 'letter'
        }
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('فشل في تحويل الملف');
      }
      return response.blob();
    })
    .then(blob => {
      // إنشاء رابط للملف المحول
      const url = URL.createObjectURL(blob);

      // إنشاء رابط تنزيل
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = `${data.personal.fullName.toLowerCase().replace(/\s+/g, '-')}-resume.docx`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // تنظيف الرابط المؤقت
      setTimeout(() => URL.revokeObjectURL(url), 100);

      // إزالة مؤشر التحميل
      document.body.removeChild(loadingIndicator);

      // إشعار للمستخدم
      alert('تم تحميل ملف Word بنجاح!');
    })
    .catch(error => {
      // إزالة مؤشر التحميل
      document.body.removeChild(loadingIndicator);

      console.error('Error:', error);
      alert('حدث خطأ أثناء تحويل الملف. يرجى المحاولة مرة أخرى.');
    });
  };

  const handleBackToDesigns = () => {
    navigate('/design');
  };

  const handleEditInfo = () => {
    navigate('/');
  };

  const handleStartOver = () => {
    // طلب تأكيد من المستخدم قبل مسح البيانات
    if (window.confirm('هل أنت متأكد من أنك تريد البدء من جديد؟ سيتم فقدان جميع البيانات المدخلة.')) {
      setResumeData({
        personal: { fullName: '', jobTitle: '', email: '', phone: '', linkedIn: '', location: '' },
        summary: '',
        experience: [],
        education: [],
        skills: [],
        languages: [],
        certifications: [],
        projects: [],
        volunteer: [],
        references: [],
        preferredIndustry: ''
      });
      setSelectedDesign('');
      navigate('/');
    }
  };

  return (
    <div className="resume-preview-container">
      <div id="resume-preview-area">
        {renderTemplate()}
      </div>

      <div className="download-buttons">
        <button onClick={downloadAsPDF} className="btn-primary">
          Download as PDF
        </button>
        <button onClick={downloadAsHTML} className="btn-primary">
          Download as HTML
        </button>
        <button onClick={downloadAsWord} className="btn-primary">
          Download as Word
        </button>
        <button onClick={handleBackToDesigns} className="btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: "8px"}}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="9" x2="15" y2="15"></line>
            <line x1="15" y1="9" x2="9" y2="15"></line>
          </svg>
          Change Design
        </button>
        <button onClick={handleEditInfo} className="btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: "8px"}}>
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Edit Information
        </button>
        <button onClick={handleStartOver} className="btn-primary">
          Start Over
        </button>
      </div>
    </div>
  );
};

export default FinalResumePage;

import htmlToDocx from 'html-to-docx';
import { saveAs } from 'file-saver';

export const downloadAsWord = async (data) => {
  const element = document.getElementById('resume-preview-area');

  if (!element) {
    alert('لا يمكن العثور على السيرة الذاتية!');
    return;
  }

  const htmlContent = element.innerHTML;

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

  try {
    const fileBuffer = await htmlToDocx(fullHtml, null, {
      table: { row: { cantSplit: true } },
      footer: true,
      pageNumber: true,
    });

    saveAs(fileBuffer, `${data.personal.fullName.toLowerCase().replace(/\s+/g, '-')}-resume.docx`);

    document.body.removeChild(loadingIndicator);
    alert('تم تحميل ملف Word بنجاح!');
  } catch (error) {
    if (document.body.contains(loadingIndicator)) {
      document.body.removeChild(loadingIndicator);
    }
    console.error('Error:', error);
    alert('حدث خطأ أثناء تحويل الملف. يرجى المحاولة مرة أخرى.');
  }
};
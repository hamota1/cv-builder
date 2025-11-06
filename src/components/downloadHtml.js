// وظيفة تحميل HTML
export const downloadAsHTML = (data) => {
  const resumeElement = document.getElementById('resume-preview-area');
  const containerElement = resumeElement ? resumeElement.parentElement : null;

  if (!resumeElement || !containerElement) {
    alert('لا يمكن العثور على السيرة الذاتية!');
    return;
  }

  // Get the innerHTML of the resume content
  const htmlContent = resumeElement.innerHTML;
  // Get the inline styles from the parent container
  const containerStyles = containerElement.getAttribute('style') || '';
  // Get the class name of the parent container
  const containerClassName = containerElement.className || '';

  const styleTags = [];
  const linkTags = [];

  // Get all stylesheets
  Array.from(document.styleSheets).forEach(styleSheet => {
    if (styleSheet.href) {
      // For external stylesheets (like Google Fonts), create a link tag
      linkTags.push(`<link rel="stylesheet" href="${styleSheet.href}">`);
    } else {
      // For internal stylesheets, embed the rules
      try {
        const cssRules = Array.from(styleSheet.cssRules)
          .map(rule => rule.cssText)
          .join('\n');
        styleTags.push(`<style>${cssRules}</style>`);
      } catch (e) {
        console.log('Could not read CSS rules from stylesheet: ', styleSheet);
      }
    }
  });

  const fullHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${data.personal.fullName} - Resume</title>
        ${linkTags.join('\n')}
        ${styleTags.join('\n')}
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
            padding: 20px;
            box-sizing: border-box;
          }
          /* Ensure the resume container keeps its original styling */
          .${containerClassName.split(' ').join('.')} {
            margin: 0 !important;
          }
        </style>
      </head>
      <body>
        <div class="${containerClassName}" style="${containerStyles}">
          <div id="resume-preview-area">
            ${htmlContent}
          </div>
        </div>
      </body>
    </html>
  `;

  const blob = new Blob([fullHtml], { type: 'text/html' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${data.personal.fullName.toLowerCase().replace(/\s+/g, '-')}-resume.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  setTimeout(() => window.URL.revokeObjectURL(url), 100);

  alert('تم تحميل ملف HTML بنجاح!');
};

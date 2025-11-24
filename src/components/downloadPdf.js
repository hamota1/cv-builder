import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const downloadAsPDF = async () => {
  const input = document.getElementById('resume-preview-area');
  if (!input) return;

  // Create a temporary container to hold the clone
  // This ensures we capture the content with the correct width for A4
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.top = '-9999px';
  container.style.left = '0';
  container.style.width = '210mm'; // A4 width
  container.style.backgroundColor = '#ffffff'; // Ensure white background
  document.body.appendChild(container);

  // Clone the input element
  const clone = input.cloneNode(true);

  // Reset styles on the clone to avoid preview-specific issues
  clone.style.transform = 'none';
  clone.style.boxShadow = 'none';
  clone.style.margin = '0';
  clone.style.padding = '0'; // Remove padding that causes margins
  clone.style.width = '100%';
  clone.style.height = 'auto';
  clone.style.overflow = 'visible';
  clone.style.border = 'none';
  clone.style.background = 'white'; // Force white background for the resume itself

  // Remove any background gradients or images from the preview container's clone
  // We want a clean resume on white paper
  clone.style.backgroundImage = 'none';

  container.appendChild(clone);

  try {
    const canvas = await html2canvas(container, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: container.scrollWidth,
      windowHeight: container.scrollHeight
    });

    const imgData = canvas.toDataURL('image/png');

    // Calculate dimensions
    const pdfWidth = 210; // A4 width in mm
    const pxToMm = 25.4 / 96; // Approximation, but we derive height from ratio anyway
    const imgHeightPx = canvas.height;
    const imgWidthPx = canvas.width;

    // Calculate the height in mm needed to maintain aspect ratio
    const pdfHeight = (imgHeightPx * pdfWidth) / imgWidthPx;

    // Create PDF with custom page size matching the content
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: [pdfWidth, pdfHeight]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("حدث خطأ أثناء إنشاء ملف PDF. يرجى المحاولة مرة أخرى.");
  } finally {
    // Clean up
    document.body.removeChild(container);
  }
};
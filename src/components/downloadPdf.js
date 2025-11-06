import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const downloadAsPDF = () => {
  const input = document.getElementById('resume-preview-area');
  html2canvas(input)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume.pdf");
    });
};
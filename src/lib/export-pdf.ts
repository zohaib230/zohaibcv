import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

/** Renders the on-screen CV page into a true A4 PDF file. */
export async function downloadPdf(node: HTMLElement, fileName: string) {
  const page = (node.querySelector(".cv-page") as HTMLElement) ?? node;

  const canvas = await html2canvas(page, {
    scale: Math.min(3, Math.max(2, window.devicePixelRatio * 2)),
    useCORS: true,
    backgroundColor: "#ffffff",
    windowWidth: page.scrollWidth,
    windowHeight: page.scrollHeight,
  });

  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait", compress: true });
  const pw = pdf.internal.pageSize.getWidth();
  const ph = pdf.internal.pageSize.getHeight();
  const img = canvas.toDataURL("image/jpeg", 0.98);

  // Fit the whole page: the CV is designed at A4 ratio so this stays crisp.
  const ratio = canvas.height / canvas.width;
  let w = pw;
  let h = pw * ratio;
  if (h > ph) {
    h = ph;
    w = ph / ratio;
  }
  pdf.addImage(img, "JPEG", (pw - w) / 2, (ph - h) / 2, w, h, undefined, "FAST");
  pdf.save(fileName);
}

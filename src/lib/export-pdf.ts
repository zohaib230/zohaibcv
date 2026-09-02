import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

const A4_W = 794; // 210mm @96dpi
const A4_H = 1123; // 297mm @96dpi

/**
 * Renders the live CV node off-screen at a true A4 width and returns one
 * JPEG data-url per A4 page. Shared by the PDF and Word exporters so both
 * keep the exact design of the preview.
 */
export async function renderPageImages(node: HTMLElement): Promise<string[]> {
  const wrap = document.createElement("div");
  wrap.style.cssText =
    "position:fixed;left:-20000px;top:0;width:794px;background:#ffffff;z-index:-1;pointer-events:none;";

  const clone = node.cloneNode(true) as HTMLElement;
  clone.removeAttribute("id");
  clone.style.transform = "none";
  clone.style.width = `${A4_W}px`;
  wrap.appendChild(clone);
  document.body.appendChild(wrap);

  const page = (clone.querySelector(".cv-page") as HTMLElement) ?? clone;
  const liveHeight = ((node.querySelector(".cv-page") as HTMLElement) ?? node).offsetHeight;
  const pages = Math.max(1, Math.round(liveHeight / A4_H) || Math.ceil(liveHeight / A4_H));
  const totalH = pages * A4_H;

  page.style.width = `${A4_W}px`;
  page.style.minHeight = `${totalH}px`;
  page.style.height = `${totalH}px`;
  page.style.margin = "0";
  page.style.border = "none";
  page.style.boxShadow = "none";
  page.style.overflow = "hidden";

  try {
    await document.fonts?.ready;
    const scale = 2.5;
    const raw = await html2canvas(page, {
      scale,
      useCORS: true,
      backgroundColor: "#ffffff",
      width: A4_W,
      height: totalH,
      windowWidth: A4_W,
      windowHeight: totalH,
      scrollX: 0,
      scrollY: 0,
    });

    // Trim 1 device pixel from the side edges: removes the thin border /
    // anti-alias line some browsers leave around the captured page.
    const t = Math.max(1, Math.round(scale / 2));
    const sliceH = raw.height / pages;
    const out: string[] = [];

    for (let i = 0; i < pages; i++) {
      const slice = document.createElement("canvas");
      slice.width = raw.width - t * 2;
      slice.height = Math.round(sliceH) - (pages === 1 ? t * 2 : 0);
      const ctx = slice.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, slice.width, slice.height);
      ctx.drawImage(
        raw,
        t,
        Math.round(i * sliceH) + (pages === 1 ? t : 0),
        slice.width,
        slice.height,
        0,
        0,
        slice.width,
        slice.height,
      );
      out.push(slice.toDataURL("image/jpeg", 0.97));
    }
    return out;
  } finally {
    document.body.removeChild(wrap);
  }
}

/** Builds a true A4 PDF (one page per rendered page) and returns it as a Blob. */
export async function buildPdfBlob(node: HTMLElement): Promise<Blob> {
  const images = await renderPageImages(node);
  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait", compress: true });
  const pw = pdf.internal.pageSize.getWidth();
  const ph = pdf.internal.pageSize.getHeight();

  images.forEach((img, i) => {
    if (i > 0) pdf.addPage();
    pdf.addImage(img, "JPEG", 0, 0, pw, ph, undefined, "FAST");
  });

  return pdf.output("blob");
}

/** Downloads the CV as a true A4 PDF. */
export async function downloadPdf(node: HTMLElement, fileName: string) {
  const blob = await buildPdfBlob(node);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/**
 * Shares the CV as a real PDF file through the native share sheet (WhatsApp,
 * email, etc.). Returns false when the device cannot share files, so the
 * caller can fall back to a download + wa.me link.
 */
export async function sharePdf(node: HTMLElement, fileName: string, text: string): Promise<boolean> {
  const blob = await buildPdfBlob(node);
  const file = new File([blob], fileName, { type: "application/pdf" });
  const nav = navigator as Navigator & {
    canShare?: (d: ShareData) => boolean;
    share?: (d: ShareData) => Promise<void>;
  };
  if (nav.share && nav.canShare?.({ files: [file] })) {
    try {
      await nav.share({ files: [file], title: fileName, text });
      return true;
    } catch {
      return true; // user cancelled — do not fall back
    }
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
  return false;
}

import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

const A4_W = 794; // 210mm @96dpi
const A4_H = 1123; // 297mm @96dpi

/**
 * Renders the CV into a true A4 PDF.
 * The node is cloned into an off-screen, un-scaled A4 box first so the live
 * preview's CSS transform can never produce edge lines or blurry output.
 */
export async function downloadPdf(node: HTMLElement, fileName: string) {
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
  page.style.width = `${A4_W}px`;
  page.style.minHeight = `${A4_H}px`;
  page.style.height = `${A4_H}px`;
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
      height: A4_H,
      windowWidth: A4_W,
      windowHeight: A4_H,
      scrollX: 0,
      scrollY: 0,
    });

    // Trim 1 device pixel from every edge: removes the thin border/anti-alias
    // line some browsers leave at the top of the captured page.
    const t = Math.max(1, Math.round(scale / 2));
    const cropped = document.createElement("canvas");
    cropped.width = raw.width - t * 2;
    cropped.height = raw.height - t * 2;
    const ctx = cropped.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cropped.width, cropped.height);
    ctx.drawImage(raw, t, t, cropped.width, cropped.height, 0, 0, cropped.width, cropped.height);

    const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait", compress: true });
    const pw = pdf.internal.pageSize.getWidth();
    const ph = pdf.internal.pageSize.getHeight();
    pdf.addImage(cropped.toDataURL("image/jpeg", 0.97), "JPEG", 0, 0, pw, ph, undefined, "FAST");
    pdf.save(fileName);
  } finally {
    document.body.removeChild(wrap);
  }
}

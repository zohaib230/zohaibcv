import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

const A4_W = 794; // 210mm @96dpi
const A4_H = 1123; // 297mm @96dpi

/**
 * Renders the CV into a true A4 PDF. If the CV is longer than one page the
 * capture is sliced automatically into as many A4 pages as needed.
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

    const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait", compress: true });
    const pw = pdf.internal.pageSize.getWidth();
    const ph = pdf.internal.pageSize.getHeight();

    // Trim 1 device pixel from the side edges: removes the thin border /
    // anti-alias line some browsers leave around the captured page.
    const t = Math.max(1, Math.round(scale / 2));
    const sliceH = raw.height / pages;

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
      if (i > 0) pdf.addPage();
      pdf.addImage(slice.toDataURL("image/jpeg", 0.97), "JPEG", 0, 0, pw, ph, undefined, "FAST");
    }

    pdf.save(fileName);
  } finally {
    document.body.removeChild(wrap);
  }
}

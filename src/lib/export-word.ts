import { renderPageImages } from "./export-pdf";

/**
 * Exports the CV as a Microsoft Word (.doc) file. Word cannot render modern
 * CSS (flex, grid, variables), so the CV is rendered exactly as it looks in
 * the preview and each A4 page is embedded as a full-page picture. This keeps
 * every colour, font and layout detail intact when the file is opened in Word.
 */
export async function downloadWord(node: HTMLElement, fileName: string, title: string) {
  const images = await renderPageImages(node);

  const body = images
    .map(
      (src, i) =>
        `<div${i > 0 ? ' style="page-break-before:always"' : ""}><img src="${src}" style="width:210mm;height:297mm;display:block" /></div>`,
    )
    .join("");

  const html = `<!doctype html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8" />
<title>${title.replace(/[<>&]/g, "")}</title>
<style>
@page WordSection1 { size: 210mm 297mm; margin: 0; }
div.WordSection1 { page: WordSection1; }
body { margin: 0; background: #fff; }
img { border: 0; }
</style>
</head>
<body><div class="WordSection1">${body}</div></body>
</html>`;

  const blob = new Blob(["\ufeff", html], { type: "application/msword;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

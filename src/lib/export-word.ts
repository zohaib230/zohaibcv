import { collectCss } from "./export-html";

/**
 * Exports the CV as a Microsoft Word (.doc) file. Word opens HTML documents
 * natively, so the rendered CV keeps its layout, colours and fonts.
 */
export function downloadWord(node: HTMLElement, fileName: string, title: string) {
  const clone = node.cloneNode(true) as HTMLElement;
  clone.classList.remove("cv-scale");
  const inline = node.getAttribute("style");
  clone.removeAttribute("style");
  if (inline) clone.setAttribute("style", inline);

  const html = `<!doctype html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8" />
<title>${title.replace(/[<>&]/g, "")}</title>
<style>
${collectCss()}
@page WordSection1 { size: 210mm 297mm; margin: 0; }
div.WordSection1 { page: WordSection1; }
body { margin: 0; background: #fff; }
.cv-page { width: 210mm; min-height: 297mm; }
</style>
</head>
<body><div class="WordSection1">${clone.outerHTML}</div></body>
</html>`;

  const blob = new Blob(["\ufeff", html], { type: "application/msword;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

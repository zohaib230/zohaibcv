/**
 * Exports the rendered CV as a standalone .html file that opens in any browser
 * with the exact same look (all styles are inlined into the file).
 */
export function collectCss(): string {
  const parts: string[] = [];
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      for (const rule of Array.from((sheet as CSSStyleSheet).cssRules)) {
        parts.push(rule.cssText);
      }
    } catch {
      // cross-origin stylesheet – skipped
    }
  }
  return parts.join("\n");
}

export function buildStandaloneHtml(node: HTMLElement, title: string): string {
  const clone = node.cloneNode(true) as HTMLElement;
  clone.classList.remove("cv-scale");
  clone.removeAttribute("style");
  const inline = node.getAttribute("style");
  if (inline) clone.setAttribute("style", inline);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title.replace(/[<>&]/g, "")}</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700&family=Manrope:wght@400;500;700&display=swap" rel="stylesheet" />
<style>
${collectCss()}
body { margin: 0; background: #eceef1; display: flex; justify-content: center; }
@media print { body { background: #fff; } @page { size: A4; margin: 0; } }
</style>
</head>
<body>
${clone.outerHTML}
</body>
</html>`;
}

export function downloadHtml(node: HTMLElement, fileName: string, title: string) {
  const blob = new Blob([buildStandaloneHtml(node, title)], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

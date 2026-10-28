import { siteConfig, isFilled } from "@/config/siteConfig";
import type { PageMeta } from "./siteRoutes";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function publicOrigin() {
  if (!isFilled(siteConfig.publicSiteUrl)) return "";
  try {
    const parsed = new URL(siteConfig.publicSiteUrl);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return "";
    return parsed.origin;
  } catch {
    return "";
  }
}

export function seoHeadMarkup(meta: PageMeta, path: string, isArticle = false) {
  const origin = publicOrigin();
  const cleanPath = path.split("?")[0].replace(/\/$/, "") || "/";
  const tags = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}">`,
    `<meta name="robots" content="${meta.noindex ? "noindex, nofollow" : "index, follow"}">`,
    `<meta property="og:type" content="${isArticle ? "article" : "website"}">`,
    `<meta property="og:site_name" content="${escapeHtml(siteConfig.companyName)}">`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}">`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}">`,
    `<meta property="og:locale" content="en_NG">`,
    `<meta name="twitter:card" content="summary">`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}">`,
  ];
  if (origin && !meta.noindex) tags.push(`<link rel="canonical" href="${escapeHtml(`${origin}${cleanPath === "/" ? "/" : cleanPath}`)}">`);
  if (origin) tags.push(`<meta property="og:url" content="${escapeHtml(`${origin}${cleanPath === "/" ? "/" : cleanPath}`)}">`);
  if (origin && isFilled(siteConfig.logo.src)) {
    let imageUrl = "";
    try { imageUrl = new URL(siteConfig.logo.src, origin).toString(); } catch { imageUrl = ""; }
    if (imageUrl) {
      tags.push(`<meta property="og:image" content="${escapeHtml(imageUrl)}">`);
      tags.push(`<meta name="twitter:card" content="summary_large_image">`);
    }
  }
  return tags.join("\n    ");
}

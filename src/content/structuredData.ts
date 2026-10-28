import { siteConfig, isFilled } from "@/config/siteConfig";
import { services, serviceBySlug } from "./services";
import { projectBySlug } from "./projects";
import { insightBySlug } from "./insights";
import { activeRoutes } from "./siteRoutes";

function siteOrigin() {
  if (!isFilled(siteConfig.publicSiteUrl)) return "";
  try {
    const parsed = new URL(siteConfig.publicSiteUrl);
    return parsed.protocol === "https:" || parsed.protocol === "http:" ? parsed.origin : "";
  } catch { return ""; }
}

function absoluteUrl(path: string) {
  const origin = siteOrigin();
  return origin ? `${origin}${path.startsWith("/") ? path : `/${path}`}` : undefined;
}

function pageBreadcrumbs(path: string) {
  const clean = path.split("?")[0].replace(/\/$/, "") || "/";
  if (clean === "/") return [{ name: "Home", path: "/" }];
  const trail: { name: string; path: string }[] = [{ name: "Home", path: "/" }];
  let current = "";
  for (const part of clean.split("/").filter(Boolean)) {
    current += `/${part}`;
    let name = activeRoutes().find((route) => route.path === current)?.title;
    if (!name && current.startsWith("/services/")) name = serviceBySlug(part)?.name;
    if (!name && current.startsWith("/insights/")) name = insightBySlug(part)?.title;
    if (!name && current.startsWith("/projects/")) name = projectBySlug(part, false)?.title;
    name ??= part.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
    trail.push({ name, path: current });
  }
  return trail;
}

function organizationNode() {
  const origin = siteOrigin();
  const address: Record<string, unknown> = {
    "@type": "PostalAddress",
    addressLocality: "Osogbo",
    addressRegion: "Osun State",
    addressCountry: "NG",
  };
  if (isFilled(siteConfig.contact.headOfficeAddress)) address.streetAddress = siteConfig.contact.headOfficeAddress;
  return {
    "@type": ["Organization", "GeneralContractor", "LocalBusiness"],
    "@id": origin ? `${origin}/#organization` : "#organization",
    ...(origin ? { url: origin } : {}),
    name: siteConfig.companyName,
    description: siteConfig.tagline,
    address,
    ...(isFilled(siteConfig.contact.phone) ? { telephone: siteConfig.contact.phone } : {}),
    ...(isFilled(siteConfig.contact.email) ? { email: siteConfig.contact.email } : {}),
    ...(isFilled(siteConfig.logo.src) ? { logo: siteConfig.logo.src } : {}),
  };
}

export function structuredDataForPage(path: string) {
  const clean = path.split("?")[0].replace(/\/$/, "") || "/";
  const origin = siteOrigin();
  const orgId = origin ? `${origin}/#organization` : "#organization";
  const graph: Record<string, unknown>[] = [organizationNode()];
  const service = clean.startsWith("/services/") ? serviceBySlug(clean.split("/").at(-1) ?? "") : undefined;
  if (service) graph.push({ "@type": "Service", name: service.name, description: service.overview, serviceType: service.name, provider: { "@id": orgId }, ...(absoluteUrl(clean) ? { url: absoluteUrl(clean) } : {}) });
  const article = clean.startsWith("/insights/") ? insightBySlug(clean.split("/").at(-1) ?? "") : undefined;
  if (article) graph.push({ "@type": "Article", headline: article.title, description: article.metaDescription, author: { "@type": "Person", name: article.author }, publisher: { "@id": orgId }, articleSection: article.category, ...(absoluteUrl(clean) ? { mainEntityOfPage: absoluteUrl(clean), url: absoluteUrl(clean) } : {}) });
  const faqItems = service?.faqs ?? article?.faqs;
  if (faqItems?.length) graph.push({ "@type": "FAQPage", mainEntity: faqItems.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) });
  if (clean !== "/") {
    const itemListElement = pageBreadcrumbs(clean).map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, ...(absoluteUrl(item.path) ? { item: absoluteUrl(item.path) } : {}) }));
    graph.push({ "@type": "BreadcrumbList", itemListElement });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

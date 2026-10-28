import { siteConfig } from "@/config/siteConfig";
import { services, servicesHubMeta } from "./services";
import { projects } from "./projects";
import { insights, insightBySlug } from "./insights";

export type PageMeta = { title: string; description: string; noindex?: boolean; canonicalPath?: string };

export const fixedRoutes = [
  { path: "/", title: "Home" },
  { path: "/about", title: "Founder" },
  { path: "/services", title: "Services" },
  ...services.map((service) => ({ path: `/services/${service.slug}`, title: service.name })),
  { path: "/projects", title: "Projects" },
  { path: "/insights", title: "Insights" },
  { path: "/request-a-quote", title: "Request a Quote" },
  { path: "/contact", title: "Contact" },
  { path: "/privacy-policy", title: "Privacy Policy" },
  { path: "/terms", title: "Terms" },
  { path: "/cookie-policy", title: "Cookie Policy" },
  { path: "/accessibility", title: "Accessibility Statement" },
  { path: "/sitemap", title: "Sitemap" },
  { path: "/search", title: "Search results" },
  { path: "/thank-you/quote", title: "Quote request received" },
  { path: "/thank-you/contact", title: "Message received" },
  { path: "/thank-you/newsletter", title: "Newsletter request received" },
] as const;

export function activeRoutes() {
  const routes: { path: string; title: string }[] = [...fixedRoutes];
  if (siteConfig.switches.SHOW_CERTIFICATIONS) routes.push({ path: "/certifications", title: "Certifications" });
  for (const project of projects.filter((item) => item.published === true && !item.isSample)) routes.push({ path: `/projects/${project.slug}`, title: project.title });
  for (const article of insights) routes.push({ path: `/insights/${article.slug}`, title: article.title });
  return routes;
}

export const routeManifest = {
  routes: [
    ...activeRoutes().map(({ path, title }) => ({ path, title })),
    { path: "/projects/:slug", title: "Project details" },
    { path: "/insights/:slug", title: "Insight article" },
  ],
};

const meta: Record<string, PageMeta> = {
  "/": { title: "Paceefik Engineering | Construction in Osogbo", description: "From concept to completion, Paceefik Engineering Services Limited delivers building construction and engineering services in Osogbo, Nigeria." },
  "/about": { title: "Founder | Paceefik Engineering", description: "Meet Ibrahim Muslihudeen Pacific, founder of Paceefik Engineering Services Limited." },
  "/about/ibrahim-muslihudeen-pacific": { title: "Ibrahim Muslihudeen Pacific | Founder", description: "Meet the engineer behind Paceefik Engineering: builder, trainer, writer and speaker." },
  "/services": { title: servicesHubMeta.title, description: servicesHubMeta.description },
  "/projects": { title: "Our Projects | Paceefik Engineering", description: "See building, structural and borehole projects delivered by Paceefik Engineering." },
  "/insights": { title: "Construction Insights and Guides | Paceefik Engineering", description: "Practical building and engineering advice in plain language." },
  "/request-a-quote": { title: "Request a Quote | Paceefik Engineering", description: "Tell us about your project in a few minutes and our team will get back to you." },
  "/contact": { title: "Contact Paceefik Engineering | Osogbo", description: "Call, WhatsApp, email or visit. Head office in Osogbo." },
  "/privacy-policy": { title: "Privacy Policy | Paceefik Engineering", description: "Read how Paceefik Engineering handles personal information submitted through this website.", noindex: true },
  "/terms": { title: "Terms of Use | Paceefik Engineering", description: "Read the terms that apply when you use the Paceefik Engineering website.", noindex: true },
  "/cookie-policy": { title: "Cookie Policy | Paceefik Engineering", description: "Read about cookies and saved preferences on the Paceefik Engineering website.", noindex: true },
  "/accessibility": { title: "Accessibility Statement | Paceefik Engineering", description: "We aim to meet WCAG 2.2 AA. Tell us if you find something you cannot use." },
  "/sitemap": { title: "Sitemap | Paceefik Engineering", description: "Browse every available Paceefik Engineering website page.", noindex: true },
  "/search": { title: "Search Results | Paceefik Engineering", description: "Search services, projects and practical engineering guides from Paceefik Engineering.", noindex: true },
  "/thank-you/quote": { title: "Quote Request Received | Paceefik Engineering", description: "Confirmation details for a submitted Paceefik Engineering quote request.", noindex: true },
  "/thank-you/contact": { title: "Message Received | Paceefik Engineering", description: "Confirmation details for a message sent to Paceefik Engineering.", noindex: true },
  "/thank-you/newsletter": { title: "Newsletter Request | Paceefik Engineering", description: "Newsletter sign-up information from Paceefik Engineering.", noindex: true },
  "/certifications": { title: "Certifications | Paceefik Engineering", description: "Verified Paceefik Engineering certification information.", noindex: true },
  "/404": { title: "Page Not Found | Paceefik Engineering", description: "This page could not be found.", noindex: true },
};

function projectTitle(slug: string, title: string) {
  const suffix = " | Paceefik";
  if (`${title}${suffix}`.length <= 59) return `${title}${suffix}`;
  const slugPart = slug.replace(/-/g, " ").slice(-16).trim();
  const room = Math.max(8, 58 - suffix.length - slugPart.length);
  return `${title.slice(0, room).trim()} ${slugPart}${suffix}`.trim().slice(0, 59);
}

export function getPageMeta(path: string, includeSamples = false): PageMeta {
  const cleanPath = path.split("?")[0].replace(/\/$/, "") || "/";
  const exact = meta[cleanPath];
  if (exact) return { ...exact, canonicalPath: cleanPath };
  const service = services.find((item) => `/services/${item.slug}` === cleanPath);
  if (service) return { title: service.metaTitle, description: service.metaDescription, canonicalPath: cleanPath };
  const projectMatch = cleanPath.match(/^\/projects\/([^/]+)$/);
  if (projectMatch) {
    const project = projects.find((item) => item.slug === projectMatch[1] && (item.published === true || (includeSamples && item.isSample)));
    if (project && !project.isSample) return { title: projectTitle(project.slug, project.title), description: project.overview, canonicalPath: cleanPath };
    return { title: "Project details | Paceefik Engineering", description: "Verified project information will be added when available.", noindex: true, canonicalPath: cleanPath };
  }
  const articleMatch = cleanPath.match(/^\/insights\/([^/]+)$/);
  if (articleMatch) {
    const article = insightBySlug(articleMatch[1]);
    if (article) return { title: article.metaTitle, description: article.metaDescription, canonicalPath: cleanPath };
  }
  return { ...meta["/404"], canonicalPath: cleanPath };
}

export function isKnownPage(path: string) {
  const cleanPath = path.split("?")[0].replace(/\/$/, "") || "/";
  if (cleanPath === "/404") return true;
  if (fixedRoutes.some((route) => route.path === cleanPath)) return true;
  if (cleanPath === "/certifications") return siteConfig.switches.SHOW_CERTIFICATIONS;
  if (services.some((service) => `/services/${service.slug}` === cleanPath)) return true;
  const projectMatch = cleanPath.match(/^\/projects\/([^/]+)$/);
  if (projectMatch && projects.some((project) => project.slug === projectMatch[1] && project.published === true && !project.isSample)) return true;
  const articleMatch = cleanPath.match(/^\/insights\/([^/]+)$/);
  return Boolean(articleMatch && insightBySlug(articleMatch[1]));
}

export function getSitemapRoutes() {
  return activeRoutes();
}

export function getXmlSitemapRoutes() {
  return activeRoutes().filter((route) => !getPageMeta(route.path).noindex);
}

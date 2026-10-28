import { insights } from "./insights";
import { projects } from "./projects";
import { services } from "./services";
import { fixedRoutes } from "./siteRoutes";

export type SearchCategory = "Pages" | "Projects" | "Articles";
export type SearchResult = { category: SearchCategory; title: string; excerpt: string; href: string; searchableText: string };

const pageDescriptions: Record<string, string> = {
  "/": "Paceefik Engineering construction and engineering solutions in Osogbo, from concept to completion.",
  "/about": "Meet founder Ibrahim Muslihudeen Pacific, project manager, builder, engineering educator, writer, speaker and volunteer.",
  "/about/ibrahim-muslihudeen-pacific": "Founder Ibrahim Muslihudeen Pacific is a project manager, builder, engineering educator, writer, speaker and volunteer.",
  "/services": "Seven services: building construction, structural and concrete works, blockwork, borehole drilling, project supervision and consultancy, geotechnical services and renovation.",
  "/projects": "Project profiles and completed work from Paceefik Engineering.",
  "/insights": "Practical building and engineering guides in plain language.",
  "/request-a-quote": "Share details about a building or engineering project.",
  "/contact": "Contact Paceefik Engineering in Osogbo, Osun State.",
};

function stripMarkdown(text: string) {
  return text.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[*#`]/g, " ").replace(/\s+/g, " ").trim();
}

export function publicSearchIndex(): SearchResult[] {
  const pages: SearchResult[] = fixedRoutes
    .filter((route) => !route.path.startsWith("/thank-you/") && route.path !== "/search" && route.path !== "/sitemap")
    .map((route) => {
      const description = pageDescriptions[route.path] ?? (route.path.startsWith("/services/") ? services.find((item) => `/services/${item.slug}` === route.path)?.overview ?? "" : "");
      return { category: "Pages", title: route.title, excerpt: description, href: route.path, searchableText: `${route.title} ${description}` };
    });
  const servicePages: SearchResult[] = services.map((service) => ({
    category: "Pages",
    title: service.name,
    excerpt: service.cardDescription,
    href: `/services/${service.slug}`,
    searchableText: `${service.name} ${service.cardDescription} ${service.overview} ${service.included.join(" ")}`,
  }));
  const publicProjects: SearchResult[] = projects.filter((project) => project.published === true && !project.isSample).map((project) => ({
    category: "Projects",
    title: project.title,
    excerpt: project.overview,
    href: `/projects/${project.slug}`,
    searchableText: `${project.title} ${project.location} ${project.service} ${project.scope} ${project.overview}`,
  }));
  const articles: SearchResult[] = insights.map((article) => ({
    category: "Articles",
    title: article.title,
    excerpt: article.excerpt,
    href: `/insights/${article.slug}`,
    searchableText: `${article.title} ${article.category} ${article.excerpt} ${stripMarkdown(article.bodyMarkdown)} ${article.keyTakeaways.join(" ")}`,
  }));
  const unique = new Map<string, SearchResult>();
  for (const item of [...pages, ...servicePages, ...publicProjects, ...articles]) unique.set(item.href, item);
  return [...unique.values()];
}

export function searchSiteContent(query: string, category: "All" | SearchCategory = "All") {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return publicSearchIndex().filter((item) => (category === "All" || item.category === category) && terms.every((term) => `${item.title} ${item.searchableText}`.toLowerCase().includes(term)));
}

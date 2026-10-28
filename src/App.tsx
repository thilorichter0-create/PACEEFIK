import { Component, useEffect, useState, lazy, Suspense, type ErrorInfo, type ReactNode } from "react";
import { siteConfig, isFilled, whatsappHrefFor } from "@/config/siteConfig";
import SiteLayout from "@/components/site/SiteLayout";
import HomePage from "@/pages/Home";
import { findProjectSlug } from "@/pages/projects";
import { serviceBySlug } from "@/content/services";
import { projectBySlug } from "@/content/projects";
import { insightBySlug } from "@/content/insights";
import { getPageMeta } from "@/content/siteRoutes";
import { structuredDataForPage } from "@/content/structuredData";

const FounderPage = lazy(() => import("@/pages/company").then((m) => ({ default: m.FounderPage })));
const ServicesHubPage = lazy(() => import("@/pages/services").then((m) => ({ default: m.ServicesHubPage })));
const ServiceDetailPage = lazy(() => import("@/pages/services").then((m) => ({ default: m.ServiceDetailPage })));
const ProjectsPage = lazy(() => import("@/pages/projects").then((m) => ({ default: m.ProjectsPage })));
const ProjectDetailPage = lazy(() => import("@/pages/projects").then((m) => ({ default: m.ProjectDetailPage })));
const QuoteRequestPage = lazy(() => import("@/pages/QuoteRequestPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const InsightsPage = lazy(() => import("@/pages/insights").then((m) => ({ default: m.InsightsPage })));
const InsightArticlePage = lazy(() => import("@/pages/insights").then((m) => ({ default: m.InsightArticlePage })));
const LegalPolicyPage = lazy(() => import("@/pages/utility").then((m) => ({ default: m.LegalPolicyPage })));
const AccessibilityStatementPage = lazy(() => import("@/pages/utility").then((m) => ({ default: m.AccessibilityStatementPage })));
const SitemapPage = lazy(() => import("@/pages/utility").then((m) => ({ default: m.SitemapPage })));
const SearchResultsPage = lazy(() => import("@/pages/utility").then((m) => ({ default: m.SearchResultsPage })));
const ThankYouPage = lazy(() => import("@/pages/utility").then((m) => ({ default: m.ThankYouPage })));
const NotFoundPage = lazy(() => import("@/pages/utility").then((m) => ({ default: m.NotFoundPage })));

class SiteErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error("Paceefik page error", error, info.componentStack); }
  render() {
    if (this.state.failed) {
      const whatsappHref = whatsappHrefFor("Error page");
      return <section className="site-container page-body error-page"><h1>Something went wrong</h1><p>{whatsappHref ? <>Something went wrong on our side. Please refresh the page. If it continues, <a href={whatsappHref} target="_blank" rel="noreferrer">contact us on WhatsApp</a>.</> : "Something went wrong on our side. Please refresh the page. If it continues, contact us through the Contact page."}</p><a className="button button-dark" href="/contact">Contact us</a></section>;
    }
    return this.props.children;
  }
}

type AppProps = { path?: string; includeSamples?: boolean };

function setMeta(attribute: "name" | "property", key: string, value: string | null) {
  const selector = `meta[${attribute}="${key}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!value) { element?.remove(); return; }
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = value;
}

function PageHead({ path, includeSamples }: AppProps) {
  const meta = getPageMeta(path ?? "/", includeSamples);
  const jsonLd = JSON.stringify(structuredDataForPage(path ?? "/")).replace(/</g, "\\u003c");
  useEffect(() => {
    document.title = meta.title;
    setMeta("name", "description", meta.description);
    setMeta("name", "robots", meta.noindex ? "noindex, nofollow" : "index, follow");
    setMeta("property", "og:site_name", siteConfig.companyName);
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:type", path?.startsWith("/insights/") ? "article" : "website");
    setMeta("property", "og:locale", "en_NG");
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);
    const origin = isFilled(siteConfig.publicSiteUrl) ? (() => { try { const value = new URL(siteConfig.publicSiteUrl); return value.protocol === "https:" || value.protocol === "http:" ? value.origin : ""; } catch { return ""; } })() : "";
    const cleanPath = (path ?? "/").split("?")[0].replace(/\/$/, "") || "/";
    const pageUrl = origin ? `${origin}${cleanPath === "/" ? "/" : cleanPath}` : "";
    setMeta("property", "og:url", pageUrl || null);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (pageUrl && !meta.noindex) {
      if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
      canonical.href = pageUrl;
    } else canonical?.remove();
    const image = origin && isFilled(siteConfig.logo.src) ? (() => { try { return new URL(siteConfig.logo.src, origin).toString(); } catch { return ""; } })() : "";
    setMeta("property", "og:image", image || null);
    setMeta("name", "twitter:card", image ? "summary_large_image" : "summary");
    setMeta("name", "twitter:image", image || null);
  }, [path, includeSamples, meta.title, meta.description, meta.noindex]);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />;
}

export default function App({ path, includeSamples = false }: AppProps) {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

  const getCleanPath = (fullPath: string) => {
    let p = fullPath.split("?")[0].replace(/\/$/, "") || "/";
    if (base && p.startsWith(base)) {
      p = p.slice(base.length) || "/";
    }
    return p;
  };

  const [currentPath, setCurrentPath] = useState(() =>
    path ?? (typeof window !== "undefined" ? window.location.pathname + window.location.search : "/")
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname + window.location.search);
      window.scrollTo(0, 0);
    };
    window.addEventListener("popstate", handlePopState);

    const handleAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const rawHref = anchor.getAttribute("href");
      if (!rawHref) return;
      if (
        rawHref.startsWith("http://") ||
        rawHref.startsWith("https://") ||
        rawHref.startsWith("tel:") ||
        rawHref.startsWith("mailto:") ||
        rawHref.startsWith("#") ||
        anchor.target === "_blank"
      ) {
        return;
      }
      e.preventDefault();
      let internalRoute = rawHref;
      if (base && internalRoute.startsWith(base)) {
        internalRoute = internalRoute.slice(base.length) || "/";
      }
      const fullUrl = base ? `${base}${internalRoute === "/" ? "" : internalRoute}` || "/" : internalRoute;
      if (window.location.pathname + window.location.search !== fullUrl) {
        window.history.pushState({}, "", fullUrl);
        setCurrentPath(internalRoute);
        window.scrollTo(0, 0);
      }
    };
    document.addEventListener("click", handleAnchorClick);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, [base]);

  const pathname = getCleanPath(currentPath);
  const projectSlug = findProjectSlug(pathname);
  let pageName = "Home";
  let page: ReactNode;

  if (pathname === "/") { pageName = "Home"; page = <HomePage />; }
  else if (pathname === "/about") { pageName = "Founder"; page = <FounderPage />; }
  else if (pathname === "/about/ibrahim-muslihudeen-pacific") { pageName = "Founder"; page = <FounderPage />; }
  else if (pathname === "/services") { pageName = "Services"; page = <ServicesHubPage />; }
  else if (pathname.startsWith("/services/")) { const service = serviceBySlug(pathname.split("/").at(-1) ?? ""); pageName = service?.name ?? "Service not found"; page = service ? <ServiceDetailPage slug={service.slug} /> : <NotFoundPage />; }
  else if (pathname === "/projects") { pageName = "Projects"; page = <ProjectsPage includeSamples={includeSamples} />; }
  else if (projectSlug) { const project = projectBySlug(projectSlug, includeSamples); pageName = project?.title ?? "Project not found"; page = project ? <ProjectDetailPage includeSamples={includeSamples} slug={projectSlug} /> : <NotFoundPage />; }
  else if (pathname === "/request-a-quote") { pageName = "Request a Quote"; page = <QuoteRequestPage />; }
  else if (pathname === "/contact") { pageName = "Contact"; page = <ContactPage />; }
  else if (pathname === "/insights") { pageName = "Insights"; page = <InsightsPage />; }
  else if (pathname.startsWith("/insights/")) { const slug = pathname.split("/").at(-1) ?? ""; const article = insightBySlug(slug); pageName = article?.title ?? "Article not found"; page = article ? <InsightArticlePage slug={slug} /> : <NotFoundPage />; }
  else if (pathname === "/privacy-policy") { pageName = "Privacy Policy"; page = <LegalPolicyPage type="privacy" />; }
  else if (pathname === "/terms") { pageName = "Terms"; page = <LegalPolicyPage type="terms" />; }
  else if (pathname === "/cookie-policy") { pageName = "Cookie Policy"; page = <LegalPolicyPage type="cookies" />; }
  else if (pathname === "/accessibility") { pageName = "Accessibility Statement"; page = <AccessibilityStatementPage />; }
  else if (pathname === "/sitemap") { pageName = "Sitemap"; page = <SitemapPage />; }
  else if (pathname === "/search") { pageName = "Search results"; page = <SearchResultsPage />; }
  else if (pathname === "/thank-you/quote") { pageName = "Quote request received"; page = <ThankYouPage type="quote" />; }
  else if (pathname === "/thank-you/contact") { pageName = "Message received"; page = <ThankYouPage type="contact" />; }
  else if (pathname === "/thank-you/newsletter") { pageName = "Newsletter request received"; page = <ThankYouPage type="newsletter" />; }
  else if (pathname === "/404") { pageName = "Page not found"; page = <NotFoundPage />; }
  else if (pathname === "/certifications" && siteConfig.switches.SHOW_CERTIFICATIONS) { pageName = "Certifications"; page = <section className="site-container page-body"><h1>Certifications</h1><p>{"{{CERTIFICATION_DOCUMENTS}}"}</p></section>; }
  else { pageName = "Page not found"; page = <NotFoundPage />; }

  return (
    <SiteErrorBoundary>
      <PageHead path={pathname} includeSamples={includeSamples} />
      <SiteLayout pageName={pageName}>
        <Suspense
          fallback={
            <div className="site-container page-body" style={{ minHeight: "45vh", display: "grid", placeItems: "center" }}>
              <p className="eyebrow" style={{ opacity: 0.7 }}>Loading...</p>
            </div>
          }
        >
          {page}
        </Suspense>
      </SiteLayout>
    </SiteErrorBoundary>
  );
}

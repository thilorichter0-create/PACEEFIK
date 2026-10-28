import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Check, Search } from "lucide-react";
import { siteConfig, whatsappHrefFor } from "@/config/siteConfig";
import { getSitemapRoutes } from "@/content/siteRoutes";
import { searchSiteContent, type SearchCategory } from "@/content/searchIndex";
import { legalPolicies } from "@/content/legal";

type LegalType = "privacy" | "terms" | "cookies";
type SearchTab = "All" | SearchCategory;
type ConfirmationKind = "quote" | "contact" | "newsletter";
type ConfirmationState = { status: "checking" | "confirmed" | "unconfirmed" | "inactive"; reference: string; name: string };

export function LegalPolicyPage({ type }: { type: LegalType }) {
  const policy = legalPolicies[type];
  const isInternalDraftText = (text: string) => {
    const lower = text.toLowerCase();
    return text.includes("{{") || [
      "this draft", "must be checked", "must be confirmed", "must be supplied",
      "confirm the exact", "confirm each provider", "add the approved",
      "insert approved", "before launch", "before this policy is approved",
      "requires nigerian legal review", "current site has no analytics provider configured",
      "the company’s role in deciding", "the current cookie-preference control"
    ].some((phrase) => lower.includes(phrase));
  };
  const visibleSections = policy.sections.map((section) => ({
    ...section,
    paragraphs: (section.paragraphs ?? []).filter((paragraph) => !isInternalDraftText(paragraph)),
    bullets: (section.bullets ?? []).filter((item) => !isInternalDraftText(item)),
  })).filter((section) => section.paragraphs.length > 0 || section.bullets.length > 0);
  const visibleCookieRows = (policy.cookieRows ?? []).filter((row) => !Object.values(row).some((value) => value.includes("{{")));
  return <>
    <section className="inner-hero legal-hero">
      <div className="site-container inner-hero-content">
        <p className="eyebrow">Legal information</p>
        <h1>{policy.title}</h1>
        <p className="hero-summary">{policy.intro}</p>
      </div>
    </section>
    <div className="site-container page-body legal-policy">
      {visibleSections.map((section) => <section className="legal-section" key={section.heading}>
        <h2>{section.heading}</h2>
        {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {section.bullets.length > 0 && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
      </section>)}
      {type === "cookies" && visibleCookieRows.length > 0 && <div className="legal-cookie-table-wrap">
        <table className="legal-cookie-table">
          <caption>Browser storage and cookies</caption>
          <thead><tr><th scope="col">Name</th><th scope="col">Purpose</th><th scope="col">Duration</th><th scope="col">Type</th></tr></thead>
          <tbody>{visibleCookieRows.map((row) => <tr key={row.name}><th scope="row">{row.name}</th><td>{row.purpose}</td><td>{row.duration}</td><td>{row.type}</td></tr>)}</tbody>
        </table>
      </div>}
      {type === "cookies" && <button className="button button-dark" type="button" onClick={() => window.dispatchEvent(new CustomEvent("paceefik:cookie-settings"))}>Change cookie settings</button>}
    </div>
  </>;
}

export function AccessibilityStatementPage() {
  return <>
    <section className="inner-hero"><div className="site-container inner-hero-content"><p className="eyebrow">Access for everyone</p><h1>Accessibility Statement</h1></div></section>
    <div className="site-container page-body"><p>We aim to make this website accessible and usable across devices. If you encounter an accessibility barrier, please <a className="text-link" href="/contact">contact us</a> and describe the issue.</p></div>
  </>;
}

export function SitemapPage() {
  const routes = getSitemapRoutes();
  return <>
    <section className="inner-hero"><div className="site-container inner-hero-content"><p className="eyebrow">Browse</p><h1>Sitemap</h1><p className="hero-summary">Explore the pages available on this site.</p></div></section>
    <div className="site-container page-body sitemap-page"><ul>{routes.map((route) => <li key={route.path}><a href={route.path}>{route.title}</a></li>)}</ul></div>
  </>;
}

export function SearchResultsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<SearchTab>("All");
  useEffect(() => { setQuery(new URLSearchParams(window.location.search).get("q")?.trim() ?? ""); }, []);
  const results = searchSiteContent(query, category === "All" ? "All" : category);
  const tabs: SearchTab[] = ["All", "Pages", "Projects", "Articles"];
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.assign(`/search?q=${encodeURIComponent(query.trim())}`);
  };
  return <>
    <section className="inner-hero"><div className="site-container inner-hero-content"><p className="eyebrow">Search</p><h1>Results for "{query}"</h1><p className="hero-summary" aria-live="polite">{results.length} {results.length === 1 ? "result" : "results"}</p></div></section>
    <div className="site-container page-body search-results-page">
      <form className="results-search" onSubmit={submit}><label className="sr-only" htmlFor="results-search-input">Search services, projects and guides</label><Search size={18} aria-hidden="true"/><input id="results-search-input" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search services, projects and guides"/><button className="button button-dark" type="submit">Search</button></form>
      <div className="search-tabs" role="group" aria-label="Filter search results">{tabs.map((tab) => <button key={tab} type="button" aria-pressed={category === tab} className={category === tab ? "is-active" : ""} onClick={() => setCategory(tab)}>{tab}</button>)}</div>
      {results.length ? <div className="search-results-list">{results.map((result) => <article className="search-result-card" key={result.href}><p className="eyebrow">{result.category}</p><h2><a href={result.href}>{result.title}</a></h2><p>{result.excerpt}</p><a className="text-link" href={result.href}>Read more <ArrowRight size={15} aria-hidden="true"/></a></article>)}</div> : <section className="empty-state"><h2>We could not find anything for "{query}".</h2><p>Try: quote, borehole, renovation, contact.</p><a className="button button-dark" href="/services">Browse Services</a></section>}
    </div>
  </>;
}

export function NotFoundPage() {
  const whatsappHref = whatsappHrefFor("404 page");
  return <>
    <section className="inner-hero"><div className="site-container inner-hero-content"><p className="eyebrow">404</p><h1>We cannot find that page.</h1><p className="hero-summary">It may have moved, or the link may be wrong.</p></div></section>
    <div className="site-container page-body not-found-page"><nav aria-label="Helpful pages"><a href="/">Home</a><a href="/services">Services</a><a href="/projects">Projects</a><a href="/request-a-quote">Request a Quote</a><a href="/contact">Contact</a><a href="/insights">Insights</a></nav><p>{whatsappHref ? <>Still stuck? <a href={whatsappHref} target="_blank" rel="noreferrer">Chat with us on WhatsApp</a></> : <>Still stuck? Use our <a href="/contact">Contact page</a> for available contact options.</>}</p></div>
  </>;
}

export function ThankYouPage({ type }: { type: ConfirmationKind }) {
  const [confirmation, setConfirmation] = useState<ConfirmationState>({ status: "checking", reference: "", name: "" });
  useEffect(() => {
    if (type === "newsletter" && !siteConfig.switches.newsletter) {
      setConfirmation({ status: "inactive", reference: "", name: "" });
      return;
    }
    try {
      const raw = sessionStorage.getItem("paceefik:form-confirmation");
      const saved = raw ? JSON.parse(raw) as { kind?: string; reference?: string; name?: string } : null;
      const validReference = typeof saved?.reference === "string" && /^PE-[A-F0-9]{10}$/.test(saved.reference);
      if (saved?.kind === type && validReference) {
        sessionStorage.removeItem("paceefik:form-confirmation");
        setConfirmation({ status: "confirmed", reference: saved.reference as string, name: typeof saved.name === "string" ? saved.name : "" });
      } else {
        setConfirmation({ status: "unconfirmed", reference: "", name: "" });
      }
    } catch {
      setConfirmation({ status: "unconfirmed", reference: "", name: "" });
    }
  }, [type]);

  const isConfirmed = confirmation.status === "confirmed";
  const unavailable = confirmation.status === "inactive" || confirmation.status === "unconfirmed";
  const heading = type === "quote" ? (confirmation.name ? `Thank you, ${confirmation.name}.` : "Thank you for your enquiry.") : type === "contact" ? (confirmation.name ? `Thank you, ${confirmation.name}.` : "Thank you for your message.") : "Thank you for signing up.";
  const promise = type === "quote" ? "Your request has been received. A member of our team will contact you about your enquiry." : type === "contact" ? "We have your message and will get back to you." : "Your newsletter request has been received.";
  const links = type === "quote" ? [{ label: "View Our Projects", href: "/projects" }, { label: "Return to Home", href: "/" }] : type === "contact" ? [{ label: "View Services", href: "/services" }, { label: "Request a Quote", href: "/request-a-quote" }] : [{ label: "Read Insights", href: "/insights" }, { label: "Return to Home", href: "/" }];
  const fallbackLinks = type === "quote" ? [{ label: "Request a Quote", href: "/request-a-quote" }, { label: "Contact Us", href: "/contact" }] : [{ label: "Contact Us", href: "/contact" }, { label: "Explore Services", href: "/services" }];
  return <>
    <section className="inner-hero"><div className="site-container inner-hero-content"><p className="eyebrow">Paceefik Engineering</p><h1>{isConfirmed ? heading : confirmation.status === "checking" ? "Checking your request" : confirmation.status === "inactive" ? "Newsletter sign-up is not active." : "Submission not confirmed."}</h1><p className="hero-summary">{isConfirmed ? promise : confirmation.status === "checking" ? "Please wait while we check the submission status." : confirmation.status === "inactive" ? "Newsletter sign-up is not active yet." : "No confirmed submission was found on this device. Return to the form if you still need help."}</p></div></section>
    <div className="site-container page-body thank-you-page">
      {isConfirmed ? <><span className="success-mark" aria-hidden="true"><Check size={28}/></span><p>Reference number: <strong>{confirmation.reference}</strong>.</p>{type === "quote" && <><h2>Next steps</h2><ol><li>We review your details.</li><li>We call to understand your project.</li><li>We arrange a site visit if needed.</li></ol></>}</> : unavailable && <p className="draft-note">A confirmation is shown only after the submission has been saved and the team has a working way to receive it.</p>}
      <nav aria-label="Useful next pages">{(isConfirmed ? links : fallbackLinks).map((link) => <a className="button button-dark" key={link.href} href={link.href}>{link.label}<ArrowRight size={16} aria-hidden="true"/></a>)}</nav>
    </div>
  </>;
}

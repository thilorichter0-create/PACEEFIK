import { FormEvent, useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { services } from "@/content/services";
import { insights } from "@/content/insights";
import { useDialogFocus } from "./useDialogFocus";

type Props = { open: boolean; onClose: () => void };
type SearchItem = { label: string; href: string; terms: string };

const pages: SearchItem[] = [
  { label: "Founder", href: "/about", terms: "founder Ibrahim engineer" },
  { label: "Projects", href: "/projects", terms: "projects work portfolio" },
  { label: "Insights", href: "/insights", terms: "insights guides advice articles" },
  { label: "Request a Quote", href: "/request-a-quote", terms: "quote project estimate" },
  { label: "Contact", href: "/contact", terms: "contact phone email WhatsApp" },
];
const popularSlugs = ["building-construction", "borehole-drilling", "geotechnical-services", "renovation"];

export default function SearchOverlay({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useDialogFocus<HTMLElement>(open);
  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    const all: SearchItem[] = [
      ...services.map((service) => ({ label: service.name, href: `/services/${service.slug}`, terms: `${service.name} ${service.overview}` })),
      ...insights.map((article) => ({ label: article.title, href: `/insights/${article.slug}`, terms: `${article.category} ${article.excerpt} ${article.bodyMarkdown}` })),
      ...pages,
    ];
    if (!q) return popularSlugs.map((slug) => {
      const service = services.find((entry) => entry.slug === slug)!;
      return { label: service.name, href: `/services/${service.slug}`, terms: service.name };
    });
    return all.filter((item) => `${item.label} ${item.terms}`.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = query.trim();
    if (value) window.location.assign(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <div className="overlay-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="search-panel" ref={inputRef} role="dialog" aria-modal="true" aria-labelledby="search-heading" aria-describedby="search-help" tabIndex={-1}>
        <div className="search-panel-top">
          <h2 id="search-heading">Search</h2>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close search"><X size={20} aria-hidden="true" /></button>
        </div>
        <p id="search-help" className="sr-only">Search services, projects and guides. Press Escape to close.</p>
        <form className="search-input-wrap" onSubmit={submit}>
          <Search size={18} aria-hidden="true" />
          <label className="sr-only" htmlFor="site-search-input">Search services, projects and guides</label>
          <input ref={(node) => { if (node) node.dataset.dialogInitialFocus = "true"; }} id="site-search-input" type="search" placeholder="Search services, projects and guides" value={query} onChange={(event) => setQuery(event.target.value)} />
          <button className="search-submit" type="submit" aria-label="Search">Search</button>
        </form>
        <h3 className="search-suggestions-heading">{query.trim() ? "Matching pages" : "Popular searches"}</h3>
        {suggestions.length ? (
          <ul className="search-suggestions">
            {suggestions.map((item) => <li key={item.href}><a href={item.href} onClick={onClose}>{item.label}<span aria-hidden="true">↗</span></a></li>)}
          </ul>
        ) : (
          <div><p className="search-empty">We could not find anything for “{query}”.</p><button className="button button-outline" type="button" onClick={() => window.location.assign(`/search?q=${encodeURIComponent(query.trim())}`)}>View search results</button></div>
        )}
      </section>
    </div>
  );
}

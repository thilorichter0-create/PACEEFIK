import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ArrowRight, Check, Copy, Search } from "lucide-react";
import { insightBySlug, insights, readMinutes, type InsightRecord } from "@/content/insights";
import { services } from "@/content/services";

type Props = { slug?: string };
type Category = "All" | "Guides" | "Structural Basics" | "Project Notes" | "Company News";
const categories: Category[] = ["All", "Guides", "Structural Basics", "Project Notes", "Company News"];

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const tokenPattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\(https?:\/\/[^)\s]+\))/g;
  const result: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(tokenPattern)) {
    const value = match[0];
    const index = match.index ?? 0;
    if (index > last) result.push(text.slice(last, index));
    if (value.startsWith("**")) result.push(<strong key={`${keyPrefix}-${index}`}>{value.slice(2, -2)}</strong>);
    else {
      const parsed = value.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/);
      if (parsed) result.push(<a key={`${keyPrefix}-${index}`} href={parsed[2]} target="_blank" rel="noreferrer">{parsed[1]}</a>);
      else result.push(value);
    }
    last = index + value.length;
  }
  if (last < text.length) result.push(text.slice(last));
  return result;
}

function renderArticleBody(markdown: string) {
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let index = 0;
  const flush = () => {
    const value = paragraph.join(" ").trim();
    if (value) blocks.push(<p key={`p-${index++}`}>{renderInline(value, `inline-${index}`)}</p>);
    paragraph = [];
  };
  for (const line of markdown.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) { flush(); continue; }
    const heading = trimmed.match(/^(#{2,3})\s+(.+)$/);
    if (heading) {
      flush();
      const content = renderInline(heading[2], `heading-${index}`);
      if (heading[1].length === 2) blocks.push(<h2 key={`h2-${index++}`}>{content}</h2>);
      else blocks.push(<h3 key={`h3-${index++}`}>{content}</h3>);
      continue;
    }
    paragraph.push(trimmed);
  }
  flush();
  return blocks;
}

function insightImage(serviceSlug: string) {
  const imageByService: Record<string, number> = {
    "building-construction": 52,
    "structural-and-concrete-works": 22,
    "blockwork": 57,
    "borehole-drilling": 58,
    "project-supervision-and-consultancy": 14,
    "geotechnical-services": 18,
    "renovation": 55,
  };
  return `/images/paceefik/image${imageByService[serviceSlug] ?? 52}.webp`;
}

function InsightCard({ article }: { article: InsightRecord }) {
  const minutes = readMinutes(article);
  return <article className="insight-card"><a className="insight-card-image" href={`/insights/${article.slug}`} tabIndex={-1} aria-hidden="true"><img src={insightImage(article.serviceSlug)} alt="" loading="lazy" decoding="async" /></a><div className="insight-card-meta"><span>{article.category}</span>{!article.date.includes("{{") && <span>{article.date}</span>}<span>{minutes} min read</span></div><h2><a href={`/insights/${article.slug}`}>{article.title}</a></h2><p>{article.excerpt}</p><p className="insight-author">By {article.author}</p><a className="text-link" href={`/insights/${article.slug}`}>Read the guide <ArrowRight size={15}/></a></article>;
}

export function InsightsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q")?.trim() ?? "");
  }, []);
  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return insights.filter((article) => (category === "All" || article.category === category) && (!search || `${article.title} ${article.category} ${article.excerpt} ${article.bodyMarkdown}`.toLowerCase().includes(search)));
  }, [query, category]);
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = query.trim();
    window.location.assign(value ? `/insights?q=${encodeURIComponent(value)}` : "/insights");
  };
  return <><section className="inner-hero insights-hero"><div className="site-container inner-hero-content"><p className="eyebrow">Insights</p><h1>Practical advice from people who build</h1><p className="hero-summary">Straight answers on building, structure, soil and borehole drilling. No jargon.</p></div></section><div className="site-container page-body insights-index">
    <form className="article-search" onSubmit={submit}><label className="sr-only" htmlFor="article-search-input">Search articles</label><Search size={18} aria-hidden="true"/><input id="article-search-input" type="search" placeholder="Search articles" value={query} onChange={(event) => setQuery(event.target.value)}/><button className="button button-dark" type="submit">Search</button></form>
    <div className="insight-categories" role="tablist" aria-label="Article categories">{categories.slice(1).map((item) => <button key={item} type="button" role="tab" aria-selected={category === item} className={category === item ? "is-active" : ""} onClick={() => setCategory(category === item ? "All" : item)}>{item}</button>)}</div>
    <div className="insight-list-heading"><div><p className="eyebrow">Construction knowledge</p><h2>Guides and practical notes</h2></div><span>{filtered.length} {filtered.length === 1 ? "article" : "articles"}</span></div>
    {filtered.length ? <div className="insight-grid">{filtered.map((article) => <InsightCard key={article.slug} article={article}/>)}</div> : <div className="empty-state"><h2>No articles match that search</h2><p>Try a different search or choose another category.</p><button className="button button-outline" type="button" onClick={() => { setCategory("All"); setQuery(""); }}>Clear filters</button></div>}
  </div></>;
}

function ShareLinks({ title }: { title: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => setUrl(window.location.href), []);
  const shareText = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const copy = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      const field = document.createElement("textarea");
      field.value = url;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      const ok = document.execCommand("copy");
      field.remove();
      setCopied(ok);
      window.setTimeout(() => setCopied(false), 2200);
    }
  };
  return <div className="article-share"><span>Share</span><a href={`https://wa.me/?text=${shareText}%20${encodedUrl}`} target="_blank" rel="noreferrer" aria-label="Share on WhatsApp">WhatsApp</a><a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noreferrer" aria-label="Share on LinkedIn">LinkedIn</a><a href={`https://x.com/intent/post?text=${shareText}&url=${encodedUrl}`} target="_blank" rel="noreferrer" aria-label="Share on X">X</a><a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noreferrer" aria-label="Share on Facebook">Facebook</a><button type="button" onClick={() => void copy()}><Copy size={14}/>{copied ? "Link copied" : "Copy link"}</button><span className="sr-only" aria-live="polite">{copied ? "Link copied to clipboard" : ""}</span></div>;
}

export function InsightArticlePage({ slug = "" }: Props) {
  const article = insightBySlug(slug);
  if (!article) return <section className="site-container page-body"><h1>Article not found</h1><p>This article is not available.</p><a className="button button-dark" href="/insights">Read Insights</a></section>;
  const service = services.find((item) => item.slug === article.serviceSlug);
  const related = article.relatedSlugs.map((relatedSlug) => insightBySlug(relatedSlug)).filter((item): item is InsightRecord => Boolean(item)).slice(0, 3);
  const minutes = readMinutes(article);
  const articleBlocks = renderArticleBody(article.bodyMarkdown);
  const midPoint = Math.ceil(articleBlocks.length / 2);
  return <><section className="inner-hero article-hero"><div className="site-container inner-hero-content"><p className="eyebrow"><a href="/insights">Insights</a> · {article.category}</p><h1>{article.title}</h1><div className="article-byline"><span>By {article.author}</span>{!article.date.includes("{{") && <span>{article.date}</span>}<span>{minutes} min read</span></div></div></section><div className="site-container page-body article-layout">
    <aside className="takeaways-box"><h2>Key takeaways</h2><ul>{article.keyTakeaways.map((item) => <li key={item}>{item}</li>)}</ul></aside>
    <article className="article-content"><figure className="article-feature-image"><img src={insightImage(article.serviceSlug)} alt={`Construction photograph related to ${article.title}`} loading="eager" decoding="async" /></figure>{articleBlocks.slice(0, midPoint)}
      <aside className="article-mid-cta"><p className="eyebrow">Project-specific guidance</p><h2>Talk to an expert.</h2><a className="button button-dark" href="/request-a-quote">Book a call <ArrowRight size={16}/></a></aside>
      {articleBlocks.slice(midPoint)}
      <section className="article-source-list"><h2>Sources and further reading</h2><ul>{article.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a></li>)}</ul></section>
    </article>
    <section className="author-box"><div className="author-mark" aria-hidden="true">IP</div><div><p className="eyebrow">About the author</p><h2>{article.author}</h2><p>Founder and lead of Paceefik Engineering Services Limited. His roles include project manager, builder, engineering educator, writer, speaker and volunteer.</p><a className="text-link" href="/about/ibrahim-muslihudeen-pacific">Meet the founder <ArrowRight size={15}/></a></div></section>
    {service && <section className="article-end-banner"><div><p className="eyebrow">Paceefik Engineering</p><h2>Planning a {service.name.toLowerCase()}? See how we can help.</h2></div><a className="button button-light" href={`/services/${service.slug}`}>See how we can help <ArrowRight size={16}/></a></section>}
    <section className="article-faq content-section"><p className="eyebrow">More answers</p><h2>Frequently asked questions</h2><div className="article-faq-list">{article.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>
    {related.length > 0 && <section className="related-articles content-section"><p className="eyebrow">Keep learning</p><h2>Related articles</h2><div className="insight-grid">{related.map((item) => <InsightCard key={item.slug} article={item}/>)}</div></section>}
    <ShareLinks title={article.title}/>
  </div></>;
}

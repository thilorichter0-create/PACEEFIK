import { ArrowRight, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { services } from "@/content/services";
import { howWeWorkStages } from "@/content/howWeWork";
import { insights, readMinutes } from "@/content/insights";
import { servicePreviewImage, paceefikImageUrl } from "@/content/serviceImages";

const values = ["Trust", "Integrity", "Attention to detail", "Quality", "Practical engineering"];
const promises = [
  "We listen first",
  "You get one point of contact",
  "We tell you about problems early",
  "Changes are agreed in writing before work starts",
];

export default function HomePage() {
  return <>
    <section className="home-hero home-hero-reference">
      <div className="home-hero-media" aria-hidden="true">
        <img className="home-hero-photo" src={paceefikImageUrl(52)} alt="" fetchPriority="high" decoding="async" />
      </div>
      <div className="site-container home-hero-content">
        <p className="eyebrow">{siteConfig.baseLocation}</p>
        <h1>From concept to completion.</h1>
        <p className="home-tagline">{siteConfig.tagline}</p>
        <div className="page-cta-row">
          <a className="button button-light" href="/request-a-quote">Request a Quote <ArrowRight size={16} aria-hidden="true" /></a>
          <a className="button button-outline-light" href="/projects">View Our Projects <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </div>
      <span className="home-hero-scroll" aria-hidden="true">Scroll to explore</span>
    </section>

    <section className="home-intro-band content-section">
      <div className="site-container home-intro-inner">
        <div className="home-intro-heading"><p className="eyebrow">What we stand for</p><span aria-hidden="true">01 / 04</span></div>
        <div className="home-values-copy">
          <h2>Practical engineering, with care.</h2>
          <p>Paceefik Engineering Services Limited delivers building construction and engineering services from Osogbo. We bring in-house design capability, practical engineering, care and clear communication to your project.</p>
          <p>We listen first, pay attention to detail and speak plainly about the work. We aim to provide good service within your budget, without promising a fixed price or deadline before the scope is agreed.</p>
          <a className="text-link" href="/about">Meet the Founder <ArrowRight size={15} aria-hidden="true" /></a>
        </div>
        <div className="home-values-list">{values.map((value, index) => <div key={value}><span aria-hidden="true">0{index + 1}</span><h3>{value}</h3></div>)}</div>
      </div>
    </section>

    <section className="home-services content-section">
      <div className="site-container">
        <div className="home-section-heading">
          <div><p className="eyebrow">What we do</p><h2>Building and engineering services</h2></div>
          <p>We offer seven services for building projects. Tell us what you plan to build, where it is and what information you have.</p>
        </div>
        <div className="home-service-grid">{services.map((service, index) => <a className="home-service-card" href={`/services/${service.slug}`} key={service.slug}>
          <span className="home-service-number" aria-hidden="true">0{index + 1}</span>
          <span className="home-service-visual"><img src={servicePreviewImage(service.slug)} alt={`${service.name} project photograph`} loading="lazy" decoding="async" /></span>
          <h3>{service.name}</h3><p>{service.cardDescription}</p>
          <span className="home-service-link">Explore service <ArrowRight size={15} aria-hidden="true" /></span>
        </a>)}</div>
        <a className="text-link home-all-services" href="/services">Explore all services <ArrowRight size={15} aria-hidden="true" /></a>
      </div>
    </section>

    <section className="home-design-band">
      <div className="site-container home-design-inner">
        <div><p className="eyebrow">From concept to completion</p><h2>In-house design capability</h2><p>The company has in-house design capability. Share your brief and available information so we can discuss what your project needs.</p></div>
        <a className="button button-light" href="/request-a-quote">Tell us about your project <ArrowRight size={16} aria-hidden="true" /></a>
      </div>
    </section>

    <section className="home-approach-band content-section">
      <div className="site-container home-approach-inner">
        <div className="home-approach-copy"><p className="eyebrow">How we work</p><h2>Clear stages. One point of contact.</h2><p>A clear process keeps the brief, decisions and expectations aligned from the first conversation through delivery.</p><a className="text-link" href="/about">See how we work <ArrowRight size={15} aria-hidden="true" /></a></div>
        <ol className="home-stage-list">{howWeWorkStages.map((stage, index) => <li key={stage.title}><span aria-hidden="true">0{index + 1}</span><strong>{stage.title}</strong><ArrowRight size={15} aria-hidden="true" /></li>)}</ol>
      </div>
    </section>

    <section className="home-project-feature">
      <div className="site-container home-project-inner">
        <div className="home-project-art">
          <img src={paceefikImageUrl(62, true)} alt="Paceefik residential building project" loading="lazy" decoding="async" />
          <span>Selected project work</span>
        </div>
        <div className="home-project-copy"><p className="eyebrow">Projects</p><h2>Our project portfolio</h2><p className="home-project-claim">100+ projects completed</p><p>Explore our projects and see the work as verified project details and approved photographs are added.</p><a className="button button-dark" href="/projects">View Our Projects <ArrowRight size={16} aria-hidden="true" /></a></div>
      </div>
    </section>

    <section className="home-founder-band content-section">
      <div className="site-container home-founder-inner">
        <div className="home-founder-photo"><img src={paceefikImageUrl(10, true)} alt={`Portrait of ${siteConfig.founderName}`} loading="lazy" decoding="async" /></div>
        <div className="home-founder-copy"><p className="eyebrow">Founder and lead</p><h2>{siteConfig.founderName}</h2><p>Project manager, builder, engineering educator, writer, speaker and volunteer. His own words: “I Build! I Train! I write! I Teach! I Speak! I Volunteer!”</p><a className="text-link" href="/about">Meet the founder <ArrowRight size={15} aria-hidden="true" /></a></div>
      </div>
    </section>

    <section className="home-promises-band">
      <div className="site-container home-promises-inner">
        <div className="home-promises-heading"><p className="eyebrow">How we work with you</p><h2>Trust is built in the details.</h2></div>
        <ul>{promises.map((promise) => <li key={promise}><span aria-hidden="true">✓</span>{promise}</li>)}</ul>
        <a className="button button-light" href="/request-a-quote">Request a Quote <ArrowRight size={16} aria-hidden="true" /></a>
      </div>
    </section>

    <section className="home-insights-band content-section">
      <div className="site-container">
        <div className="home-section-heading home-insights-heading"><div><p className="eyebrow">Insights</p><h2>Practical advice in plain language</h2></div><a className="text-link" href="/insights">Read all insights <ArrowRight size={15} aria-hidden="true" /></a></div>
        <div className="home-insight-grid">{insights.slice(0, 3).map((article, index) => <article className="home-insight-card" key={article.slug}>
          <span className="home-insight-number" aria-hidden="true">0{index + 1}</span>
          <div className="insight-card-meta"><span>{article.category}</span>{!article.date.includes("{{") && <span>{article.date}</span>}<span>{readMinutes(article)} min read</span></div>
          <h3><a href={`/insights/${article.slug}`}>{article.title}</a></h3><p>{article.excerpt}</p><p className="insight-author">By {article.author}</p><a className="text-link" href={`/insights/${article.slug}`}>Read the guide <ArrowRight size={15} aria-hidden="true" /></a>
        </article>)}</div>
      </div>
    </section>
  </>;
}

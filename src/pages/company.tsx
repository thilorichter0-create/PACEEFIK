import { ArrowRight, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export function FounderPage() {
  return <>
    <section className="inner-hero founder-hero"><div className="site-container inner-hero-content"><p className="eyebrow">Founder and lead</p><h1>The engineer behind the projects</h1><p className="founder-intro">{siteConfig.founderName} leads Paceefik Engineering Services Limited. His own words: <strong>“I Build! I Train! I write! I Teach! I Speak! I Volunteer!”</strong></p></div></section>
    <div className="site-container page-body founder-layout">
      <figure className="founder-photo-placeholder"><img className="founder-portrait" src="/images/paceefik/image10.webp" alt={`Portrait of ${siteConfig.founderName}`} /><figcaption>{siteConfig.founderName}, Founder</figcaption></figure>
      <div className="founder-copy"><p className="eyebrow">A practical voice in engineering</p><h2>Projects, learning and clear communication</h2><p>Ibrahim Muslihudeen Pacific leads Paceefik Engineering Services Limited. He works across project management and building, and is also an engineering educator, writer, speaker and volunteer. He describes his work in his own words: “I Build! I Train! I write! I Teach! I Speak! I Volunteer!”</p>
        <section className="founder-insights-callout"><p className="eyebrow">Plain language, practical ideas</p><h3>He explains engineering in plain language.</h3><a className="text-link" href="/insights">Read Insights <ArrowRight size={15} aria-hidden="true" /></a></section>
        <div className="page-cta-row"><a className="button button-dark" href="/contact">Work with us <ArrowRight size={16} aria-hidden="true" /></a><a className="button button-outline" href="/request-a-quote">Request a Quote <ArrowUpRight size={16} aria-hidden="true" /></a></div>
      </div>
    </div>
  </>;
}

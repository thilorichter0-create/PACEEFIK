import { ArrowRight, ArrowUpRight, Check, Minus } from "lucide-react";
import FAQList from "@/components/site/FAQList";
import { services, servicesIntro, serviceBySlug } from "@/content/services";
import { projectsForView } from "@/content/projects";
import { siteConfig, whatsappHrefFor } from "@/config/siteConfig";
import { ProjectGallery } from "@/components/site/ProjectGallery";
import { servicePreviewImage } from "@/content/serviceImages";

type ServiceProps = { slug?: string };

const commonFaqs = [
  { question: "Do you take small projects?", answer: "Tell us what you have in mind. We can discuss the scope and confirm whether it is a fit for our work." },
  { question: "Do you only work in Osogbo?", answer: "We are based in Osogbo. Tell us your location and we will confirm if we can serve it." },
  { question: "Can you build from my architect’s drawings?", answer: "Share the drawings. We can review the information provided and discuss the project scope with you." },
  { question: "Do you offer a warranty?", answer: "Contact us to discuss. Terms are agreed in your contract." },
  { question: "How do I get a price?", answer: "Contact us to discuss. Terms are agreed in your contract." },
];

export function ServicesHubPage() {
  return <>
    <section className="inner-hero">
      <div className="site-container inner-hero-content">
        <p className="eyebrow">Our services</p>
        <h1>What we do</h1>
        <p className="hero-banner">From foundations to finishing, one team from brief to handover.</p>
        <p className="hero-summary">{servicesIntro}</p>
      </div>
    </section>
    <div className="site-container page-body">
      <section className="service-helper content-section" aria-label="Service advice">
        <div><p className="eyebrow">Not sure where to start?</p><p>Not sure which service you need? Tell us about your project.</p></div>
        <a className="button button-dark" href="/contact">Get advice <ArrowRight size={16} aria-hidden="true" /></a>
      </section>
      <section className="service-card-grid content-section" aria-label="Seven services">
        {services.map((service, index) => <article className="service-hub-card" key={service.slug}>
          <span className="card-index" aria-hidden="true">0{index + 1}</span>
          <img className="service-hub-image" src={servicePreviewImage(service.slug)} alt={`${service.name} project photograph`} loading="lazy" decoding="async" />
          <h2>{service.name}</h2>
          <p>{service.cardDescription}</p>
          <a className="text-link" href={`/services/${service.slug}`}>Explore this service <ArrowRight size={15} aria-hidden="true" /></a>
        </article>)}
      </section>
      <section className="design-capability-panel content-section">
        <p className="eyebrow">A connected approach</p>
        <h2>Design and build under one team</h2>
        <p>We have in-house design capability. You get one point of contact to discuss how design and building work fit your project.</p>
        <a className="button button-dark" href="/request-a-quote">Request a Quote <ArrowUpRight size={16} aria-hidden="true" /></a>
      </section>
      <FAQList faqs={commonFaqs} heading="Common questions" />
    </div>
  </>;
}

export function ServiceDetailPage({ slug = "" }: ServiceProps) {
  const service = serviceBySlug(slug);
  if (!service) return <section className="site-container page-body"><h1>Service not found</h1><a className="button button-dark" href="/services">View Our Services</a></section>;
  const relatedProjects = projectsForView(false).filter((project) => project.service === service.name);
  const serviceSummaries: Record<string, string> = {
    "building-construction": "Building construction brings the planned building together through coordinated site work, materials and finishing. Share your project location, drawings if available, and the type of building you have in mind so the team can discuss the scope.",
    "structural-and-concrete-works": "Structural and concrete works involve the building elements and concrete activities defined for a project. The design and agreed project scope determine the required work. Share available drawings and site details to start the conversation.",
    "blockwork": "Blockwork forms walls and other masonry elements according to the project design. The required block type, dimensions, openings and finishes depend on the approved drawings and agreed scope.",
    "borehole-drilling": "Borehole drilling requires an understanding of the site, intended use and ground conditions. Share the location and what you need the borehole for so the team can discuss the project requirements.",
    "project-supervision-and-consultancy": "Project supervision and consultancy support clear communication and attention to work on site. Share the project stage, location and the specific guidance or oversight you are looking for.",
    "geotechnical-services": "Geotechnical work helps inform decisions about ground conditions and foundations. The appropriate investigation depends on the site and project. Share the location and available project information to discuss the next step.",
    "renovation": "Renovation can involve improving existing spaces or carrying out defined repair and finishing work. Share photographs of the property, its location and the changes you want to make so the scope can be discussed.",
  };
  const includedItems = service.included.filter((item) => !item.includes("{{"));
  const excludedItems = service.excluded.filter((item) => !item.includes("{{"));
  const publicFaqs = service.faqs.filter((item) => !item.question.includes("{{") && !item.answer.includes("{{"));
  const quoteUrl = `/request-a-quote?service=${encodeURIComponent(service.name)}`;
  const whatsappUrl = whatsappHrefFor(service.name, `Hello Paceefik Engineering. I would like to enquire about ${service.name}. (Sent from: ${service.name})`);
  return <>
    <section className="inner-hero service-detail-hero">
      <div className="site-container inner-hero-content">
        <p className="eyebrow"><a href="/services">Services</a> / {service.name}</p>
        <h1>{service.name}</h1>
        <p className="hero-summary">{service.cardDescription}</p>
      </div>
    </section>
    <div className="service-sticky-quote"><div className="site-container sticky-quote-inner"><span>Considering {service.name.toLowerCase()}?</span><a href={quoteUrl}>Get a quote for this service <ArrowUpRight size={15} aria-hidden="true" /></a></div></div>
    <div className="site-container page-body">
      <section className="service-overview content-section">
        <div><p className="eyebrow">Overview</p><h2>{service.name}</h2></div>
        <div className="service-copy"><p>{serviceSummaries[service.slug] ?? service.cardDescription}</p><a className="button button-dark" href={quoteUrl}>Request a Quote <ArrowRight size={16} aria-hidden="true" /></a></div>
      </section>
      <ProjectGallery initialService={service.slug} />
      {(includedItems.length > 0 || excludedItems.length > 0) && <section className="scope-grid content-section">
        {includedItems.length > 0 && <article className="scope-card"><h2><Check size={20} aria-hidden="true" /> What is included</h2><ul>{includedItems.map((item) => <li key={item}>{item}</li>)}</ul></article>}
        {excludedItems.length > 0 && <article className="scope-card scope-card-muted"><h2><Minus size={20} aria-hidden="true" /> What is not included</h2><ul>{excludedItems.map((item) => <li key={item}>{item}</li>)}</ul></article>}
      </section>}
      {service.approach && !service.approach.includes("{{") && <section className="approach-panel content-section"><p className="eyebrow">Our approach</p><h2>Start with a clear conversation</h2><p>{service.approach}</p></section>}
      {publicFaqs.length > 0 && <FAQList faqs={publicFaqs} heading="Common questions" />}
      {relatedProjects.length > 0 && <section className="related-projects content-section"><p className="eyebrow">Related projects</p><h2>Related projects</h2><ul>{relatedProjects.map((project) => <li key={project.slug}><a href={`/projects/${project.slug}`}>{project.title} <ArrowRight size={15} aria-hidden="true" /></a></li>)}</ul></section>}
      <section className="service-ending-cta"><div><p className="eyebrow">Next step</p><h2>Ready to talk about your {service.name.toLowerCase()} project?</h2><p>Message us on WhatsApp or request a quote.</p></div><div className="cta-actions">{whatsappUrl && <a className="button button-outline-light" href={whatsappUrl} target="_blank" rel="noreferrer">Chat on WhatsApp</a>}<a className="button button-light" href={quoteUrl}>Request a Quote <ArrowRight size={16} aria-hidden="true" /></a></div></section>
    </div>
  </>;
}

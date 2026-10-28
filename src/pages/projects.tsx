import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { services } from "@/content/services";
import { isRealContent, projectBySlug, projectsForView, type ProjectRecord } from "@/content/projects";
import { siteConfig, whatsappHrefFor } from "@/config/siteConfig";
import { ProjectGallery } from "@/components/site/ProjectGallery";

type Props = { includeSamples: boolean; slug?: string };

function ProjectCard({ project }: { project: ProjectRecord }) {
  return <article className="project-card">
    <a className="project-card-image" href={`/projects/${project.slug}`} aria-label={`View project: ${project.title}`}>
      {project.images[0] ? <img src={project.images[0]} alt={`Project photograph: ${project.title}`} loading="lazy" decoding="async" /> : <div className="photo-placeholder project-image-placeholder" role="img" aria-label="Project image placeholder"><span>Project image</span><small>{project.isSample ? "SAMPLE: delete before launch" : "{{PROJECT_IMAGE}}"}</small></div>}
    </a>
    <div className="project-card-content">
      {project.isSample && <span className="sample-label">{project.sampleLabel}</span>}
      <h2><a href={`/projects/${project.slug}`}>{project.title}</a></h2>
      {isRealContent(project.location) && <p className="project-card-location"><MapPin size={15} aria-hidden="true"/>{project.location}</p>}
      {isRealContent(project.service) && <p className="project-card-service">{project.service}</p>}
      {isRealContent(project.year) && <p className="project-card-year">{project.year}</p>}
      <a className="text-link" href={`/projects/${project.slug}`}>View project <ArrowRight size={15} aria-hidden="true"/></a>
    </div>
  </article>;
}

export function ProjectsPage({ includeSamples }: Props) {
  return <>
    <section className="inner-hero"><div className="site-container inner-hero-content"><p className="eyebrow">Selected work</p><h1>Our projects</h1><p className="hero-summary">Explore photographs of building work, construction stages, finished spaces and our team on site.</p></div></section>
    <div className="site-container page-body">
      <ProjectGallery showSelector />
      <section className="projects-cta content-section"><p className="eyebrow">Your project</p><h2>Have a project in mind?</h2><p>Tell us what you plan to build, where it is and what you need help with.</p><a className="button button-dark" href="/request-a-quote">Request a Quote <ArrowUpRight size={16} aria-hidden="true"/></a></section>
    </div>
  </>;
}

export function ProjectDetailPage({ includeSamples, slug = "" }: Props) {
  const project = projectBySlug(slug, includeSamples);
  if (!project) return <section className="site-container page-body"><h1>Project not found</h1><p>This project is not available.</p><a className="button button-dark" href="/projects">View Our Projects</a></section>;
  const visibleProjects = projectsForView(includeSamples).filter((item) => item.slug !== project.slug);
  const allProjects = projectsForView(includeSamples);
  const currentIndex = allProjects.findIndex((item) => item.slug === project.slug);
  const previous = currentIndex > 0 ? allProjects[currentIndex - 1] : undefined;
  const next = currentIndex >= 0 && currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : undefined;
  const factFields: [string, string][] = [["Location", project.location], ["Service", project.service], ["Year", project.year], ["Status", project.status], ["Scope", project.scope], ["Our role", project.ourRole]];
  const storyFields: [string, string][] = [["Overview", project.overview], ["The challenge", project.challenge], ["What we did", project.whatWeDid], ["Result", project.result]];
  const clientVisible = Boolean(siteConfig.switches.CLIENT_NAME_APPROVED && project.clientNameApproved && project.clientName && !project.isSample);
  const related = project.relatedSlugs.map((relatedSlug) => projectBySlug(relatedSlug, includeSamples)).filter((item): item is ProjectRecord => Boolean(item));
  const whatsappUrl = whatsappHrefFor(project.title, `Hello Paceefik Engineering. I would like to discuss a project similar to ${project.title}. (Sent from: ${project.title})`);
  return <>
    <section className="inner-hero project-detail-hero"><div className="site-container inner-hero-content"><p className="eyebrow"><a href="/projects">Projects</a> / Project details</p>{project.isSample && <span className="sample-label">{project.sampleLabel}</span>}<h1>{project.title}</h1>{isRealContent(project.service) && <p className="hero-summary">{project.service}</p>}</div></section>
    <div className="site-container page-body">
      {project.isSample && <div className="sample-notice"><strong>SAMPLE: delete before launch.</strong><span>This record is a layout placeholder. Replace it with verified project information before launch.</span></div>}
      {factFields.some(([, value]) => isRealContent(value)) && <dl className="project-fact-panel">{factFields.filter(([, value]) => isRealContent(value)).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
      <div className="project-detail-layout"><div className="project-detail-main">
        {storyFields.filter(([, value]) => isRealContent(value)).map(([label, value]) => <section className="project-copy-section" key={label}><h2>{label}</h2><p>{value}</p></section>)}
        {project.images.length > 0 ? <section className="project-gallery"><h2>Gallery</h2><div className="project-gallery-grid">{project.images.map((image, index) => <img key={`${image}-${index}`} src={image} alt={`Project photograph ${index + 1}: ${project.title}`} loading="lazy" decoding="async"/>)}</div></section> : <section className="project-gallery"><h2>Gallery</h2><div className="photo-placeholder project-detail-placeholder" role="img" aria-label="Project image placeholder"><span>Project image placeholder</span><small>{"{{PROJECT_IMAGE}}"}</small></div></section>}
        {clientVisible && <p className="project-client">Client: {project.clientName}</p>}
        {(previous || next) && <nav className="project-adjacent-nav" aria-label="Project navigation">{previous ? <a href={`/projects/${previous.slug}`}><ArrowLeft size={15} aria-hidden="true"/>Previous project</a> : <span/>}{next ? <a href={`/projects/${next.slug}`}>Next project<ArrowRight size={15} aria-hidden="true"/></a> : <span/>}</nav>}
      </div><aside className="project-detail-aside"><p className="eyebrow">Paceefik Engineering</p><h2>Have a similar project?</h2><p>Talk with us about what you plan to build.</p><div className="cta-actions">{whatsappUrl && <a className="button button-outline" href={whatsappUrl} target="_blank" rel="noreferrer">Chat on WhatsApp</a>}<a className="button button-dark" href="/request-a-quote">Discuss a similar project <ArrowRight size={16} aria-hidden="true"/></a></div></aside></div>
      {related.length > 0 && <section className="related-projects content-section"><h2>Related projects</h2><div className="project-grid">{related.map((item) => <ProjectCard key={item.slug} project={item}/>)}</div></section>}
      {visibleProjects.length > 0 && related.length === 0 && <section className="related-projects content-section"><h2>Related projects</h2><div className="project-grid">{visibleProjects.slice(0, 3).map((item) => <ProjectCard key={item.slug} project={item}/>)}</div></section>}
    </div>
  </>;
}

export function findProjectSlug(path: string) {
  return path.match(/^\/projects\/([^/]+)\/?$/)?.[1];
}

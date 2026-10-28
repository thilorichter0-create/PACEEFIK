import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { services } from "@/content/services";
import { paceefikImageUrl } from "@/content/serviceImages";

type Photo = { src: string; thumb: string; alt: string; stage: "Construction" | "Completed" | "People & team" };
const photo = (n: number, alt: string, stage: Photo["stage"] = "Construction"): Photo => ({
  src: paceefikImageUrl(n, false),
  thumb: paceefikImageUrl(n, true),
  alt,
  stage,
});

const galleryByService: Record<string, Photo[]> = {
  "building-construction": [
    photo(1, "Finished interior ceiling and lighting", "Completed"),
    photo(20, "Building structure under construction"),
    photo(21, "Concrete and structural works in progress"),
    photo(22, "Reinforced concrete structure"),
    photo(23, "Building frame and reinforcement"),
    photo(24, "Structural reinforcement on site"),
    photo(25, "Concrete construction stage"),
    photo(26, "Building structure in progress"),
    photo(36, "Building construction site"),
    photo(37, "Concrete slab construction"),
    photo(38, "Construction team at work"),
    photo(39, "Building project viewed from above"),
    photo(40, "Concrete slab and structural works"),
    photo(41, "Building under construction"),
    photo(42, "Concrete slab reinforcement"),
    photo(43, "Building construction from above"),
    photo(44, "Completed residential building exterior", "Completed"),
    photo(45, "Residential building under construction"),
    photo(46, "Masonry and exterior construction"),
    photo(47, "Building at an early construction stage"),
    photo(48, "Wall and roof structure in progress"),
    photo(49, "Residential building under construction"),
    photo(50, "Finished residential building exterior", "Completed"),
    photo(51, "Finished residential building exterior", "Completed"),
    photo(52, "Finished residential building exterior", "Completed"),
    photo(53, "Roof and exterior finishing detail", "Completed"),
    photo(54, "Completed residential building", "Completed"),
    photo(61, "Paceefik residential project", "Completed"),
    photo(62, "Paceefik building project", "Completed"),
    photo(63, "Paceefik project viewed from above", "Completed"),
    photo(64, "Paceefik building exterior", "Completed"),
    photo(68, "Building construction and blockwork"),
    photo(69, "Foundation and masonry work"),
    photo(70, "Building foundation work"),
  ],
  "structural-and-concrete-works": [
    photo(17, "Site measurement and survey work"),
    photo(18, "Survey equipment used on site"),
    photo(19, "Site measurement in progress"),
    photo(20, "Concrete structure under construction"),
    photo(21, "Structural concrete works"),
    photo(22, "Reinforced concrete structure"),
    photo(23, "Concrete frame under construction"),
    photo(24, "Structural reinforcement"),
    photo(25, "Reinforcement and concrete work"),
    photo(26, "Structural frame in progress"),
    photo(27, "Workers carrying out structural work"),
    photo(28, "Engineering team on site", "People & team"),
    photo(29, "Engineering team during site work", "People & team"),
    photo(30, "Construction work in progress"),
    photo(31, "Site inspection and measurement"),
    photo(32, "Construction team at work", "People & team"),
    photo(33, "Site work in monochrome", "People & team"),
    photo(34, "Engineers on a construction site", "People & team"),
    photo(35, "Site inspection", "People & team"),
    photo(36, "Structural construction site"),
    photo(37, "Concrete slab and reinforcement"),
    photo(38, "Construction team working on site", "People & team"),
    photo(39, "Building project from above"),
    photo(40, "Concrete slab construction"),
    photo(41, "Reinforced concrete slab"),
    photo(42, "Structural reinforcement"),
    photo(43, "Concrete construction viewed from above"),
    photo(57, "Blockwork and structural construction"),
    photo(58, "Foundation works in progress"),
    photo(59, "Foundation and concrete work"),
    photo(60, "Foundation and structural works"),
    photo(73, "Engineer on a construction site", "People & team"),
    photo(74, "Site work in progress", "People & team"),
  ],
  "blockwork": [
    photo(46, "Masonry walls and exterior construction"),
    photo(47, "Blockwork on a residential building"),
    photo(48, "Masonry and roof structure"),
    photo(49, "Building masonry before finishing"),
    photo(57, "Blockwork in progress"),
    photo(58, "Masonry and foundation work"),
    photo(59, "Building foundation and blockwork"),
    photo(60, "Blockwork and foundation stage"),
    photo(68, "Blockwork at a building site"),
    photo(69, "Foundation and blockwork"),
    photo(70, "Blockwork and foundation construction"),
  ],
  "borehole-drilling": [
    photo(17, "Site measurement before engineering work"),
    photo(18, "Survey equipment on site"),
    photo(19, "Site measurement and investigation"),
    photo(58, "Site foundation and ground works"),
    photo(59, "Ground works at a construction site"),
    photo(60, "Foundation works on site"),
    photo(68, "Ground and foundation works"),
    photo(69, "Site preparation and foundation work"),
    photo(70, "Foundation stage at a building site"),
  ],
  "project-supervision-and-consultancy": [
    photo(4, "Team visit at a construction site", "People & team"),
    photo(12, "Construction team on site", "People & team"),
    photo(13, "Engineering team at a project site", "People & team"),
    photo(14, "Site team reviewing construction progress", "People & team"),
    photo(15, "Project team at the construction site", "People & team"),
    photo(16, "Site supervision during construction", "People & team"),
    photo(28, "Engineering team on site", "People & team"),
    photo(31, "Site measurement and inspection", "People & team"),
    photo(32, "Engineering team at work", "People & team"),
    photo(34, "Project team on site", "People & team"),
    photo(73, "Engineer at a project site", "People & team"),
    photo(74, "Construction work inspection", "People & team"),
  ],
  "geotechnical-services": [
    photo(17, "Site measurement and survey equipment"),
    photo(18, "Survey equipment on a project site"),
    photo(19, "Site measurement and investigation"),
    photo(20, "Foundation and ground-related construction"),
    photo(21, "Building foundation stage"),
    photo(22, "Structural foundation works"),
    photo(57, "Foundation and blockwork"),
    photo(58, "Ground works at a building site"),
    photo(59, "Foundation preparation"),
    photo(60, "Foundation and concrete works"),
  ],
  "renovation": [
    photo(1, "Finished interior ceiling and lighting", "Completed"),
    photo(44, "Residential building exterior", "Completed"),
    photo(46, "Building exterior and masonry"),
    photo(49, "Residential exterior before finishing"),
    photo(50, "Finished residential exterior", "Completed"),
    photo(51, "Finished residential exterior", "Completed"),
    photo(52, "Finished residential exterior", "Completed"),
    photo(53, "Exterior roof and finishing detail", "Completed"),
    photo(54, "Finished residential exterior", "Completed"),
    photo(55, "Interior ceiling and lighting detail", "Completed"),
    photo(56, "Interior ceiling and lighting detail", "Completed"),
  ],
};

export function ProjectGallery({ initialService = "", showSelector = false }: { initialService?: string; showSelector?: boolean }) {
  const [selectedService, setSelectedService] = useState(initialService);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [stage, setStage] = useState<"All" | Photo["stage"]>("All");
  const [visibleCount, setVisibleCount] = useState(18);
  const activeService = services.find((item) => item.slug === selectedService);
  const photos = useMemo(() => {
    const base = selectedService ? galleryByService[selectedService] ?? [] : Object.values(galleryByService).flat();
    const unique = base.filter((item, index) => base.findIndex((other) => other.src === item.src) === index);
    return stage === "All" ? unique : unique.filter((item) => item.stage === stage);
  }, [selectedService, stage]);
  const displayedPhotos = useMemo(() => photos.slice(0, visibleCount), [photos, visibleCount]);
  const selectedPhoto = activeIndex === null ? null : photos[activeIndex];

  useEffect(() => {
    setVisibleCount(18);
  }, [selectedService, stage]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") setActiveIndex((index) => index === null ? null : (index + 1) % photos.length);
      if (event.key === "ArrowLeft") setActiveIndex((index) => index === null ? null : (index - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKeyDown); document.body.style.overflow = ""; };
  }, [activeIndex, photos.length]);

  return <section className="portfolio-gallery content-section" aria-label="Project photography">
    <div className="portfolio-heading">
      <div><p className="eyebrow">Work in pictures</p><h2>{activeService ? `${activeService.name} gallery` : "Explore our project photographs"}</h2><p>Browse construction progress, finished spaces and on-site work. Select any image to view it larger.</p></div>
      {showSelector && <label className="portfolio-service-select">Browse by service<select value={selectedService} onChange={(event) => { setSelectedService(event.target.value); setStage("All"); setActiveIndex(null); }}><option value="">All services</option>{services.map((service) => <option key={service.slug} value={service.slug}>{service.name}</option>)}</select></label>}
    </div>
    <div className="portfolio-controls" aria-label="Filter photographs">
      {(["All", "Construction", "Completed", "People & team"] as const).map((item) => <button type="button" key={item} className={stage === item ? "is-active" : ""} aria-pressed={stage === item} onClick={() => setStage(item)}>{item === "All" ? "All photographs" : item}</button>)}
    </div>
    <div className="portfolio-photo-grid">
      {displayedPhotos.map((item, index) => <button type="button" className="portfolio-photo-card" key={`${item.src}-${index}`} onClick={() => setActiveIndex(index)} aria-label={`Open photo ${index + 1}: ${item.alt}`}>
        <img src={item.thumb} alt={item.alt} loading="lazy" decoding="async" />
        <span className="portfolio-photo-caption">{item.stage === "Completed" ? "Finished work" : item.stage === "People & team" ? "People & site work" : "Construction in progress"}</span>
      </button>)}
    </div>
    {photos.length > visibleCount && (
      <div style={{ textAlign: "center", marginTop: "32px" }}>
        <button
          type="button"
          className="button button-outline"
          onClick={() => setVisibleCount((prev) => Math.min(prev + 18, photos.length))}
        >
          Show More Photographs ({photos.length - visibleCount} remaining)
        </button>
      </div>
    )}
    {!photos.length && <p className="empty-state">There are no photographs in this category.</p>}
    {selectedPhoto && <div className="portfolio-lightbox" role="dialog" aria-modal="true" aria-label="Project photograph viewer" onClick={() => setActiveIndex(null)}>
      <button type="button" className="portfolio-lightbox-close" onClick={() => setActiveIndex(null)} aria-label="Close image viewer"><X /></button>
      <button type="button" className="portfolio-lightbox-nav portfolio-lightbox-prev" onClick={(event) => { event.stopPropagation(); setActiveIndex((index) => index === null ? null : (index - 1 + photos.length) % photos.length); }} aria-label="Previous image"><ArrowLeft /></button>
      <figure onClick={(event) => event.stopPropagation()}><img src={selectedPhoto.src} alt={selectedPhoto.alt} /><figcaption>{selectedPhoto.alt} · {(activeIndex ?? 0) + 1} of {photos.length}</figcaption></figure>
      <button type="button" className="portfolio-lightbox-nav portfolio-lightbox-next" onClick={(event) => { event.stopPropagation(); setActiveIndex((index) => index === null ? null : (index + 1) % photos.length); }} aria-label="Next image"><ArrowRight /></button>
    </div>}
  </section>;
}

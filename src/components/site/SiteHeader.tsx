import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, Search, X } from "lucide-react";
import { services } from "@/content/services";
import { siteConfig, isFilled } from "@/config/siteConfig";

type Props = { onOpenSearch: () => void };

const aboutLinks = [
  { href: "/about", label: "Founder" },
];

export default function SiteHeader({ onOpenSearch }: Props) {
  const [openMenu, setOpenMenu] = useState<"about" | "services" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const hasPhone = isFilled(siteConfig.contact.phoneHref);
  const hasWhatsApp = isFilled(siteConfig.contact.whatsappUrl);
  const hasEmail = isFilled(siteConfig.contact.emailHref);

  const close = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const menu = (key: "about" | "services", label: string, entries: { href: string; label: string }[]) => (
    <div className="nav-dropdown-wrap">
      <button
        className="nav-dropdown-trigger"
        aria-expanded={openMenu === key}
        aria-haspopup="true"
        aria-controls={`${key}-menu`}
        onClick={() => setOpenMenu(openMenu === key ? null : key)}
        type="button"
      >
        {label}<ChevronDown size={15} aria-hidden="true" />
      </button>
      {openMenu === key && (
        <div className="nav-dropdown" id={`${key}-menu`}>
          {entries.map((entry) => (
            <a key={entry.href} href={entry.href} onClick={close}>{entry.label}</a>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="utility-strip">
        <div className="site-container utility-inner">
          <div className="utility-contact" aria-label="Contact details">
            {hasPhone && <a href={`tel:${siteConfig.contact.phoneHref}`}>Call {siteConfig.contact.phone}</a>}
            {hasWhatsApp && <a href={siteConfig.contact.whatsappUrl} target="_blank" rel="noreferrer">WhatsApp us</a>}
            {hasEmail && <a href={`mailto:${siteConfig.contact.emailHref}`}>{siteConfig.contact.email}</a>}
          </div>
          <a className="utility-quote" href="/request-a-quote">Request a Quote <ArrowUpRight size={14} aria-hidden="true" /></a>
        </div>
      </div>
      {siteConfig.switches.announcementBar && <div className="announcement-bar">{siteConfig.tagline}</div>}
      <header className="site-header">
        <div className="site-container header-inner">
          <a className="brand-mark" href="/" aria-label={`${siteConfig.shortName} home`}>
            {isFilled(siteConfig.logo.src) ? <img src={siteConfig.logo.src} alt={siteConfig.logo.alt} /> : <span className="brand-wordmark">{siteConfig.logo.wordmark}</span>}
            <span className="brand-subline">Engineering Services Limited</span>
          </a>
          <button className="search-trigger" type="button" onClick={onOpenSearch} aria-label="Search services, projects and guides">
            <Search size={17} aria-hidden="true" /><span>Search</span>
          </button>
          <button className="mobile-menu-trigger" type="button" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-controls="main-navigation" aria-label={mobileOpen ? "Close navigation" : "Open navigation"}>
            {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
          <nav id="main-navigation" className={`main-navigation${mobileOpen ? " is-open" : ""}`} aria-label="Main navigation">
            {menu("about", "About", aboutLinks)}
            {menu("services", "Services", services.map((service) => ({ href: `/services/${service.slug}`, label: service.name })))}
            <a href="/projects" onClick={close}>Projects</a>
            <a href="/insights" onClick={close}>Insights</a>
            <a href="/contact" onClick={close}>Contact</a>
            <a className="button button-dark nav-quote" href="/request-a-quote" onClick={close}>Request a Quote</a>
          </nav>
        </div>
      </header>
    </>
  );
}

import { siteConfig, isFilled } from "@/config/siteConfig";
import type { ServiceRecord } from "@/content/services";

type Props = { services: ServiceRecord[]; onCookieSettings: () => void };

export default function SiteFooter({ services, onCookieSettings }: Props) {
  const year = new Date().getFullYear();
  const phoneReady = isFilled(siteConfig.contact.phone) && isFilled(siteConfig.contact.phoneHref);
  const whatsappReady = isFilled(siteConfig.contact.whatsapp) && isFilled(siteConfig.contact.whatsappUrl);
  const emailReady = isFilled(siteConfig.contact.email) && isFilled(siteConfig.contact.emailHref);
  const directionsReady = isFilled(siteConfig.contact.directionsUrl);
  const address = siteConfig.contact.headOfficeAddress;
  const rc = siteConfig.contact.rcNumber;
  const agency = siteConfig.contact.agency;

  return (
    <footer className="site-footer">
      <div className="site-container footer-main">
        <div className="footer-brand">
          <a className="footer-wordmark" href="/">{siteConfig.shortName}</a>
          <p>Paceefik Engineering Services Limited delivers building construction and engineering services from Osogbo, from concept to completion.</p>
        </div>
        <div className="footer-column"><h2>Company</h2><a href="/about">Founder</a><a href="/contact">Contact</a><a href="/request-a-quote">Request a Quote</a><a href="/accessibility">Accessibility Statement</a></div>
        <div className="footer-column"><h2>Services</h2>{services.map((service) => <a key={service.slug} href={`/services/${service.slug}`}>{service.name}</a>)}<a href="/services">View all services</a></div>
        <div className="footer-column"><h2>Projects and Insights</h2><a href="/projects">Projects</a><a href="/insights">Insights</a><a href="/sitemap">HTML Sitemap</a></div>
        <div className="footer-column footer-contact">
          <h2>Contact</h2>
          <p>{address}, Osogbo, Osun State</p>
          {phoneReady && <p><a href={`tel:${siteConfig.contact.phoneHref}`}>{siteConfig.contact.phone}</a></p>}
          {whatsappReady && <p><a href={siteConfig.contact.whatsappUrl} target="_blank" rel="noreferrer">WhatsApp us</a></p>}
          {emailReady && <p><a href={`mailto:${siteConfig.contact.emailHref}`}>{siteConfig.contact.email}</a></p>}
          {directionsReady && <a href={siteConfig.contact.directionsUrl} target="_blank" rel="noreferrer">Get directions</a>}
        </div>
        {siteConfig.switches.newsletter && (
          <div className="footer-newsletter"><h2>Newsletter</h2><p>Share your email to receive updates.</p><a href="/thank-you/newsletter">Subscribe</a></div>
        )}
      </div>
      <div className="site-container footer-bottom">
        <p>© {year} Paceefik Engineering Services Limited. RC {rc}.</p>
        <nav aria-label="Legal links"><a href="/privacy-policy">Privacy Policy</a><a href="/terms">Terms</a><a href="/cookie-policy">Cookie Policy</a><button type="button" onClick={onCookieSettings}>Cookie Settings</button><a href="/sitemap">Sitemap</a></nav>
        <p>Website by {agency}</p>
      </div>
    </footer>
  );
}

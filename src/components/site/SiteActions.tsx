import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { siteConfig, isFilled, whatsappHrefFor } from "@/config/siteConfig";

type Props = { pageName: string };

export function PreFooterCTA({ pageName }: Props) {
  const whatsappUrl = whatsappHrefFor(pageName);
  return (
    <section className="prefooter-cta">
      <div className="site-container prefooter-inner">
        <div><p className="eyebrow">Paceefik Engineering</p><h2>Have a project in mind?</h2><p>Tell us what you plan to build and we will get back to you.</p></div>
        <div className="cta-actions"><a className="button button-light" href="/request-a-quote">Request a Quote <ArrowRight size={16} /></a>{whatsappUrl && <a className="button button-outline-light" href={whatsappUrl} target="_blank" rel="noreferrer">Chat on WhatsApp <MessageCircle size={16} /></a>}</div>
      </div>
    </section>
  );
}

export function MobileActionBar() {
  const phoneReady = isFilled(siteConfig.contact.phoneHref);
  const whatsAppReady = isFilled(siteConfig.contact.whatsappUrl);
  return (
    <nav className="mobile-action-bar" aria-label="Quick actions">
      {phoneReady && <a href={`tel:${siteConfig.contact.phoneHref}`}><Phone size={17} />Call</a>}
      {whatsAppReady && <a href={siteConfig.contact.whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={17} />WhatsApp</a>}
      <a href="/request-a-quote"><ArrowRight size={17} />Quote</a>
    </nav>
  );
}

export function FloatingWhatsApp({ pageName }: Props) {
  const href = whatsappHrefFor(pageName);
  if (!href) return null;
  return <a className="floating-whatsapp" href={href} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp" title="Chat with us on WhatsApp"><MessageCircle size={22} /><span className="floating-whatsapp-tooltip">Chat with us on WhatsApp</span></a>;
}

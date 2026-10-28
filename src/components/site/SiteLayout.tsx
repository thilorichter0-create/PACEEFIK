import { useCallback, useEffect, useState, type ReactNode } from "react";
import { siteStyleVariables, siteConfig } from "@/config/siteConfig";
import { services } from "@/content/services";
import SiteHeader from "./SiteHeader";
import SearchOverlay from "./SearchOverlay";
import SiteFooter from "./SiteFooter";
import CookieConsent from "./CookieConsent";
import { FloatingWhatsApp, MobileActionBar, PreFooterCTA } from "./SiteActions";

type Props = { children: ReactNode; pageName: string };

export default function SiteLayout({ children, pageName }: Props) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [cookieSettingsCount, setCookieSettingsCount] = useState(0);
  const [offline, setOffline] = useState(false);
  const openSettings = useCallback(() => setCookieSettingsCount((count) => count + 1), []);

  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  useEffect(() => {
    const handleCookieSettings = () => openSettings();
    window.addEventListener("paceefik:cookie-settings", handleCookieSettings);
    return () => window.removeEventListener("paceefik:cookie-settings", handleCookieSettings);
  }, [openSettings]);

  return (
    <div className="site-shell" style={siteStyleVariables()}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      {offline && <div className="offline-banner" role="status">{siteConfig.systemMessages.offline}</div>}
      <SiteHeader onOpenSearch={() => setSearchOpen(true)} />
      <main id="main-content">{children}</main>
      <PreFooterCTA pageName={pageName} />
      <SiteFooter services={services} onCookieSettings={openSettings} />
      <MobileActionBar />
      <FloatingWhatsApp pageName={pageName} />
      <CookieConsent openSettings={cookieSettingsCount} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

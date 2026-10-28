import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useDialogFocus } from "./useDialogFocus";

const CONSENT_KEY = "paceefik-cookie-preferences";
type Consent = { essential: true; analytics: boolean };
type Props = { openSettings?: number };

export default function CookieConsent({ openSettings = 0 }: Props) {
  const [visible, setVisible] = useState(true);
  const [manage, setManage] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const dialogRef = useDialogFocus<HTMLElement>(manage);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CONSENT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Consent;
        setAnalytics(Boolean(parsed.analytics));
        setVisible(false);
      }
    } catch {
      // If local storage is unavailable, keep the notice visible.
    }
  }, []);

  useEffect(() => {
    if (openSettings > 0) setManage(true);
  }, [openSettings]);

  const save = (allowAnalytics: boolean) => {
    const preference: Consent = { essential: true, analytics: allowAnalytics };
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(preference)); } catch { /* storage may be disabled */ }
    setAnalytics(allowAnalytics);
    setVisible(false);
    setManage(false);
  };

  if (manage) {
    return (
      <div className="overlay-backdrop cookie-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setManage(false); }}>
        <section ref={dialogRef} className="cookie-settings" role="dialog" aria-modal="true" aria-labelledby="cookie-settings-title" aria-describedby="cookie-settings-help" tabIndex={-1}>
          <button className="icon-button cookie-close" type="button" aria-label="Close cookie options" data-dialog-initial-focus onClick={() => setManage(false)}><X size={19} aria-hidden="true" /></button>
          <p className="eyebrow">Your preferences</p>
          <h2 id="cookie-settings-title">Manage cookie options</h2>
          <p id="cookie-settings-help">Choose whether this site may use non-essential analytics cookies. Your choice is saved on this device.</p>
          <div className="cookie-option"><div><strong>Essential cookies</strong><p>These cookies are needed to make the site work.</p></div><span className="always-on">Always on</span></div>
          <label className="cookie-option cookie-toggle"><div><strong>Analytics cookies</strong><p>Used only after your permission and when an analytics service is configured.</p></div><input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} /></label>
          <div className="cookie-actions"><button className="button button-outline" type="button" onClick={() => save(false)}>Decline non-essential</button><button className="button button-dark" type="button" onClick={() => save(analytics)}>Save options</button></div>
        </section>
      </div>
    );
  }

  if (!visible) return null;
  return (
    <aside className="cookie-notice" role="region" aria-label="Cookie notice" aria-live="polite">
      <div className="cookie-copy">
        <strong>We use cookies.</strong>
        <p>We use essential cookies to make this site work. With your permission, we also use analytics cookies to understand how people use it. You can change your choice at any time. <a href="/cookie-policy">Read our Cookie Policy.</a></p>
      </div>
      <div className="cookie-actions">
        <button className="button button-dark" type="button" onClick={() => save(true)}>Accept all</button>
        <button className="button button-outline" type="button" onClick={() => save(false)}>Decline non-essential</button>
        <button className="button button-text" type="button" onClick={() => setManage(true)}>Manage options</button>
      </div>
    </aside>
  );
}

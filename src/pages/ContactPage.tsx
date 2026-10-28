import { useState } from "react";
import { ArrowRight, Check, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig, isFilled, whatsappHrefFor } from "@/config/siteConfig";

type ContactFormState = { name: string; email: string; phone: string; subject: string; message: string; consent: boolean; companyWebsite: string };
type ContactSuccess = { name: string; reference: string };
const subjects = ["General enquiry", "Quote", "Existing project", "Other"];
const emptyForm: ContactFormState = { name: "", email: "", phone: "", subject: "", message: "", consent: false, companyWebsite: "" };

export default function ContactPage() {
  const [form, setForm] = useState<ContactFormState>(emptyForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<ContactSuccess | null>(null);
  const update = <K extends keyof ContactFormState>(key: K, value: ContactFormState[K]) => setForm((current) => ({ ...current, [key]: value }));
  const phoneReady = isFilled(siteConfig.contact.phoneHref);
  const emailReady = isFilled(siteConfig.contact.emailHref);
  const whatsappHref = whatsappHrefFor("Contact");
  const directionsReady = isFilled(siteConfig.contact.directionsUrl);
  const errorId = error ? "contact-form-error" : undefined;

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) || !form.phone.trim() || !form.subject || !form.message.trim() || !form.consent) {
      setError("Please complete the required fields and agree to the Privacy Policy.");
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch("/api/forms/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const result = await response.json().catch(() => ({}));
      if (response.ok && result?.emailSent === true && result?.reference) {
        const confirmed = { kind: "contact", reference: String(result.reference), name: form.name.trim() };
        try {
          sessionStorage.setItem("paceefik:form-confirmation", JSON.stringify(confirmed));
          window.location.assign("/thank-you/contact");
        } catch {
          setSuccess({ reference: confirmed.reference, name: confirmed.name });
        }
      } else setError(whatsappHref ? "Something went wrong. Please try again or message us on WhatsApp." : "Something went wrong. Please try again, or use the available contact details above.");
    } catch {
      setError(whatsappHref ? "Something went wrong. Please try again or message us on WhatsApp." : "Something went wrong. Please try again, or use the available contact details above.");
    } finally { setSubmitting(false); }
  };

  return <>
    <section className="inner-hero"><div className="site-container inner-hero-content"><p className="eyebrow">Contact</p><h1>Let us talk about your project</h1><p className="hero-summary">Call, WhatsApp, email or visit. Head office in Osogbo.</p></div></section>
    <div className="site-container page-body contact-page">
      {success ? <section className="contact-success" role="status"><span className="success-mark" aria-hidden="true"><Check size={24}/></span><h2>Thank you, {success.name}.</h2><p>We have your message and will get back to you.</p><p>Reference number: <strong>{success.reference}</strong>.</p><nav aria-label="Useful next pages"><a className="button button-dark" href="/services">View Services</a><a className="button button-outline" href="/request-a-quote">Request a Quote</a></nav></section> : <>
        <section className="contact-methods" aria-label="Contact methods">
          {phoneReady && <article className="contact-method-card"><Phone size={21} aria-hidden="true"/><h2>Call us</h2><a href={`tel:${siteConfig.contact.phoneHref}`}>{siteConfig.contact.phone}</a></article>}
          {whatsappHref && <article className="contact-method-card"><MessageCircle size={21} aria-hidden="true"/><h2>WhatsApp</h2><a href={whatsappHref} target="_blank" rel="noreferrer">Open WhatsApp</a></article>}
          {emailReady && <article className="contact-method-card"><Mail size={21} aria-hidden="true"/><h2>Email</h2><a href={`mailto:${siteConfig.contact.emailHref}`}>{siteConfig.contact.email}</a></article>}
          <article className="contact-method-card contact-method-quote"><ArrowRight size={21} aria-hidden="true"/><h2>Request a quote</h2><a href="/request-a-quote">Tell us about your project</a></article>
        </section>
        <div className="contact-columns content-section">
          <section className="contact-form-panel"><p className="eyebrow">Send a message</p><h2>How can we help?</h2>
            <form className="contact-form" onSubmit={(event) => void submit(event)} noValidate>
              <input className="honeypot-field" type="text" name="companyWebsite" value={form.companyWebsite} onChange={(event) => update("companyWebsite", event.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <div className="form-grid">
                <label className="field" htmlFor="contact-name">Name<input id="contact-name" required autoComplete="name" value={form.name} onChange={(event) => update("name", event.target.value)} aria-describedby={errorId} aria-invalid={Boolean(error)}/></label>
                <label className="field" htmlFor="contact-email">Email<input id="contact-email" required type="email" autoComplete="email" value={form.email} onChange={(event) => update("email", event.target.value)} aria-describedby={errorId} aria-invalid={Boolean(error)}/></label>
                <label className="field" htmlFor="contact-phone">Phone<input id="contact-phone" required type="tel" autoComplete="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} aria-describedby={errorId} aria-invalid={Boolean(error)}/></label>
                <label className="field" htmlFor="contact-subject">Subject<select id="contact-subject" required value={form.subject} onChange={(event) => update("subject", event.target.value)} aria-describedby={errorId} aria-invalid={Boolean(error)}><option value="">Choose a subject</option>{subjects.map((subject) => <option key={subject}>{subject}</option>)}</select></label>
                <label className="field field-full" htmlFor="contact-message">Message<textarea id="contact-message" required rows={5} value={form.message} onChange={(event) => update("message", event.target.value)} aria-describedby={errorId} aria-invalid={Boolean(error)}/></label>
                <label className="consent-check field-full"><input required type="checkbox" checked={form.consent} onChange={(event) => update("consent", event.target.checked)} aria-describedby={errorId} aria-invalid={Boolean(error)}/><span>I agree to the <a href="/privacy-policy">Privacy Policy</a>.</span></label>
              </div>
              {error && <p className="form-error" id="contact-form-error" role="alert">{error}</p>}
              <button className="button button-dark" type="submit" disabled={submitting}>{submitting ? siteConfig.systemMessages.formLoading : "Send message"}<ArrowRight size={16} aria-hidden="true"/></button>
            </form>
          </section>
          <aside className="office-card"><p className="eyebrow">Find us</p><h2><MapPin size={21} aria-hidden="true"/>Head office</h2><p>{siteConfig.contact.address}, Osogbo, Osun State</p>{directionsReady && <div className="office-links"><a href={siteConfig.contact.directionsUrl} target="_blank" rel="noreferrer">Get directions</a><a href={siteConfig.contact.directionsUrl} target="_blank" rel="noreferrer">Open in Maps</a></div>}</aside>
        </div>
      </>}
    </div>
  </>;
}

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Upload } from "lucide-react";
import { siteConfig, isFilled, whatsappHrefFor } from "@/config/siteConfig";

type QuoteDraft = {
  projectType: string;
  state: string;
  area: string;
  approximateSize: string;
  sizeNotSure: boolean;
  drawings: string;
  siteReady: string;
  startWhen: string;
  name: string;
  phone: string;
  whatsappSame: boolean;
  email: string;
  bestTime: string;
  consent: boolean;
  companyWebsite: string;
};

type Attachment = { name: string; type: string; base64: string };
const initialDraft: QuoteDraft = { projectType: "", state: "", area: "", approximateSize: "", sizeNotSure: false, drawings: "", siteReady: "", startWhen: "", name: "", phone: "", whatsappSame: false, email: "", bestTime: "", consent: false, companyWebsite: "" };
const steps = ["Project type", "Details", "Timeline", "Your details", "Done"];
const projectTypes = ["Building Construction", "Structural and Concrete Works", "Blockwork", "Borehole Drilling", "Project Supervision and Consultancy", "Geotechnical Services", "Renovation", "Not sure yet"];
const startOptions = ["Within 1 month", "1 to 3 months", "3 to 6 months", "Just exploring"];
const drawingsOptions = ["Yes", "In progress", "No"];
const siteOptions = ["Yes", "No", "Not sure"];
const times = ["Morning", "Afternoon", "Evening"];
const MAX_FILE_BYTES = 20 * 1024 * 1024;
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const DRAFT_KEY = "paceefik-quote-draft-v1";

function toBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => { const result = String(reader.result ?? ""); resolve(result.slice(result.indexOf(",") + 1)); };
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

function RadioCards({ name, options, value, onChange, errorId }: { name: string; options: string[]; value: string; onChange: (value: string) => void; errorId?: string }) {
  return <div className="choice-grid">{options.map((option) => <label className={`choice-card${value === option ? " is-selected" : ""}`} key={option}><input type="radio" name={name} value={option} checked={value === option} onChange={() => onChange(option)} aria-describedby={errorId} aria-invalid={Boolean(errorId)} /><span>{option}</span></label>)}</div>;
}

export default function QuoteRequestPage() {
  const [form, setForm] = useState<QuoteDraft>(initialDraft);
  const [step, setStep] = useState(0);
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [fileError, setFileError] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [requestNumber, setRequestNumber] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) setForm({ ...initialDraft, ...(JSON.parse(saved) as Partial<QuoteDraft>), companyWebsite: "" });
    } catch { /* local storage may be disabled */ }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || requestNumber) return;
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(form)); } catch { /* local storage may be disabled */ }
  }, [form, hydrated, requestNumber]);

  const update = <K extends keyof QuoteDraft>(key: K, value: QuoteDraft[K]) => setForm((current) => ({ ...current, [key]: value }));
  const progress = useMemo(() => Math.round(((step + 1) / steps.length) * 100), [step]);
  const errorId = error ? "quote-form-error" : undefined;

  const chooseFile = async (file?: File) => {
    setFileError("");
    if (!file) { setAttachment(null); return; }
    if (file.size > MAX_FILE_BYTES || !ALLOWED_TYPES.includes(file.type)) { setAttachment(null); setFileError("That file is too large or the type is not supported."); return; }
    try { setAttachment({ name: file.name, type: file.type, base64: await toBase64(file) }); }
    catch { setAttachment(null); setFileError("That file is too large or the type is not supported."); }
  };

  const validateStep = () => {
    if (step === 0 && !form.projectType) return "Please choose a project type.";
    if (step === 1 && (!form.state.trim() || !form.area.trim() || (!form.sizeNotSure && !form.approximateSize.trim()) || !form.drawings || !form.siteReady)) return "Please complete the project details.";
    if (step === 2 && !form.startWhen) return "Please choose when you would like to start.";
    if (step === 3) {
      const phoneDigits = form.phone.replace(/\D/g, "").length;
      if (phoneDigits < 7 || phoneDigits > 15) return "Please enter a phone number we can reach you on.";
      if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return "That email address does not look right.";
      if (!form.name.trim() || !form.bestTime || !form.consent) return "Please complete your details and agree to the consent statement.";
      if (fileError) return fileError;
    }
    return "";
  };

  const next = () => {
    const message = validateStep();
    if (message) { setError(message); return; }
    setError("");
    setStep((current) => Math.min(current + 1, 3));
  };

  const submit = async () => {
    const message = validateStep();
    if (message) { setError(message); return; }
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/forms/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, approximateSize: form.sizeNotSure ? "Not sure" : form.approximateSize, attachment }),
      });
      const result = await response.json().catch(() => ({}));
      if (response.ok && result?.emailSent === true && result?.reference) {
        try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
        const confirmation = { kind: "quote", reference: String(result.reference), name: form.name.trim() };
        try {
          sessionStorage.setItem("paceefik:form-confirmation", JSON.stringify(confirmation));
          window.location.assign("/thank-you/quote");
        } catch {
          setRequestNumber(confirmation.reference);
          setStep(4);
        }
      } else {
        setError(whatsappHref ? "Something went wrong. Your answers are saved. Please try again or message us on WhatsApp." : "Something went wrong. Your answers are saved. Please try again or use the Contact page.");
      }
    } catch {
      setError(whatsappHref ? "Something went wrong. Your answers are saved. Please try again or message us on WhatsApp." : "Something went wrong. Your answers are saved. Please try again or use the Contact page.");
    } finally { setSubmitting(false); }
  };

  const whatsappText = `Hello Paceefik Engineering. Project type: ${form.projectType || "____"} Location: ${form.state || "____"}, ${form.area || "____"} Size: ${form.sizeNotSure ? "Not sure" : form.approximateSize || "____"} Start date: ${form.startWhen || "____"} (Sent from: Request a Quote)`;
  const whatsappHref = whatsappHrefFor("Request a Quote", whatsappText);

  return <>
    <section className="inner-hero quote-hero"><div className="site-container inner-hero-content"><p className="eyebrow">Request a Quote</p><h1>Tell us about your project</h1><p className="hero-summary">Takes about 3 minutes.</p></div></section>
    <div className="site-container page-body quote-page">
      {step < 4 ? <>
        <div className="quote-progress"><div className="quote-step-labels">{steps.map((label, index) => <span className={index === step ? "is-active" : index < step ? "is-complete" : ""} key={label}><b>{index < step ? <Check size={14}/> : index + 1}</b>{label}</span>)}</div><div className="progress-track" role="progressbar" aria-label="Form progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ width: `${progress}%` }}/></div></div>
        <form className="quote-form" onSubmit={(event) => { event.preventDefault(); if (step === 3) void submit(); else next(); }} noValidate>
          <input className="honeypot-field" type="text" name="companyWebsite" value={form.companyWebsite} onChange={(event) => update("companyWebsite", event.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" />
          {step === 0 && <fieldset className="form-step" aria-describedby={errorId}><legend>What would you like us to help with?</legend><RadioCards name="projectType" options={projectTypes} value={form.projectType} onChange={(value) => update("projectType", value)} errorId={errorId}/></fieldset>}
          {step === 1 && <fieldset className="form-step" aria-describedby={errorId}><legend>Tell us a little more about the project</legend><div className="form-grid">
            <div className="field field-full"><span>Location (state and area)</span><div className="field-pair"><label htmlFor="quote-state">State<input id="quote-state" required autoComplete="address-level1" value={form.state} onChange={(event) => update("state", event.target.value)} aria-describedby={errorId} aria-invalid={Boolean(error)}/></label><label htmlFor="quote-area">Area<input id="quote-area" required value={form.area} onChange={(event) => update("area", event.target.value)} aria-describedby={errorId} aria-invalid={Boolean(error)}/></label></div></div>
            <div className="field field-full"><label htmlFor="quote-size">Approximate size (or “Not sure”)</label><div className="field-pair"><input id="quote-size" placeholder="Approximate size" disabled={form.sizeNotSure} value={form.approximateSize} onChange={(event) => update("approximateSize", event.target.value)} aria-describedby={errorId} aria-invalid={Boolean(error)}/><label className="inline-choice"><input type="checkbox" checked={form.sizeNotSure} onChange={(event) => { update("sizeNotSure", event.target.checked); if (event.target.checked) update("approximateSize", ""); }}/>Not sure</label></div></div>
            <div className="field field-full"><span>Do you have drawings?</span><RadioCards name="drawings" options={drawingsOptions} value={form.drawings} onChange={(value) => update("drawings", value)} errorId={errorId}/></div>
            <div className="field field-full"><span>Is the site ready?</span><RadioCards name="siteReady" options={siteOptions} value={form.siteReady} onChange={(value) => update("siteReady", value)} errorId={errorId}/></div>
          </div></fieldset>}
          {step === 2 && <fieldset className="form-step" aria-describedby={errorId}><legend>When would you like to start?</legend><RadioCards name="startWhen" options={startOptions} value={form.startWhen} onChange={(value) => update("startWhen", value)} errorId={errorId}/></fieldset>}
          {step === 3 && <fieldset className="form-step" aria-describedby={errorId}><legend>Your details</legend><div className="form-grid">
            <label className="field" htmlFor="quote-name">Name<input id="quote-name" required autoComplete="name" value={form.name} onChange={(event) => update("name", event.target.value)} aria-describedby={errorId} aria-invalid={Boolean(error)}/></label>
            <label className="field" htmlFor="quote-phone">Phone<input id="quote-phone" required type="tel" autoComplete="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} aria-describedby={errorId} aria-invalid={Boolean(error)}/></label>
            <label className="field field-full"><span className="inline-choice"><input type="checkbox" checked={form.whatsappSame} onChange={(event) => update("whatsappSame", event.target.checked)}/>I use WhatsApp on this number</span></label>
            <label className="field" htmlFor="quote-email">Email (optional)<input id="quote-email" type="email" autoComplete="email" value={form.email} onChange={(event) => update("email", event.target.value)} aria-describedby={errorId} aria-invalid={Boolean(error)}/></label>
            <label className="field" htmlFor="quote-best-time">Best time to contact<select id="quote-best-time" value={form.bestTime} onChange={(event) => update("bestTime", event.target.value)} aria-describedby={errorId} aria-invalid={Boolean(error)}><option value="">Choose a time</option>{times.map((time) => <option key={time}>{time}</option>)}</select></label>
            <label className="field field-full upload-field"><span>Upload drawings or photos (optional)</span><span className="upload-help">PDF/JPG/PNG up to 20 MB</span><input id="quote-attachment" type="file" accept="application/pdf,image/jpeg,image/png" aria-describedby={fileError ? "quote-file-error" : errorId} aria-invalid={Boolean(fileError)} onChange={(event) => void chooseFile(event.target.files?.[0])}/><span className="upload-button"><Upload size={17} aria-hidden="true"/>{attachment ? attachment.name : "Choose a file"}</span></label>
            {fileError && <p className="field-error field-full" id="quote-file-error" role="alert">{fileError}</p>}
            <label className="consent-check field-full"><input required type="checkbox" checked={form.consent} onChange={(event) => update("consent", event.target.checked)} aria-describedby={errorId} aria-invalid={Boolean(error)}/><span>I agree to Paceefik Engineering contacting me about this request. See our <a href="/privacy-policy">Privacy Policy</a>.</span></label>
          </div></fieldset>}
          {error && <p className="form-error" id="quote-form-error" role="alert">{error}</p>}
          <div className="form-navigation">{step > 0 && <button className="button button-outline" type="button" onClick={() => { setError(""); setStep((current) => current - 1); }}><ArrowLeft size={16} aria-hidden="true"/>Back</button>}{step < 3 ? <button className="button button-dark" type="button" onClick={next}>Next <ArrowRight size={16} aria-hidden="true"/></button> : <button className="button button-dark" type="submit" disabled={submitting}>{submitting ? siteConfig.systemMessages.formLoading : "Send my request"}{!submitting && <ArrowRight size={16} aria-hidden="true"/>}</button>}</div>
        </form>
        <div className="autosave-note"><span className="autosave-dot"/>Your answers are saved on this device if you leave and come back.</div>
        {whatsappHref && <a className="whatsapp-quick-quote" href={whatsappHref} target="_blank" rel="noreferrer">Send details on WhatsApp <ArrowRight size={15} aria-hidden="true"/></a>}
      </> : <section className="quote-success" aria-live="polite"><span className="success-mark"><Check size={28}/></span><p className="eyebrow">Request received</p><h2>Thank you, {form.name}.</h2><p>Your request number is <strong>{requestNumber}</strong>. A member of our team will contact you.</p><h3>Next steps</h3><ol><li>We review your details.</li><li>We call to understand your project.</li><li>We arrange a site visit if needed.</li></ol><nav aria-label="Useful next pages"><a href="/services">Explore Services</a><a href="/projects">View Our Projects</a></nav></section>}
    </div>
  </>;
}

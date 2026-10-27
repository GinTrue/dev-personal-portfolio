import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, CheckCircle2, Copy, LoaderCircle, Mail, MapPin, Phone, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/Button";
import profile from "@/data/profile.json";
import { buildContactEmail, buildEmailDrafts, getEmailConfiguration, getEmailFailure } from "@/lib/contactEmail";

const emailAddress = profile.email;
const projectTypes = ["Web development", "Business system", "Let’s connect"];
const emailConfiguration = getEmailConfiguration(import.meta.env);
const emailConfigured = emailConfiguration.configured;

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [projectType, setProjectType] = useState(projectTypes[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [copied, setCopied] = useState(false);
  const copyTimeout = useRef(null);
  const sending = useRef(false);
  const emailDrafts = buildEmailDrafts(buildContactEmail({ ...formData, projectType }, profile));
  useEffect(() => () => window.clearTimeout(copyTimeout.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      window.clearTimeout(copyTimeout.current);
      copyTimeout.current = window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setStatus({ type: "info", message: "You can email me at " + emailAddress + "." });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (sending.current) return;
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();
    if (name.length < 2 || message.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ type: "error", message: "Please add your name, a valid email address, and a message of at least 10 characters." });
      return;
    }
    if (!emailConfigured) {
      setStatus({ type: "info", message: "Your email draft is ready. Choose Gmail or your email app below, then send the message there." });
      return;
    }
    sending.current = true;
    setIsLoading(true);
    setStatus(null);
    try {
      await emailjs.send(
        emailConfiguration.serviceId,
        emailConfiguration.templateId,
        buildContactEmail({ name, email, message, projectType }, profile),
        { publicKey: emailConfiguration.publicKey },
      );
      setStatus({ type: "success", message: "Thanks for reaching out! Your message has been sent." });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      const failure = getEmailFailure(error);
      console.error("Portfolio contact delivery failed", { status: failure.code, reason: failure.detail });
      setStatus(failure);
    } finally {
      sending.current = false;
      setIsLoading(false);
    }
  };

  const updateField = (event) => {
    setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }));
    if (status) setStatus(null);
  };

  return (
    <section id="contact" className="section-spacing contact-section" aria-labelledby="contact-title">
      <div className="page-container">
        <div className="section-label" data-reveal><span>05 / WHAT’S NEXT?</span><span className="section-label-line" /></div>
        <div className="contact-layout">
          <div className="contact-copy" data-reveal><div className="availability"><span className="status-dot" /> Open to opportunities & collaborations</div><h2 id="contact-title">Have something<br />in mind?<br /><span className="text-accent">Let’s build it.</span></h2><p className="body-copy">A project, a role, or just a good conversation. I’d love to hear what you’re working on.</p><div className="contact-email"><a href={`mailto:${emailAddress}`}>{emailAddress}<ArrowUpRight size={19} /></a><button className="icon-button" aria-label={copied ? "Email address copied" : "Copy email address"} onClick={copyEmail}>{copied ? <Check size={16} /> : <Copy size={16} />}</button></div><span className="copy-feedback" role="status">{copied ? "Email address copied!" : ""}</span><div className="contact-facts"><span><MapPin size={16} /> {profile.location}</span><a href="tel:+639928137915"><Phone size={16} /> {profile.phone} <ArrowUpRight size={13} /></a></div></div>
          <form className="contact-form" onSubmit={handleSubmit} aria-busy={isLoading} data-reveal>
            <div className="form-heading"><h3>Start a conversation</h3><Mail size={20} /></div>
            <fieldset className="project-type-field" disabled={isLoading}><legend>I’m reaching out about</legend><div className="project-type-options">{projectTypes.map((type) => <button type="button" aria-pressed={projectType === type} onClick={() => setProjectType(type)} key={type}>{type}</button>)}</div></fieldset>
            <div className="form-row"><div className="form-field"><label htmlFor="contact-name">Your name <span>*</span></label><input disabled={isLoading} id="contact-name" name="name" autoComplete="name" placeholder="Alex Morgan" required minLength={2} maxLength={100} value={formData.name} onChange={updateField} /></div><div className="form-field"><label htmlFor="contact-email">Email address <span>*</span></label><input disabled={isLoading} id="contact-email" name="email" type="email" autoComplete="email" placeholder="alex@company.com" required maxLength={254} value={formData.email} onChange={updateField} /></div></div>
            <div className="form-field"><label htmlFor="contact-message">Tell me a little about it <span>*</span></label><textarea disabled={isLoading} id="contact-message" name="message" rows={5} placeholder="What are you looking to build? I’m all ears." required minLength={10} maxLength={2000} value={formData.message} onChange={updateField} aria-describedby="message-hint" /><div className="field-hint" id="message-hint"><span>A few details go a long way.</span><span>{formData.message.length}/2000</span></div></div>
            <Button type="submit" className="contact-submit" disabled={isLoading}>{isLoading ? <>Sending message <LoaderCircle size={17} className="spin" /></> : <>{emailConfigured ? "Send message" : "Prepare email draft"} {emailConfigured ? <Send size={16} /> : <ArrowUpRight size={17} />}</>}</Button>
            <p className="form-note">{emailConfigured ? "Straight to my inbox. I’ll get back to you personally." : "Prepare a draft, then choose where to send it below."}</p>
            <div className="form-status" role="status" aria-live="polite">{status && <div className={`status-message status-${status.type}`}>{status.type === "success" ? <CheckCircle2 size={18} /> : <Mail size={18} />}<p>{status.message}</p></div>}</div>
            {import.meta.env.DEV && status?.detail && <details className="contact-delivery-details"><summary>Delivery details</summary><p>{status.code ? `EmailJS ${status.code}: ` : ""}{status.detail}</p><p>Service: <code>{emailConfiguration.serviceId}</code><br />Template: <code>{emailConfiguration.templateId}</code></p>{status.recoveryHint && <><p>{status.recoveryHint}</p><a className="text-link" href="https://dashboard.emailjs.com/admin" target="_blank" rel="noopener noreferrer">Open EmailJS email services <ArrowUpRight size={18} /></a></>}</details>}
            <div className="contact-email-options"><p>Prefer to send it from your own inbox?</p><div><a className="text-link" href={emailDrafts.gmail} target="_blank" rel="noopener noreferrer">Open Gmail draft <ArrowUpRight size={18} /></a><a className="text-link" href={emailDrafts.mailto}>Use my email app <ArrowUpRight size={18} /></a></div></div>
          </form>
        </div>
      </div>
    </section>
  );
};

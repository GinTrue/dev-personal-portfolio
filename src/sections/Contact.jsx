import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, CheckCircle2, Copy, LoaderCircle, Mail, MapPin, Phone, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/Button";
import profile from "@/data/profile.json";

const emailAddress = profile.email;
const projectTypes = ["Web development", "Business system", "Let’s connect"];
const emailConfigured = Boolean(import.meta.env.VITE_EMAILJS_SERVICE_ID && import.meta.env.VITE_EMAILJS_TEMPLATE_ID && import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [projectType, setProjectType] = useState(projectTypes[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [copied, setCopied] = useState(false);
  const copyTimeout = useRef(null);
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
    if (isLoading) return;
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();
    if (name.length < 2 || message.length < 10) {
      setStatus({ type: "error", message: "Please add your name and a message of at least 10 characters." });
      return;
    }
    if (!emailConfigured) {
      const subject = encodeURIComponent(projectType + " — " + name);
      const body = encodeURIComponent(message + "\n\nFrom: " + name + "\nReply to: " + email);
      window.location.href = "mailto:" + emailAddress + "?subject=" + subject + "&body=" + body;
      setStatus({ type: "info", message: "Your email app will open with a draft. Send it there to complete your message, or email me directly using the address on this page." });
      return;
    }
    setIsLoading(true);
    setStatus(null);
    try {
      await emailjs.send(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, {
        name, email, message: "[" + projectType + "]\n\n" + message,
      }, import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
      setStatus({ type: "success", message: "Thanks for reaching out! Your message has been sent." });
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus({ type: "error", message: "Your message couldn’t be sent. Please try again or email me directly at " + emailAddress + "." });
    } finally {
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
          <form className="contact-form" onSubmit={handleSubmit} data-reveal>
            <div className="form-heading"><h3>Start a conversation</h3><Mail size={20} /></div>
            <fieldset className="project-type-field"><legend>I’m reaching out about</legend><div className="project-type-options">{projectTypes.map((type) => <button type="button" aria-pressed={projectType === type} onClick={() => setProjectType(type)} key={type}>{type}</button>)}</div></fieldset>
            <div className="form-row"><div className="form-field"><label htmlFor="contact-name">Your name <span>*</span></label><input id="contact-name" name="name" autoComplete="name" placeholder="Alex Morgan" required minLength={2} maxLength={100} value={formData.name} onChange={updateField} /></div><div className="form-field"><label htmlFor="contact-email">Email address <span>*</span></label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="alex@company.com" required maxLength={254} value={formData.email} onChange={updateField} /></div></div>
            <div className="form-field"><label htmlFor="contact-message">Tell me a little about it <span>*</span></label><textarea id="contact-message" name="message" rows={5} placeholder="What are you looking to build? I’m all ears." required minLength={10} maxLength={2000} value={formData.message} onChange={updateField} aria-describedby="message-hint" /><div className="field-hint" id="message-hint"><span>A few details go a long way.</span><span>{formData.message.length}/2000</span></div></div>
            <Button type="submit" className="contact-submit" disabled={isLoading}>{isLoading ? <>Sending message <LoaderCircle size={17} className="spin" /></> : <>{emailConfigured ? "Send message" : "Open email draft"} {emailConfigured ? <Send size={16} /> : <ArrowUpRight size={17} />}</>}</Button>
            <p className="form-note">{emailConfigured ? "Straight to my inbox. I’ll get back to you personally." : "Opens your email app with your message ready to send."}</p>
            <div className="form-status" role="status" aria-live="polite">{status && <div className={`status-message status-${status.type}`}>{status.type === "success" ? <CheckCircle2 size={18} /> : <Mail size={18} />}<p>{status.message}</p></div>}</div>
          </form>
        </div>
      </div>
    </section>
  );
};

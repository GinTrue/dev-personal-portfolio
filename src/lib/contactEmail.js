const clean = (value) => typeof value === "string" ? value.trim() : "";
const isConfigured = (value) => Boolean(value) && !/^(?:your_|replace_|change_me|example_|placeholder)/i.test(value);

export function getEmailConfiguration(env) {
  const serviceId = clean(env.VITE_EMAILJS_SERVICE_ID);
  const templateId = clean(env.VITE_EMAILJS_TEMPLATE_ID);
  const publicKey = clean(env.VITE_EMAILJS_PUBLIC_KEY);
  return { serviceId, templateId, publicKey, configured: [serviceId, templateId, publicKey].every(isConfigured) };
}

export function buildContactEmail({ name, email, message, projectType }, recipient, timestamp = new Date()) {
  const senderName = clean(name).replace(/[\r\n]+/g, " ");
  const senderEmail = clean(email);
  const title = `Portfolio inquiry: ${projectType} — ${senderName}`;
  const body = `${clean(message)}\n\nFrom: ${senderName}\nReply to: ${senderEmail}\nProject type: ${projectType}`;
  return {
    // Preserve the original Contact Us variables and support custom templates.
    name: senderName,
    email: senderEmail,
    message: body,
    title,
    subject: title,
    time: timestamp.toISOString(),
    from_name: senderName,
    from_email: senderEmail,
    reply_to: senderEmail,
    to_name: recipient.name,
    to_email: recipient.email,
    project_type: projectType,
  };
}

export function buildEmailDrafts(params) {
  const gmail = new URLSearchParams({ view: "cm", fs: "1", to: params.to_email, su: params.subject, body: params.message });
  return { mailto: `mailto:${params.to_email}?subject=${encodeURIComponent(params.subject)}&body=${encodeURIComponent(params.message)}`, gmail: `https://mail.google.com/mail/?${gmail}` };
}

export function getEmailFailure(error) {
  const code = Number(error?.status) || 0;
  const detail = clean(typeof error === "string" ? error : error?.text || error?.message) || "The email service did not return an error description.";
  let message;
  if (code === 429) {
    message = "Too many messages were sent recently. Please wait a minute before trying again. Your message is still here, and you can use an email option below.";
  } else if (!code && /fetch|network|offline|connection/i.test(detail)) {
    message = "Couldn’t connect to the email service. Check your connection and try again, or use an email option below. Your message is still here.";
  } else {
    message = `The email service couldn’t send your message${code ? ` (error ${code})` : ""}. Your message is still here. Please use an email option below or try again later.`;
  }
  const recoveryHint = code === 412 && /invalid grant|reconnect.*gmail/i.test(detail)
    ? "Reconnect the Gmail account in your existing EmailJS email service, then save the service. Keep its current service ID."
    : "";
  return { type: "error", message, code, detail, recoveryHint };
}

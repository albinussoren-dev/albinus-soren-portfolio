 "use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [state, setState] = useState<{ busy: boolean; message: string; error: boolean }>({ busy: false, message: "", error: false });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setState({ busy: true, message: "", error: false });
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      topic: String(data.get("topic") || "Something else"),
      message: String(data.get("message") || ""),
      website: String(data.get("website") || "")
    };
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not send your message.");
      form.reset();
      setState({ busy: false, message: "Message received — thank you! I’ll get back to you when I can.", error: false });
    } catch (error) {
      setState({ busy: false, message: error instanceof Error ? error.message : "Something went wrong. Please email me directly.", error: true });
    }
  }

  return <form className="contact-form" onSubmit={submit}>
    <div className="form-row"><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" autoComplete="name" minLength={1} maxLength={100} placeholder="What should I call you?" required /></div>
    <div className="form-row"><label htmlFor="contact-email">Your email</label><input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} placeholder="you@example.com" required /></div>
    <div className="form-row"><label htmlFor="contact-topic">What would you like to discuss?</label><select id="contact-topic" name="topic"><option>Project collaboration</option><option>Freelance opportunity</option><option>Tech / AI discussion</option><option>Something else</option></select></div>
    <div className="form-row"><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" rows={4} minLength={3} maxLength={5000} placeholder="Tell me a little about it..." required /></div>
    <div className="honeypot" aria-hidden="true"><label htmlFor="contact-website">Leave this empty</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <button className="button primary submit-button" type="submit" disabled={state.busy}>{state.busy ? "Sending…" : "Send message"} <span>↗</span></button>
    <p className={`form-note ${state.error ? "error" : ""}`} aria-live="polite">{state.message || "Your message is sent securely to the portfolio inbox."}</p>
  </form>;
}
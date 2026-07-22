import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

export default function ContactForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();

    if (!FORMSPREE_ENDPOINT) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    const form = e.target;

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div id="contact-form" className="rounded-xl bg-surface p-8">
      <h2 className="text-center font-heading text-2xl font-semibold text-foreground">
        {t("contactHeading")}
      </h2>
      <p className="mx-auto mt-4 mb-6 max-w-xl text-center text-base leading-relaxed text-foreground/90">
        {t("contactIntro")}
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-foreground/80">
            {t("contactName")}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="rounded-md border border-foreground/15 bg-background px-3 py-2 text-base text-foreground focus:border-accent focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-foreground/80">
            {t("contactEmail")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded-md border border-foreground/15 bg-background px-3 py-2 text-base text-foreground focus:border-accent focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-sm font-medium text-foreground/80">
            {t("contactMessage")}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="resize-none rounded-md border border-foreground/15 bg-background px-3 py-2 text-base text-foreground focus:border-accent focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="hover-lift self-start rounded-full bg-accent px-6 py-2 text-sm font-medium text-tag-text transition-colors hover:bg-accent-glow disabled:opacity-60"
        >
          {status === "sending" ? t("contactSending") : t("contactSubmit")}
        </button>

        {status === "success" && (
          <p role="status" className="text-sm text-accent">
            {t("contactSuccess")}
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="text-sm text-accent">
            {t("contactError")}
          </p>
        )}
      </form>
    </div>
  );
}

"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useReduced } from "@/hooks/use-reduced-motion";
import { Check, AlertCircle, Loader2 } from "lucide-react";
import { services, packages, site } from "@/lib/site";
import { springMove, springSheet } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ============================================================================
   ENQUIRY FORM
   ----------------------------------------------------------------------------
   The single most valuable object on the site, and the one most production
   studios get wrong by replacing with an Instagram DM link.

   Design decisions that matter:

   · IT ASKS FOR BUDGET. Not to be rude — to stop wasting the enquirer's time.
     A band, not a number, so nobody has to commit to a figure to send a form.
   · VALIDATION IS INLINE AND ON BLUR, never on submit. Being told about six
     problems at once, after you thought you were finished, is the worst
     feedback pattern on the web.
   · FIELDS ARE GROUPED BY WHAT THEY ARE FOR, so the form reads as three short
     questions rather than one long interrogation.
   · IT DEGRADES TO EMAIL. If the API is not configured yet, the submit hands
     back a fully pre-filled mailto so the enquiry still reaches the studio.
     A contact form that silently drops leads is worse than no form.
   ========================================================================== */

const BUDGETS = [
  "Under $2,500",
  "$2,500 – $6,500",
  "$6,500 – $15,000",
  "$15,000+",
  "Not sure yet",
] as const;

type Field = "name" | "email" | "projectType" | "budget" | "timing" | "message";

type FormState = Record<Field, string>;

const EMPTY: FormState = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  timing: "",
  message: "",
};

function validate(values: FormState): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {};
  if (!values.name.trim()) errors.name = "We need something to call you.";
  if (!values.email.trim()) {
    errors.email = "We need somewhere to reply.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "That address does not look complete.";
  }
  if (!values.projectType) errors.projectType = "Pick the closest one.";
  if (values.message.trim().length < 12) {
    errors.message = "A sentence or two about the project, so the reply is useful.";
  }
  return errors;
}

export function EnquiryForm() {
  const params = useSearchParams();
  const reduced = useReduced();

  const [values, setValues] = useState<FormState>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "fallback">("idle");

  const errors = useMemo(() => validate(values), [values]);

  // Deep link from the pricing cards: /contact?package=The%20EP
  useEffect(() => {
    const pkg = params.get("package");
    const service = params.get("service");
    if (pkg && packages.some((p) => p.name === pkg)) {
      const match = packages.find((p) => p.name === pkg);
      setValues((v) => ({
        ...v,
        budget: v.budget || bandForPackage(match?.from ?? 0),
        message: v.message || `Interested in ${pkg}. `,
      }));
    }
    if (service && services.some((s) => s.slug === service)) {
      const match = services.find((s) => s.slug === service);
      setValues((v) => ({ ...v, projectType: v.projectType || match!.title }));
    }
  }, [params]);

  function set(field: Field, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function blur(field: Field) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  /** Everything the studio needs, pre-composed, for the no-backend fallback. */
  const mailto = useMemo(() => {
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Project: ${values.projectType}`,
      `Budget: ${values.budget || "Not specified"}`,
      `Timing: ${values.timing || "Not specified"}`,
      "",
      values.message,
    ].join("\n");
    return `mailto:${site.contact.bookingEmail}?subject=${encodeURIComponent(
      `Enquiry — ${values.projectType || "Project"}`
    )}&body=${encodeURIComponent(body)}`;
  }, [values]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      projectType: true,
      budget: true,
      timing: true,
      message: true,
    });
    if (Object.keys(errors).length > 0) {
      // Move focus to the first problem rather than just colouring it red.
      const first = document.querySelector<HTMLElement>("[data-invalid='true']");
      first?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      setStatus(res.ok ? "sent" : "fallback");
    } catch {
      setStatus("fallback");
    }
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springMove}
        className="material-card rounded-xl p-10 text-center"
        role="status"
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-tungsten">
          <Check className="h-6 w-6 text-negative" strokeWidth={2.5} aria-hidden="true" />
        </span>
        <h2 className="t-h3 mt-6">That is with us.</h2>
        <p className="t-body mx-auto mt-3 max-w-md">
          You will hear back within one business day, from a person, with either
          a straight answer or a good question. If it is urgent, call{" "}
          <a href={site.contact.phoneHref} className="text-tungsten hover:underline">
            {site.contact.phone}
          </a>
          .
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-10">
      {/* --- Who --- */}
      <fieldset className="flex flex-col gap-5">
        <legend className="t-slate mb-4 text-tungsten">01 — Who you are</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="name"
            label="Name"
            value={values.name}
            error={touched.name ? errors.name : undefined}
            onChange={(v) => set("name", v)}
            onBlur={() => blur("name")}
            autoComplete="name"
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            value={values.email}
            error={touched.email ? errors.email : undefined}
            onChange={(v) => set("email", v)}
            onBlur={() => blur("email")}
            autoComplete="email"
          />
        </div>
      </fieldset>

      {/* --- What --- */}
      <fieldset>
        <legend className="t-slate mb-4 text-tungsten">02 — What you need</legend>

        <div
          className="flex flex-wrap gap-2"
          role="radiogroup"
          aria-label="Project type"
          aria-invalid={Boolean(touched.projectType && errors.projectType)}
        >
          {services.map((s) => {
            const active = values.projectType === s.title;
            return (
              <button
                key={s.slug}
                type="button"
                role="radio"
                aria-checked={active}
                data-invalid={touched.projectType && errors.projectType ? "true" : undefined}
                onClick={() => {
                  set("projectType", s.title);
                  blur("projectType");
                }}
                className={cn(
                  "relative rounded-full border px-4 py-2.5 text-[0.9375rem] transition-colors duration-200",
                  "active:scale-[0.97] active:duration-100",
                  active
                    ? "border-transparent text-negative"
                    : "border-negative-edge text-ink-2 hover:border-ink-3 hover:text-ink"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="type-pill"
                    className="absolute inset-0 rounded-full bg-tungsten"
                    transition={springMove}
                  />
                )}
                <span className="relative z-10">{s.title}</span>
              </button>
            );
          })}
        </div>
        <FieldError message={touched.projectType ? errors.projectType : undefined} />

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <SelectField
            id="budget"
            label="Budget"
            hint="A band is fine. It saves us both a call."
            value={values.budget}
            options={BUDGETS as unknown as string[]}
            onChange={(v) => set("budget", v)}
          />
          <TextField
            id="timing"
            label="Timing"
            hint="A date, a month, or “as soon as possible”."
            value={values.timing}
            onChange={(v) => set("timing", v)}
            onBlur={() => blur("timing")}
          />
        </div>
      </fieldset>

      {/* --- Detail --- */}
      <fieldset>
        <legend className="t-slate mb-4 text-tungsten">03 — The project</legend>
        <TextField
          id="message"
          label="What is it for?"
          hint="What has to happen because this exists? That is the only question we really need answered."
          value={values.message}
          error={touched.message ? errors.message : undefined}
          onChange={(v) => set("message", v)}
          onBlur={() => blur("message")}
          multiline
        />
      </fieldset>

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className={cn(
            "group inline-flex items-center justify-center gap-2 self-start rounded-full bg-tungsten px-8 py-4",
            "font-medium text-negative transition-colors duration-200 hover:bg-tungsten-soft",
            "active:scale-[0.97] active:duration-100 disabled:opacity-60"
          )}
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending
            </>
          ) : (
            "Send enquiry"
          )}
        </button>

        <p className="t-slate text-ink-3">
          No mailing list, no CRM sequence. One reply from one person.
        </p>

        {/* Graceful degradation, stated plainly rather than hidden. */}
        <AnimatePresence>
          {status === "fallback" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={reduced ? { duration: 0.15 } : springSheet}
              className="overflow-hidden"
              role="alert"
            >
              <div className="material-card mt-2 flex items-start gap-3 rounded-lg p-5">
                <AlertCircle
                  className="mt-0.5 h-4 w-4 shrink-0 text-tungsten"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <p className="t-body">
                  The form could not reach the server. Nothing is lost —{" "}
                  <a href={mailto} className="text-tungsten underline">
                    send it as an email instead
                  </a>
                  , already filled in, or write to{" "}
                  <a
                    href={`mailto:${site.contact.bookingEmail}`}
                    className="text-tungsten underline"
                  >
                    {site.contact.bookingEmail}
                  </a>
                  .
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

/* --------------------------------------------------------------------------
   FIELD PRIMITIVES
   The label is always visible. Placeholder-as-label disappears the moment
   someone starts typing, which is exactly when they most need to know what
   they are filling in.
   ------------------------------------------------------------------------ */

function TextField({
  id,
  label,
  hint,
  value,
  error,
  onChange,
  onBlur,
  type = "text",
  multiline = false,
  autoComplete,
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  type?: string;
  multiline?: boolean;
  autoComplete?: string;
}) {
  const invalid = Boolean(error);
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`]
    .filter(Boolean)
    .join(" ");

  const shared = {
    id,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    onBlur,
    "aria-invalid": invalid,
    "aria-describedby": describedBy || undefined,
    "data-invalid": invalid ? "true" : undefined,
    autoComplete,
    className: cn(
      "w-full rounded-lg border bg-negative-lift px-4 py-3.5 text-ink",
      "placeholder:text-ink-3 transition-colors duration-200",
      "focus:border-tungsten focus:outline-none focus-visible:outline-none",
      invalid ? "border-tungsten-deep" : "border-negative-edge"
    ),
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[0.9375rem] font-medium text-ink">
        {label}
      </label>
      {hint && (
        <span id={`${id}-hint`} className="text-[0.8125rem] leading-snug text-ink-3">
          {hint}
        </span>
      )}
      {multiline ? (
        <textarea {...shared} rows={5} className={cn(shared.className, "resize-y")} />
      ) : (
        <input {...shared} type={type} />
      )}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function SelectField({
  id,
  label,
  hint,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[0.9375rem] font-medium text-ink">
        {label}
      </label>
      {hint && (
        <span id={`${id}-hint`} className="text-[0.8125rem] leading-snug text-ink-3">
          {hint}
        </span>
      )}
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className={cn(
          "w-full appearance-none rounded-lg border border-negative-edge bg-negative-lift",
          "px-4 py-3.5 text-ink transition-colors duration-200",
          "focus:border-tungsten focus:outline-none",
          !value && "text-ink-3"
        )}
      >
        <option value="">Select a range</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-negative-lift text-ink">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function FieldError({ id, message }: { id?: string; message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="text-[0.8125rem] text-tungsten"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

/** Map a package's starting price onto the budget band that contains it. */
function bandForPackage(from: number) {
  if (from >= 15000) return "$15,000+";
  if (from >= 6500) return "$6,500 – $15,000";
  if (from >= 2500) return "$2,500 – $6,500";
  return "Under $2,500";
}

"use client"

import emailjs from "@emailjs/browser"
import { CheckCircle2, Loader2, Mail, MessageSquare, Send, Tag, User, XCircle } from "lucide-react"
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react"

import { ctaPrimaryClassName } from "@/components/site/site-styles"
import { getEmailJsConfig, isEmailJsConfigured } from "@/lib/emailjs"
import { profileEmail } from "@/lib/site"
import { cn } from "@/lib/utils"

type FormStatus = { type: "success" | "error"; message: string } | null

function FieldShell({
  icon,
  children,
  className,
  iconClassName,
}: {
  icon: ReactNode
  children: ReactNode
  className?: string
  iconClassName?: string
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10",
        "bg-[rgba(8,12,26,0.78)] shadow-[0_8px_32px_rgba(0,0,0,0.18)]",
        "transition-[border-color,box-shadow] duration-300",
        "focus-within:border-white/20 focus-within:shadow-[0_12px_36px_rgba(0,0,0,0.28),0_0_24px_rgba(59,130,246,0.1)]",
        className,
      )}
    >
      <span
        className="pointer-events-none absolute top-0 right-0 left-0 h-px scale-x-0 bg-gradient-to-r from-blue-500/80 via-violet-500/80 to-sky-500/80 transition-transform duration-300 group-focus-within:scale-x-100"
        aria-hidden="true"
      />
      <span
        className={cn(
          "pointer-events-none absolute left-3.5 z-[1] text-slate-500 transition-colors group-focus-within:text-blue-300",
          iconClassName ?? "top-1/2 -translate-y-1/2",
        )}
      >
        {icon}
      </span>
      {children}
    </div>
  )
}

const inputClassName =
  "w-full bg-transparent py-3.5 pr-4 pl-11 text-sm text-white outline-none placeholder:text-slate-500 sm:text-[0.95rem]"

type ContactFormProps = {
  formId?: string
  className?: string
}

const PROJECT_QUICK_TYPES = [
  "Full-Stack Web / SaaS App",
  "AI / Automation Integration",
  "POS / CRM / Custom Dashboard",
  "Next.js Frontend & SEO",
  "Contract / Ongoing Engineering",
] as const

export function ContactForm({ formId = "contact-form", className }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const subjectInputRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<FormStatus>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedQuickType, setSelectedQuickType] = useState<string | null>(null)

  useEffect(() => {
    const { publicKey } = getEmailJsConfig()
    if (publicKey) {
      emailjs.init({ publicKey })
    }

    if (typeof window !== "undefined" && subjectInputRef.current) {
      const params = new URLSearchParams(window.location.search)
      const projectParam = params.get("project")?.trim()
      if (projectParam && !subjectInputRef.current.value) {
        subjectInputRef.current.value = `Project Inquiry: ${projectParam}`
      }
    }
  }, [])

  function selectQuickType(type: string) {
    setSelectedQuickType(type)
    if (subjectInputRef.current) {
      subjectInputRef.current.value = `Project Inquiry: ${type}`
      subjectInputRef.current.focus()
    }
  }

  function openMailtoFallback(name: string, email: string, subject: string, message: string) {
    const body = `Hi Tayyab,\n\n${message}\n\nBest regards,\n${name}\n${email}`
    const mailtoUrl = `mailto:${profileEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoUrl
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus(null)

    const form = formRef.current
    if (!form) return

    const data = new FormData(form)
    const name = String(data.get("user_name") ?? "").trim()
    const email = String(data.get("user_email") ?? "").trim()
    const subject = String(data.get("subject") ?? "").trim()
    const message = String(data.get("message") ?? "").trim()

    if (!name) {
      setStatus({ type: "error", message: "Please enter your name." })
      return
    }
    if (!email) {
      setStatus({ type: "error", message: "Please enter your email address." })
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ type: "error", message: "Please enter a valid email address." })
      return
    }
    if (!subject) {
      setStatus({ type: "error", message: "Please select a project type or enter a subject." })
      return
    }
    if (!message) {
      setStatus({ type: "error", message: "Please enter a brief overview of your project." })
      return
    }

    if (!isEmailJsConfigured()) {
      openMailtoFallback(name, email, subject, message)
      setStatus({
        type: "success",
        message: `Opening your email client to send directly to ${profileEmail}. You usually get a reply within a few hours.`,
      })
      return
    }

    const { serviceId, templateId, publicKey } = getEmailJsConfig()
    setIsSubmitting(true)

    try {
      await emailjs.sendForm(serviceId, templateId, form, { publicKey })
      setStatus({
        type: "success",
        message: "Thank you! Your project inquiry was sent. I will review it and reply within a few hours.",
      })
      form.reset()
      setSelectedQuickType(null)
    } catch {
      openMailtoFallback(name, email, subject, message)
      setStatus({
        type: "error",
        message: `Form service was unreachable, so we opened your email client addressed to ${profileEmail}.`,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      ref={formRef}
      id={formId}
      onSubmit={handleSubmit}
      className={cn("space-y-4", className)}
      aria-label="Contact form"
      noValidate
    >
      <div>
        <p className="mb-2 text-xs font-medium text-slate-400">
          What can I help you build? <span className="text-slate-500">(Click to quick-select)</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {PROJECT_QUICK_TYPES.map((type) => {
            const isSelected = selectedQuickType === type
            return (
              <button
                key={type}
                type="button"
                onClick={() => selectQuickType(type)}
                className={cn(
                  "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                  isSelected
                    ? "border-cyan-400/70 bg-cyan-500/15 text-cyan-200 shadow-[0_0_16px_rgba(34,211,238,0.2)]"
                    : "border-white/12 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:bg-white/[0.07] hover:text-white",
                )}
              >
                {type}
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className="sr-only">
            Your name
          </label>
          <FieldShell icon={<User className="size-[1.05rem]" strokeWidth={2} />}>
            <input
              id={`${formId}-name`}
              type="text"
              name="user_name"
              required
              autoComplete="name"
              placeholder="Your name"
              className={inputClassName}
            />
          </FieldShell>
        </div>
        <div>
          <label htmlFor={`${formId}-email`} className="sr-only">
            Your email
          </label>
          <FieldShell icon={<Mail className="size-[1.05rem]" strokeWidth={2} />}>
            <input
              id={`${formId}-email`}
              type="email"
              name="user_email"
              required
              autoComplete="email"
              placeholder="Your work email"
              className={inputClassName}
            />
          </FieldShell>
        </div>
      </div>

      <div>
        <label htmlFor={`${formId}-subject`} className="sr-only">
          Subject
        </label>
        <FieldShell icon={<Tag className="size-[1.05rem]" strokeWidth={2} />}>
          <input
            ref={subjectInputRef}
            id={`${formId}-subject`}
            type="text"
            name="subject"
            required
            onChange={() => {
              if (selectedQuickType) setSelectedQuickType(null)
            }}
            placeholder="Subject (e.g., SaaS MVP, Custom POS/CRM, React/Next.js build)"
            className={inputClassName}
          />
        </FieldShell>
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className="sr-only">
          Message
        </label>
        <FieldShell
          icon={<MessageSquare className="size-[1.05rem]" strokeWidth={2} />}
          iconClassName="top-4"
        >
          <textarea
            id={`${formId}-message`}
            name="message"
            required
            rows={5}
            placeholder="Tell me briefly about your product idea, timeline, or technical goals…"
            className={cn(inputClassName, "min-h-[140px] resize-y pt-3.5")}
          />
        </FieldShell>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(ctaPrimaryClassName, "w-full justify-center disabled:opacity-60")}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden="true" />
            Send Project Inquiry
          </>
        )}
      </button>

      {status && (
        <div
          role="alert"
          className={cn(
            "flex gap-3 rounded-xl border px-4 py-3 text-sm",
            status.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
              : "border-red-500/30 bg-red-500/10 text-red-200",
          )}
        >
          {status.type === "success" ? (
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          ) : (
            <XCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          )}
          <p>{status.message}</p>
        </div>
      )}
    </form>
  )
}

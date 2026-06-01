/** EmailJS — same field names as the legacy portfolio form (`user_name`, `user_email`, `subject`, `message`). */
export function getEmailJsConfig() {
  return {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
  }
}

export function isEmailJsConfigured() {
  const { serviceId, templateId, publicKey } = getEmailJsConfig()
  return Boolean(serviceId && templateId && publicKey)
}

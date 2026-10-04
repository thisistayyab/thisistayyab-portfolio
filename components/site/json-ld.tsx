type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[]
}

/**
 * JSON-LD must not contain raw `<` — CMS-authored strings (blog posts) could close
 * the script tag early and inject markup. Escaping `<` as \u003c is the approach
 * recommended by the Next.js JSON-LD guide.
 */
function serializeJsonLd(data: Record<string, unknown> | Record<string, unknown>[]) {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  )
}

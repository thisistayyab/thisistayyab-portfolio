import { imageAvifPath, imageWebpPath } from "@/lib/image"
import { cn } from "@/lib/utils"

type OptimizedPictureProps = {
  src: string
  alt: string
  title?: string
  width?: number
  height?: number
  /** Fill the parent (parent must be `position: relative` + sized). */
  fill?: boolean
  className?: string
  pictureClassName?: string
  priority?: boolean
  sizes?: string
  itemProp?: string
}

/**
 * Static AVIF + WebP from /public — fast LCP, no extra Next image pipeline hop.
 */
export function OptimizedPicture({
  src,
  alt,
  title,
  width,
  height,
  className,
  pictureClassName,
  fill = false,
  priority = false,
  sizes,
  itemProp,
}: OptimizedPictureProps) {
  const avif = imageAvifPath(src)
  const webp = imageWebpPath(src)

  return (
    <picture
      className={cn(
        fill ? "absolute inset-0 block h-full w-full" : "block",
        pictureClassName,
      )}
    >
      <source srcSet={avif} type="image/avif" sizes={sizes} />
      <source srcSet={webp} type="image/webp" sizes={sizes} />
      <img
        src={webp}
        alt={alt}
        title={title}
        {...(fill ? {} : { width, height })}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : undefined}
        className={cn(
          fill && "h-full w-full min-h-full min-w-full object-cover object-center",
          className,
        )}
        itemProp={itemProp}
      />
    </picture>
  )
}

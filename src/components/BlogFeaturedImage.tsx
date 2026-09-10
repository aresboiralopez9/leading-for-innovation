import Image from 'next/image'

interface BlogFeaturedImageProps {
  src?: string | null
  alt?: string | null
}

export function BlogFeaturedImage({
  src,
  alt,
}: BlogFeaturedImageProps) {
  if (!src) {
    return null
  }

  return (
    <div className="mt-10 mb-12 overflow-hidden rounded-2xl">
      <div className="relative aspect-[16/8.5] w-full">
        <Image
          src={src}
          alt={alt || ''}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 900px"
          priority
        />
      </div>
    </div>
  )
}

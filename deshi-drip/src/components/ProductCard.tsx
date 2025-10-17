import Link from 'next/link'
import Image from 'next/image'
import { formatPriceFromCents } from '@/lib/format'

export type ProductCardProps = {
  slug: string
  name: string
  priceCents: number
  currency?: string
  image?: string
  brandName?: string
  worldExclusive?: boolean
}

export function ProductCard({ slug, name, priceCents, currency = 'USD', image, brandName, worldExclusive }: ProductCardProps) {
  return (
    <Link href={`/product/${slug}`} className="group block rounded-lg overflow-hidden border border-black/10 hover:shadow-md transition-shadow bg-white dark:bg-black">
      <div className="relative aspect-square overflow-hidden">
        {image ? (
          <Image src={image} alt={name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full bg-gray-100 dark:bg-gray-800" />
        )}
        {worldExclusive && (
          <span className="absolute top-2 left-2 text-xs font-semibold bg-amber-500 text-black px-2 py-1 rounded">World Exclusive</span>
        )}
      </div>
      <div className="p-3">
        {brandName && <div className="text-xs text-gray-500 uppercase tracking-wide">{brandName}</div>}
        <div className="font-medium truncate">{name}</div>
        <div className="text-sm text-gray-700 dark:text-gray-300">{formatPriceFromCents(priceCents, currency)}</div>
      </div>
    </Link>
  )
}

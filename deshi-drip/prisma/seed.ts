import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function nextFridayAtNoon(): Date {
  const now = new Date()
  const day = now.getDay() // 0=Sun ... 5=Fri
  const diffToFriday = (5 - day + 7) % 7 || 7
  const target = new Date(now)
  target.setDate(now.getDate() + diffToFriday)
  target.setHours(12, 0, 0, 0)
  return target
}

async function main() {
  // Brands
  const brands = await prisma.$transaction([
    prisma.brand.upsert({
      where: { slug: 'zeroone' },
      update: {},
      create: { slug: 'zeroone', name: 'ZeroOne', description: 'Deshi Drip Brand 01' },
    }),
    prisma.brand.upsert({
      where: { slug: 'zerotwo' },
      update: {},
      create: { slug: 'zerotwo', name: 'ZeroTwo', description: 'Deshi Drip Brand 02' },
    }),
    prisma.brand.upsert({
      where: { slug: 'zerothree' },
      update: {},
      create: { slug: 'zerothree', name: 'ZeroThree', description: 'Deshi Drip Brand 03' },
    }),
    prisma.brand.upsert({
      where: { slug: 'zerofour' },
      update: {},
      create: { slug: 'zerofour', name: 'ZeroFour', description: 'Deshi Drip Brand 04' },
    }),
  ])

  const brandBySlug = new Map(brands.map((b) => [b.slug, b]))

  // Helper to make product variants
  const makeVariants = (baseSlug: string, basePrice: number) => [
    { sku: `${baseSlug}-S`, title: 'Size S', stock: 20, priceCents: basePrice },
    { sku: `${baseSlug}-M`, title: 'Size M', stock: 30, priceCents: basePrice },
    { sku: `${baseSlug}-L`, title: 'Size L', stock: 25, priceCents: basePrice },
  ]

  // Sample products per brand
  const sampleProductsData = [
    {
      brand: 'zeroone',
      items: [
        { slug: 'zo-core-tee', name: 'ZeroOne Core Tee', priceCents: 2999, worldExclusive: true },
        { slug: 'zo-cap', name: 'ZeroOne Cap', priceCents: 2499 },
        { slug: 'zo-hoodie', name: 'ZeroOne Hoodie', priceCents: 5999 },
      ],
    },
    {
      brand: 'zerotwo',
      items: [
        { slug: 'zt-core-tee', name: 'ZeroTwo Core Tee', priceCents: 2999 },
        { slug: 'zt-joggers', name: 'ZeroTwo Joggers', priceCents: 5499, worldExclusive: true },
        { slug: 'zt-cap', name: 'ZeroTwo Cap', priceCents: 2499 },
      ],
    },
    {
      brand: 'zerothree',
      items: [
        { slug: 'zth-crewneck', name: 'ZeroThree Crewneck', priceCents: 4999 },
        { slug: 'zth-socks', name: 'ZeroThree Socks', priceCents: 1299 },
        { slug: 'zth-beanie', name: 'ZeroThree Beanie', priceCents: 1999 },
      ],
    },
    {
      brand: 'zerofour',
      items: [
        { slug: 'zf-core-tee', name: 'ZeroFour Core Tee', priceCents: 2999 },
        { slug: 'zf-cap', name: 'ZeroFour Cap', priceCents: 2499 },
        { slug: 'zf-hoodie', name: 'ZeroFour Hoodie', priceCents: 5999, worldExclusive: true },
      ],
    },
  ] as const

  const createdProducts: { [slug: string]: { id: number } } = {}

  for (const group of sampleProductsData) {
    const brand = brandBySlug.get(group.brand)!
    for (const item of group.items) {
      const images = [
        `https://picsum.photos/seed/${item.slug}/800/800`,
        `https://picsum.photos/seed/${item.slug}-2/800/800`,
      ]
      const product = await prisma.product.upsert({
        where: { slug: item.slug },
        update: {},
        create: {
          slug: item.slug,
          name: item.name,
          brandId: brand.id,
          priceCents: item.priceCents,
          currency: 'USD',
          images,
          worldExclusive: Boolean((item as any).worldExclusive),
          variants: {
            create: makeVariants(item.slug, item.priceCents),
          },
        },
      })
      createdProducts[item.slug] = { id: product.id }
    }
  }

  // Weekly drop scheduled for next Friday
  const releaseAt = nextFridayAtNoon()
  const drop = await prisma.drop.upsert({
    where: { slug: 'weekly-drop-1' },
    update: {},
    create: {
      slug: 'weekly-drop-1',
      title: 'Weekly Drop 1',
      description: 'Fresh picks dropping this Friday',
      releaseAt,
      isWeekly: true,
      products: {
        create: [
          { productId: createdProducts['zo-core-tee'].id, position: 1 },
          { productId: createdProducts['zt-joggers'].id, position: 2 },
          { productId: createdProducts['zf-hoodie'].id, position: 3 },
        ],
      },
    },
  })

  // Bundle: Core Tee + Cap (any brand)
  await prisma.bundle.upsert({
    where: { slug: 'tee-and-cap' },
    update: {},
    create: {
      slug: 'tee-and-cap',
      title: 'Tee + Cap Bundle',
      description: 'Save 15% when you buy a tee and a cap',
      discountPercent: 15,
      items: {
        create: [
          { productId: createdProducts['zo-core-tee']?.id ?? createdProducts['zf-core-tee'].id, quantity: 1 },
          { productId: createdProducts['zo-cap']?.id ?? createdProducts['zt-cap'].id, quantity: 1 },
        ],
      },
      active: true,
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

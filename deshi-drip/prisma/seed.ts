import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data in correct order for SQLite foreign keys
  await prisma.cartItem.deleteMany({});
  await prisma.cart.deleteMany({});
  await prisma.bundleItem.deleteMany({});
  await prisma.bundle.deleteMany({});
  await prisma.dropProduct.deleteMany({});
  await prisma.drop.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.brand.deleteMany({});

  // Create 4 brands
  const brands = await prisma.$transaction([
    prisma.brand.create({ data: { name: 'zeroone', slug: 'zeroone', description: 'Zero One brand' } }),
    prisma.brand.create({ data: { name: 'zerotwo', slug: 'zerotwo', description: 'Zero Two brand' } }),
    prisma.brand.create({ data: { name: 'zerothree', slug: 'zerothree', description: 'Zero Three brand' } }),
    prisma.brand.create({ data: { name: 'zerofour', slug: 'zerofour', description: 'Zero Four brand' } }),
  ]);

  const [zeroone, zerotwo, zerothree, zerofour] = brands;

  // Helper to create a product with images and variants
  async function createProduct(params: {
    name: string;
    slug: string;
    brandId: string;
    basePriceCents: number;
    isWorldExclusive?: boolean;
    colors?: string[];
    sizes?: string[];
  }) {
    const { name, slug, brandId, basePriceCents, isWorldExclusive = false, colors = ['Black'], sizes = ['S','M','L','XL'] } = params;

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        brandId,
        basePriceCents,
        isWorldExclusive,
        images: {
          create: [
            { url: `https://picsum.photos/seed/${slug}-1/800/800`, alt: `${name} image 1`, position: 0 },
            { url: `https://picsum.photos/seed/${slug}-2/800/800`, alt: `${name} image 2`, position: 1 },
          ],
        },
      },
    });

    const variants: { sku: string; size: string; color: string; priceCents: number; stock: number }[] = [];
    for (const color of colors) {
      for (const size of sizes) {
        variants.push({
          sku: `${slug}-${color.substring(0,3).toUpperCase()}-${size}`,
          size,
          color,
          priceCents: basePriceCents,
          stock: 10,
        });
      }
    }

    await prisma.productVariant.createMany({
      data: variants.map(v => ({
        productId: product.id,
        sku: v.sku,
        size: v.size,
        color: v.color,
        priceCents: v.priceCents,
        stock: v.stock,
      })),
    });

    return product;
  }

  // Create sample products per brand
  const p1 = await createProduct({ name: 'Zeroone Tee', slug: 'zeroone-tee', brandId: zeroone.id, basePriceCents: 3500 });
  const p2 = await createProduct({ name: 'Zeroone Hoodie', slug: 'zeroone-hoodie', brandId: zeroone.id, basePriceCents: 6500, colors: ['Black','White'] });
  const p3 = await createProduct({ name: 'Zerotwo Cap', slug: 'zerotwo-cap', brandId: zerotwo.id, basePriceCents: 2500, isWorldExclusive: true });
  const p4 = await createProduct({ name: 'Zerothree Shorts', slug: 'zerothree-shorts', brandId: zerothree.id, basePriceCents: 4500 });
  const p5 = await createProduct({ name: 'Zerofour Jacket', slug: 'zerofour-jacket', brandId: zerofour.id, basePriceCents: 12000, isWorldExclusive: true });

  // Create a bundle including a tee and a cap
  await prisma.bundle.create({
    data: {
      title: 'Starter Street Bundle',
      slug: 'starter-street-bundle',
      description: 'A tee + cap at a special price',
      bundlePriceCents: 5000,
      items: {
        create: [
          { productId: p1.id, quantity: 1 },
          { productId: p3.id, quantity: 1 },
        ],
      },
    },
  });

  // Create weekly drops for the next 3 weeks
  const now = new Date();
  const weekMs = 7 * 24 * 60 * 60 * 1000;

  await prisma.drop.create({
    data: {
      title: 'Week 1 Drop',
      slug: 'week-1-drop',
      description: 'First weekly drop',
      dropDate: new Date(now.getTime() + weekMs),
      products: {
        create: [
          { productId: p2.id, isPrimary: true },
          { productId: p4.id },
        ],
      },
    },
  });

  await prisma.drop.create({
    data: {
      title: 'Week 2 Drop',
      slug: 'week-2-drop',
      description: 'Second weekly drop',
      dropDate: new Date(now.getTime() + 2 * weekMs),
      products: {
        create: [
          { productId: p5.id, isPrimary: true },
          { productId: p1.id },
        ],
      },
    },
  });

  await prisma.drop.create({
    data: {
      title: 'Week 3 Drop',
      slug: 'week-3-drop',
      description: 'Third weekly drop',
      dropDate: new Date(now.getTime() + 3 * weekMs),
      products: {
        create: [
          { productId: p3.id, isPrimary: true },
          { productId: p2.id },
        ],
      },
    },
  });

  console.log('Seed completed.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

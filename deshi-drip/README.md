## Deshi Drip

An e-commerce site inspired by Culture Kings, with 4 brands (ZeroOne, ZeroTwo, ZeroThree, ZeroFour), Weekly Drops, Bundles, and World Exclusives.

### Tech
- Next.js App Router, TypeScript, Tailwind CSS
- Prisma + SQLite (local dev)
- Zustand cart store

### Setup
```bash
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run db:seed
npm run dev
```

### Features
- Weekly Drops listing and homepage section
- World Exclusives collection
- Brand pages and product detail pages
- Cart with simple bundle discount (Tee + Cap = 15% off cheapest)
- Basic admin listings for Drops and Bundles

### Routes
- `/` homepage (Weekly Drop, Exclusives, Bundles)
- `/brands/[slug]`
- `/product/[slug]`
- `/drops/weekly`
- `/exclusives`
- `/search?q=`
- `/cart`
- `/admin` (read-only lists)

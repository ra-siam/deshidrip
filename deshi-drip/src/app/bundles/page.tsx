import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCurrencyFromCents } from "@/lib/currency";

export default async function BundlesPage() {
  const bundles = await prisma.bundle.findMany({ where: { isActive: true }, orderBy: { title: "asc" } });
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Bundles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bundles.map((b) => (
          <Link key={b.id} href={`/bundles/${b.slug}`} className="border rounded-lg p-4 hover:shadow-sm">
            <div className="font-medium">{b.title}</div>
            <div className="text-zinc-600 text-sm">{formatCurrencyFromCents(b.bundlePriceCents)}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

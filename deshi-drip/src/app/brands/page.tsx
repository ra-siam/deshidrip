import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function BrandsPage() {
  const brands = await prisma.brand.findMany({ where: { isActive: true }, orderBy: { name: "asc" } });
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Brands</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {brands.map((br) => (
          <Link href={`/brands/${br.slug}`} key={br.id} className="border rounded-lg p-4 hover:shadow-sm text-center">
            <div className="font-medium">{br.name}</div>
            {br.description && <div className="text-xs text-zinc-600 mt-1 line-clamp-2">{br.description}</div>}
          </Link>
        ))}
      </div>
    </div>
  );
}

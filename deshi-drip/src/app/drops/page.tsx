import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

export default async function DropsPage() {
  const drops = await prisma.drop.findMany({
    where: { isActive: true },
    orderBy: { dropDate: "asc" },
    include: { products: { include: { product: true } } },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Weekly Drops</h1>
      <div className="space-y-4">
        {drops.map((d) => (
          <div key={d.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-zinc-600">{format(new Date(d.dropDate), "PPPP")}</div>
                <Link href={`/drops/${d.slug}`} className="text-lg font-semibold hover:underline">{d.title}</Link>
              </div>
              <div className="text-sm text-zinc-600">{d.products.length} items</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { prisma } from '@/lib/prisma'

export default async function AdminDrops() {
  const drops = await prisma.drop.findMany({ include: { products: { include: { product: true } } }, orderBy: { releaseAt: 'desc' } })
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Drops</h1>
      <div className="space-y-4">
        {drops.map((d) => (
          <div key={d.id} className="border rounded p-4">
            <div className="font-semibold">{d.title}</div>
            <div className="text-sm text-gray-600">{new Date(d.releaseAt).toLocaleString()}</div>
            <div className="text-sm">{d.products.length} products</div>
          </div>
        ))}
      </div>
    </div>
  )
}

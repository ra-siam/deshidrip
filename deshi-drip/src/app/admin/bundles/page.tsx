import { prisma } from '@/lib/prisma'

export default async function AdminBundles() {
  const bundles = await prisma.bundle.findMany({ include: { items: { include: { product: true } } }, orderBy: { title: 'asc' } })
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Bundles</h1>
      <div className="space-y-4">
        {bundles.map((b) => (
          <div key={b.id} className="border rounded p-4">
            <div className="font-semibold">{b.title}</div>
            {b.description && <div className="text-sm text-gray-600">{b.description}</div>}
            <div className="text-sm text-gray-600">{b.items.length} items</div>
          </div>
        ))}
      </div>
    </div>
  )
}

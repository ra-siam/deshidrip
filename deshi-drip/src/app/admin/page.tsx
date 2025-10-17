import Link from 'next/link'

export default function AdminHome() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Admin</h1>
      <ul className="list-disc pl-5">
        <li><Link href="/admin/drops">Manage Drops</Link></li>
        <li><Link href="/admin/bundles">Manage Bundles</Link></li>
      </ul>
    </div>
  )
}

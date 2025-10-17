import Link from "next/link";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
      <aside className="border rounded-lg p-4 space-y-2 h-fit">
        <div className="font-semibold mb-2">Admin</div>
        <nav className="text-sm space-y-1">
          <Link href="/admin" className="underline">Dashboard</Link>
          <div className="pt-2" />
          <Link href="/admin/brands" className="underline">Brands</Link>
          <Link href="/admin/products" className="underline">Products</Link>
          <Link href="/admin/drops" className="underline">Drops</Link>
        </nav>
      </aside>
      <section>{children}</section>
    </div>
  );
}

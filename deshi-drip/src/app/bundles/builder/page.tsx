import Link from "next/link";

export default function BundleBuilderPage() {
  // Placeholder builder; real logic could filter products by tags/categories
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <h1 className="text-2xl font-bold">Build Your Bundle</h1>
        <Link href="/bundles" className="text-sm underline">All bundles</Link>
      </div>
      <p className="text-zinc-600">Pick 2-3 items for a special price. (Coming soon)</p>
      <div className="rounded-lg border p-6 text-sm text-zinc-500">Interactive builder UI is a placeholder for now.</div>
    </div>
  );
}

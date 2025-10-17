import Link from 'next/link'

export function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 backdrop-blur bg-background/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-extrabold tracking-tight text-xl">Deshi Drip</Link>
          <nav className="hidden md:flex items-center gap-4 text-sm text-gray-700 dark:text-gray-300">
            <Link href="/brands/zeroone" className="hover:underline">ZeroOne</Link>
            <Link href="/brands/zerotwo" className="hover:underline">ZeroTwo</Link>
            <Link href="/brands/zerothree" className="hover:underline">ZeroThree</Link>
            <Link href="/brands/zerofour" className="hover:underline">ZeroFour</Link>
            <Link href="/drops/weekly" className="hover:underline">Weekly Drops</Link>
            <Link href="/exclusives" className="hover:underline">Exclusives</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/search" className="text-sm hover:underline">Search</Link>
          <Link href="/cart" className="text-sm hover:underline">Cart</Link>
        </div>
      </div>
    </header>
  )
}

"use client"

import { Heart, Menu, Search, ShoppingCart, UserRound, X } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import Link from "next/link"

const categories = ['All Categories', 'Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports', 'Groceries']

export function SiteHeader() {

  const [query, setQuery] = useState('')
  const [cartCount, setCartCount] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All Categories')

  return (

    <>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-5 px-5 py-5 lg:px-8">
          <Button variant="ghost" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"><Menu /></Button>
          <Link href="/" className="shrink-0 text-2xl font-black tracking-tight text-[#172033]">market<span className="text-[#ff6b35]">lane</span><span className="text-[#ff6b35]">.</span></Link>
          <div className="relative hidden min-w-0 flex-1 md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for products, brands and more..." aria-label="Search products" className="h-12 w-full rounded-xl border border-slate-200 bg-[#f7f8fa] pl-12 pr-4 text-sm outline-none transition focus:border-[#ff6b35] focus:ring-4 focus:ring-orange-100" />
          </div>
          <nav className="hidden items-center gap-5 text-sm font-semibold text-slate-600 lg:flex">
            <Link href="#deals" className="hover:text-[#ff6b35]">Today's Deals</Link>
            <Link href="#categories" className="hover:text-[#ff6b35]">Categories</Link>
          </nav>
          <Button variant="ghost" aria-label="Account" className="hidden items-center gap-2 rounded-xl p-2 text-slate-600 hover:bg-slate-100 sm:flex"><UserRound size={21} /><span className="hidden xl:inline">Account</span></Button>
          <Button variant="ghost" aria-label="Wishlist" className="relative hidden rounded-xl p-2 text-slate-600 hover:bg-slate-100 sm:block"><Heart size={21} /></Button>
          <Button variant="ghost" aria-label="Shopping cart" onClick={() => setCartCount(cartCount + 1)} className="relative rounded-xl p-2 text-slate-700 hover:bg-slate-100"><ShoppingCart size={22} /><span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-[#ff6b35] text-[10px] font-bold text-white">{cartCount}</span></Button>
        </div>
        {menuOpen && <div className="fixed inset-0 z-20 bg-black/20 lg:hidden" onClick={() => setMenuOpen(false)}>  {/* If menu open is true it shows menu and this div is dark overlay */}
          <div className="h-full w-72 bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <span className="text-xl font-black">Menu</span>
              <Button onClick={() => setMenuOpen(false)}><X /></Button>
              </div>
              <div className="mt-8 flex flex-col gap-5 font-semibold text-slate-600">
                <Link href="#deals">Today&apos;s Deals</Link>
                <Link href="#categories">Categories</Link>
                <Link href="#products">Best sellers</Link>
              </div>
          </div>
        </div>}
          <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-5 pb-4 lg:px-8" id="categories">
         {categories.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${activeCategory === category ? 'bg-[#172033] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{category}</button>)}
       </div>

      </header>
      </>
  )
}

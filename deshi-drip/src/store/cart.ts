import { create } from 'zustand'

export type CartItem = {
  productSlug: string
  quantity: number
}

export type CartState = {
  items: CartItem[]
  addItem: (productSlug: string, quantity?: number) => void
  removeItem: (productSlug: string) => void
  clear: () => void
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (productSlug, quantity = 1) =>
    set((state) => {
      const existing = state.items.find((i) => i.productSlug === productSlug)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productSlug === productSlug ? { ...i, quantity: i.quantity + quantity } : i
          ),
        }
      }
      return { items: [...state.items, { productSlug, quantity }] }
    }),
  removeItem: (productSlug) => set((state) => ({ items: state.items.filter((i) => i.productSlug !== productSlug) })),
  clear: () => set({ items: [] }),
}))

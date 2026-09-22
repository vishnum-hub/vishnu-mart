import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { getProductById } from '../data/products.js'

const CartContext = createContext(null)
const STORAGE_KEY = 'vishnumart_cart_v1'

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { items: [] }
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed.items)) return { items: [] }
    return parsed
  } catch {
    return { items: [] }
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { productId, qty } = action
      const existing = state.items.find((i) => i.productId === productId)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, qty: i.qty + qty } : i
          ),
        }
      }
      return { items: [...state.items, { productId, qty }] }
    }
    case 'UPDATE_QTY': {
      const { productId, qty } = action
      if (qty <= 0) {
        return { items: state.items.filter((i) => i.productId !== productId) }
      }
      return {
        items: state.items.map((i) => (i.productId === productId ? { ...i, qty } : i)),
      }
    }
    case 'REMOVE':
      return { items: state.items.filter((i) => i.productId !== action.productId) }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // localStorage unavailable (e.g. private browsing) — cart just won't persist
    }
  }, [state])

  const lines = useMemo(
    () =>
      state.items
        .map((item) => {
          const product = getProductById(item.productId)
          if (!product) return null
          return { ...item, product }
        })
        .filter(Boolean),
    [state.items]
  )

  const itemCount = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines])
  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.qty * l.product.price, 0),
    [lines]
  )
  const shipping = subtotal === 0 || subtotal >= 1999 ? 0 : 79
  const total = subtotal + shipping

  const value = {
    lines,
    itemCount,
    subtotal,
    shipping,
    total,
    addToCart: (productId, qty = 1) => dispatch({ type: 'ADD', productId, qty }),
    updateQty: (productId, qty) => dispatch({ type: 'UPDATE_QTY', productId, qty }),
    removeFromCart: (productId) => dispatch({ type: 'REMOVE', productId }),
    clearCart: () => dispatch({ type: 'CLEAR' }),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}

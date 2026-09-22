import React, { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'

export default function Header({ view, onNavigate, searchTerm, onSearch }) {
  const { itemCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const showSearch = view === 'home' || view === 'products'

  const go = (v) => {
    onNavigate(v)
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="site-header__row">
        <button className="site-header__logo" onClick={() => go('home')} aria-label="VishnuMart home">
          <span className="site-header__logo-mark">V</span>
          VishnuMart
        </button>

        {showSearch && (
          <div className="site-header__search">
            <span className="site-header__search-icon" aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Search for products, brands and more"
              value={searchTerm}
              onChange={(e) => {
                onSearch(e.target.value)
                if (view !== 'products') onNavigate('products')
              }}
              aria-label="Search products"
            />
          </div>
        )}

        <nav className="site-header__nav">
          <button className={view === 'home' ? 'is-active' : ''} onClick={() => go('home')}>Home</button>
          <button className={view === 'products' ? 'is-active' : ''} onClick={() => go('products')}>Shop</button>
          <button className="site-header__cart" onClick={() => go('cart')} aria-label={`Cart, ${itemCount} items`}>
            <span aria-hidden="true">🛍</span>
            Cart
            {itemCount > 0 && <span className="site-header__cart-badge">{itemCount}</span>}
          </button>
        </nav>

        <button
          className="site-header__menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((m) => !m)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <div className="site-header__mobile-nav">
          <button className={view === 'home' ? 'is-active' : ''} onClick={() => go('home')}>Home</button>
          <button className={view === 'products' ? 'is-active' : ''} onClick={() => go('products')}>Shop</button>
          <button className={view === 'cart' ? 'is-active' : ''} onClick={() => go('cart')}>
            Cart {itemCount > 0 ? `(${itemCount})` : ''}
          </button>
        </div>
      )}
    </header>
  )
}

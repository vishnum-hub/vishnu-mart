import React from 'react'
import { categories } from '../data/products.js'

export default function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div className="site-footer__brand">
          <p className="site-footer__wordmark">VishnuMart</p>
          <p>Everyday products, chosen carefully and delivered without the fuss.</p>
        </div>
        <div>
          <h4>Shop</h4>
          <ul>
            {categories.slice(0, 4).map((c) => (
              <li key={c.id}>
                <button onClick={() => onNavigate('products', c.id)}>{c.name}</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Help</h4>
          <ul>
            <li><button onClick={() => onNavigate('products')}>Track an order</button></li>
            <li><button onClick={() => onNavigate('products')}>Shipping & returns</button></li>
            <li><button onClick={() => onNavigate('products')}>Contact support</button></li>
          </ul>
        </div>
        <div>
          <h4>This demo</h4>
          <p className="site-footer__note">
            A front-end only shopping demo. No real payments, accounts or orders are processed.
          </p>
        </div>
      </div>
      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} VishnuMart. Built for demonstration purposes.</span>
      </div>
    </footer>
  )
}

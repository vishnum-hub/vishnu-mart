import React from 'react'
import { useCart } from '../context/CartContext.jsx'
import QuantityStepper from '../components/QuantityStepper.jsx'

const currency = (n) => `₹${n.toLocaleString('en-IN')}`

export default function Cart({ onNavigate, onOpenProduct }) {
  const { lines, subtotal, shipping, total, updateQty, removeFromCart } = useCart()

  if (lines.length === 0) {
    return (
      <div className="page">
        <div className="empty-state">
          <p className="empty-state__icon" aria-hidden="true">🛍</p>
          <p className="empty-state__title">Your cart is empty.</p>
          <p>Add something you like — it'll show up here.</p>
          <button className="btn btn--primary" onClick={() => onNavigate('products')}>Start shopping</button>
        </div>
      </div>
    )
  }

  return (
    <div className="page page--cart">
      <h1>Your cart</h1>
      <div className="cart-layout">
        <ul className="cart-list">
          {lines.map(({ product, qty }) => (
            <li key={product.id} className="cart-line">
              <button className="cart-line__media" onClick={() => onOpenProduct(product.id)}>
                <img src={product.image} alt={product.name} />
              </button>
              <div className="cart-line__info">
                <button className="cart-line__name" onClick={() => onOpenProduct(product.id)}>
                  {product.name}
                </button>
                <p className="cart-line__category">{product.tagline}</p>
                <button className="cart-line__remove" onClick={() => removeFromCart(product.id)}>
                  Remove
                </button>
              </div>
              <div className="cart-line__qty">
                <QuantityStepper
                  qty={qty}
                  onChange={(newQty) => updateQty(product.id, newQty)}
                  max={product.stock}
                />
              </div>
              <div className="cart-line__price">{currency(product.price * qty)}</div>
            </li>
          ))}
        </ul>

        <aside className="order-summary">
          <h2>Order summary</h2>
          <div className="order-summary__row">
            <span>Subtotal</span>
            <span>{currency(subtotal)}</span>
          </div>
          <div className="order-summary__row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : currency(shipping)}</span>
          </div>
          {shipping > 0 && (
            <p className="order-summary__note">
              Add {currency(1999 - subtotal)} more for free shipping.
            </p>
          )}
          <div className="order-summary__row order-summary__row--total">
            <span>Total</span>
            <span>{currency(total)}</span>
          </div>
          <button className="btn btn--primary order-summary__checkout" onClick={() => onNavigate('checkout')}>
            Proceed to checkout
          </button>
          <button className="link-btn order-summary__continue" onClick={() => onNavigate('products')}>
            Continue shopping
          </button>
        </aside>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'

const currency = (n) => `₹${n.toLocaleString('en-IN')}`

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  pincode: '',
  payment: 'card',
}

function makeOrderNumber() {
  const rand = Math.floor(100000 + Math.random() * 900000)
  return `VM-${rand}`
}

export default function Checkout({ onOrderPlaced, onNavigate }) {
  const { lines, subtotal, shipping, total, clearCart } = useCart()
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  if (lines.length === 0) {
    return (
      <div className="page">
        <div className="empty-state">
          <p className="empty-state__title">There's nothing to check out yet.</p>
          <button className="btn btn--primary" onClick={() => onNavigate('products')}>Browse products</button>
        </div>
      </div>
    )
  }

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Enter your full name'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email'
    if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) next.phone = 'Enter a 10-digit phone number'
    if (!form.address.trim()) next.address = 'Enter your delivery address'
    if (!form.city.trim()) next.city = 'Enter your city'
    if (!/^\d{6}$/.test(form.pincode.trim())) next.pincode = 'Enter a 6-digit pincode'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const order = {
      orderNumber: makeOrderNumber(),
      placedAt: new Date().toISOString(),
      customer: { name: form.name, email: form.email, phone: form.phone },
      address: `${form.address}, ${form.city} ${form.pincode}`,
      payment: form.payment,
      lines: lines.map(({ product, qty }) => ({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty,
      })),
      subtotal,
      shipping,
      total,
    }

    clearCart()
    onOrderPlaced(order)
  }

  return (
    <div className="page page--checkout">
      <ol className="checkout-steps">
        <li className="is-done">1. Cart</li>
        <li className="is-active">2. Details</li>
        <li>3. Confirmation</li>
      </ol>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <h2>Delivery details</h2>

          <label>
            Full name
            <input type="text" value={form.name} onChange={update('name')} autoComplete="name" />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </label>

          <div className="form-row">
            <label>
              Email
              <input type="email" value={form.email} onChange={update('email')} autoComplete="email" />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </label>
            <label>
              Phone
              <input type="tel" value={form.phone} onChange={update('phone')} autoComplete="tel" placeholder="10-digit number" />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </label>
          </div>

          <label>
            Address
            <input type="text" value={form.address} onChange={update('address')} autoComplete="street-address" />
            {errors.address && <span className="field-error">{errors.address}</span>}
          </label>

          <div className="form-row">
            <label>
              City
              <input type="text" value={form.city} onChange={update('city')} autoComplete="address-level2" />
              {errors.city && <span className="field-error">{errors.city}</span>}
            </label>
            <label>
              Pincode
              <input type="text" value={form.pincode} onChange={update('pincode')} autoComplete="postal-code" placeholder="6-digit code" />
              {errors.pincode && <span className="field-error">{errors.pincode}</span>}
            </label>
          </div>

          <h2>Payment method</h2>
          <p className="checkout-form__note">This is a demo — no payment is actually processed.</p>
          <div className="payment-options">
            {[
              { id: 'card', label: 'Credit / debit card' },
              { id: 'upi', label: 'UPI' },
              { id: 'cod', label: 'Cash on delivery' },
            ].map((opt) => (
              <label key={opt.id} className={`payment-option${form.payment === opt.id ? ' payment-option--active' : ''}`}>
                <input
                  type="radio"
                  name="payment"
                  value={opt.id}
                  checked={form.payment === opt.id}
                  onChange={update('payment')}
                />
                {opt.label}
              </label>
            ))}
          </div>

          <button type="submit" className="btn btn--primary checkout-form__submit">
            Place order — {currency(total)}
          </button>
        </form>

        <aside className="order-summary">
          <h2>Order summary</h2>
          <ul className="order-summary__lines">
            {lines.map(({ product, qty }) => (
              <li key={product.id}>
                <img src={product.image} alt="" />
                <span className="order-summary__line-name">
                  {product.name} <span>× {qty}</span>
                </span>
                <span>{currency(product.price * qty)}</span>
              </li>
            ))}
          </ul>
          <div className="order-summary__row">
            <span>Subtotal</span>
            <span>{currency(subtotal)}</span>
          </div>
          <div className="order-summary__row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : currency(shipping)}</span>
          </div>
          <div className="order-summary__row order-summary__row--total">
            <span>Total</span>
            <span>{currency(total)}</span>
          </div>
        </aside>
      </div>
    </div>
  )
}

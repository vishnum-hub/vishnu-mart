import React from 'react'

const currency = (n) => `₹${n.toLocaleString('en-IN')}`

export default function OrderConfirmation({ order, onNavigate }) {
  if (!order) {
    return (
      <div className="page">
        <div className="empty-state">
          <p className="empty-state__title">No recent order to show.</p>
          <button className="btn btn--primary" onClick={() => onNavigate('products')}>Start shopping</button>
        </div>
      </div>
    )
  }

  const placedDate = new Date(order.placedAt)
  const estimate = new Date(placedDate.getTime() + 4 * 24 * 60 * 60 * 1000)

  return (
    <div className="page page--confirmation">
      <ol className="checkout-steps">
        <li className="is-done">1. Cart</li>
        <li className="is-done">2. Details</li>
        <li className="is-active">3. Confirmation</li>
      </ol>

      <div className="confirmation-card">
        <span className="confirmation-card__icon" aria-hidden="true">✓</span>
        <h1>Order placed</h1>
        <p>Thanks, {order.customer.name.split(' ')[0]} — a confirmation would normally be sent to {order.customer.email}.</p>

        <div className="confirmation-card__meta">
          <div>
            <span>Order number</span>
            <strong>{order.orderNumber}</strong>
          </div>
          <div>
            <span>Estimated delivery</span>
            <strong>
              {estimate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </strong>
          </div>
          <div>
            <span>Delivering to</span>
            <strong>{order.address}</strong>
          </div>
        </div>

        <ul className="confirmation-card__lines">
          {order.lines.map((line) => (
            <li key={line.id}>
              <img src={line.image} alt="" />
              <span className="order-summary__line-name">
                {line.name} <span>× {line.qty}</span>
              </span>
              <span>{currency(line.price * line.qty)}</span>
            </li>
          ))}
        </ul>

        <div className="order-summary__row order-summary__row--total">
          <span>Total paid</span>
          <span>{currency(order.total)}</span>
        </div>

        <button className="btn btn--primary" onClick={() => onNavigate('home')}>
          Continue shopping
        </button>
      </div>
    </div>
  )
}

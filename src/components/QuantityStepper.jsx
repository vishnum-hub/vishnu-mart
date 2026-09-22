import React from 'react'

export default function QuantityStepper({ qty, onChange, min = 1, max = 99 }) {
  return (
    <div className="qty-stepper">
      <button
        type="button"
        className="qty-stepper__btn"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, qty - 1))}
        disabled={qty <= min}
      >
        −
      </button>
      <span className="qty-stepper__value" aria-live="polite">{qty}</span>
      <button
        type="button"
        className="qty-stepper__btn"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, qty + 1))}
        disabled={qty >= max}
      >
        +
      </button>
    </div>
  )
}

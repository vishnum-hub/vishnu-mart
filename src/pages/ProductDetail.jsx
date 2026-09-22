import React, { useState } from 'react'
import { getProductById } from '../data/products.js'
import StarRating from '../components/StarRating.jsx'
import QuantityStepper from '../components/QuantityStepper.jsx'
import { useCart } from '../context/CartContext.jsx'

const currency = (n) => `₹${n.toLocaleString('en-IN')}`

export default function ProductDetail({ productId, onNavigate, onBack, onAdded }) {
  const product = getProductById(productId)
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <div className="page">
        <div className="empty-state">
          <p className="empty-state__title">We couldn't find that product.</p>
          <button className="btn btn--primary" onClick={() => onNavigate('products')}>Back to shop</button>
        </div>
      </div>
    )
  }

  const discount = product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0

  return (
    <div className="page page--detail">
      <button className="back-link" onClick={onBack}>← Back</button>

      <div className="product-detail">
        <div className="product-detail__media">
          <img src={product.image} alt={product.name} />
          {discount > 0 && <span className="product-card__badge">{discount}% off</span>}
        </div>

        <div className="product-detail__info">
          <p className="product-detail__category">{product.tagline}</p>
          <h1>{product.name}</h1>
          <StarRating rating={product.rating} reviews={product.reviews} />

          <div className="product-detail__price-row">
            <span className="product-detail__price">{currency(product.price)}</span>
            {product.mrp > product.price && (
              <>
                <span className="product-card__mrp">{currency(product.mrp)}</span>
                <span className="product-detail__discount">{discount}% off</span>
              </>
            )}
          </div>

          <p className="product-detail__description">{product.description}</p>

          <ul className="product-detail__specs">
            {product.specs.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          <p className={`stock-note ${product.stock < 10 ? 'stock-note--low' : ''}`}>
            {product.stock < 10 ? `Only ${product.stock} left in stock` : 'In stock'}
          </p>

          <div className="product-detail__actions">
            <QuantityStepper qty={qty} onChange={setQty} max={product.stock} />
            <button
              className="btn btn--primary product-detail__add"
              onClick={() => {
                addToCart(product.id, qty)
                onAdded?.(product)
              }}
            >
              Add {qty > 1 ? `${qty} ` : ''}to cart
            </button>
          </div>

          <button className="btn btn--ghost product-detail__cart-link" onClick={() => onNavigate('cart')}>
            View cart
          </button>
        </div>
      </div>
    </div>
  )
}

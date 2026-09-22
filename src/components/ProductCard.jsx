import React from 'react'
import StarRating from './StarRating.jsx'
import { useCart } from '../context/CartContext.jsx'

const currency = (n) => `₹${n.toLocaleString('en-IN')}`

export default function ProductCard({ product, onOpen, onAdded }) {
  const { addToCart } = useCart()
  const discount = product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0

  return (
    <article className="product-card">
      <button className="product-card__media" onClick={() => onOpen(product.id)} aria-label={`View ${product.name}`}>
        <img src={product.image} alt={product.name} loading="lazy" />
        {discount > 0 && <span className="product-card__badge">{discount}% off</span>}
      </button>
      <div className="product-card__body">
        <p className="product-card__category">{product.tagline}</p>
        <button className="product-card__name" onClick={() => onOpen(product.id)}>
          {product.name}
        </button>
        <StarRating rating={product.rating} reviews={product.reviews} size="sm" />
        <div className="product-card__price-row">
          <span className="product-card__price">{currency(product.price)}</span>
          {product.mrp > product.price && <span className="product-card__mrp">{currency(product.mrp)}</span>}
        </div>
        <button
          type="button"
          className="btn btn--secondary product-card__add"
          onClick={() => {
            addToCart(product.id, 1)
            onAdded?.(product)
          }}
        >
          Add to cart
        </button>
      </div>
    </article>
  )
}

import React from 'react'
import { categories, products } from '../data/products.js'
import CategoryChip from '../components/CategoryChip.jsx'
import StarRating from '../components/StarRating.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { useCart } from '../context/CartContext.jsx'

const currency = (n) => `₹${n.toLocaleString('en-IN')}`

export default function Home({ onNavigate, onOpenProduct, onAdded }) {
  const { addToCart } = useCart()
  const featured = products.filter((p) => p.featured)
  const [heroPick, ...restFeatured] = featured

  return (
    <div className="page page--home">
      <section className="hero">
        <div className="hero__copy">
          <p className="hero__kicker">New this week</p>
          <h1>
            Good things,
            <br />
            for everyday life.
          </h1>
          <p className="hero__sub">
            Fifteen carefully chosen products across electronics, fashion, home
            and more — picked for quality, not just for sale.
          </p>
          <div className="hero__actions">
            <button className="btn btn--primary" onClick={() => onNavigate('products')}>
              Shop all products
            </button>
            <button className="btn btn--ghost" onClick={() => onNavigate('products', 'electronics')}>
              Browse electronics
            </button>
          </div>
        </div>

        {heroPick && (
          <div className="hero__pick">
            <span className="hero__pick-label">Today's pick</span>
            <button className="hero__pick-media" onClick={() => onOpenProduct(heroPick.id)}>
              <img src={heroPick.image} alt={heroPick.name} />
            </button>
            <div className="hero__pick-info">
              <p className="hero__pick-name">{heroPick.name}</p>
              <StarRating rating={heroPick.rating} reviews={heroPick.reviews} size="sm" />
              <div className="hero__pick-price">
                <span>{currency(heroPick.price)}</span>
                {heroPick.mrp > heroPick.price && <span className="hero__pick-mrp">{currency(heroPick.mrp)}</span>}
              </div>
              <button
                className="btn btn--primary hero__pick-add"
                onClick={() => {
                  addToCart(heroPick.id, 1)
                  onAdded?.(heroPick)
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="category-rail">
        <div className="category-rail__scroll">
          {categories.map((c) => (
            <CategoryChip
              key={c.id}
              icon={c.icon}
              label={c.name}
              onClick={() => onNavigate('products', c.id)}
            />
          ))}
        </div>
      </section>

      {restFeatured.length > 0 && (
        <section className="section">
          <div className="section__head">
            <h2>Featured this week</h2>
            <button className="link-btn" onClick={() => onNavigate('products')}>View all</button>
          </div>
          <div className="featured-grid">
            {restFeatured.slice(0, 2).map((p) => (
              <ProductCard key={p.id} product={p} onOpen={onOpenProduct} onAdded={onAdded} />
            ))}
            {restFeatured.slice(2, 3).map((p) => (
              <ProductCard key={p.id} product={p} onOpen={onOpenProduct} onAdded={onAdded} />
            ))}
          </div>
        </section>
      )}

      <section className="trust-strip">
        <div>
          <strong>Free shipping</strong>
          <span>On orders over ₹1,999</span>
        </div>
        <div>
          <strong>Easy 7-day returns</strong>
          <span>Change your mind, no questions asked</span>
        </div>
        <div>
          <strong>Secure checkout</strong>
          <span>Your details stay on your device in this demo</span>
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <h2>Shop by category</h2>
        </div>
        <div className="category-grid">
          {categories.map((c) => {
            const sample = products.find((p) => p.category === c.id)
            return (
              <button key={c.id} className="category-card" onClick={() => onNavigate('products', c.id)}>
                <img src={sample?.image} alt="" />
                <span className="category-card__overlay">
                  <span className="category-card__icon">{c.icon}</span>
                  {c.name}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <h2>All products</h2>
          <button className="link-btn" onClick={() => onNavigate('products')}>View all</button>
        </div>
        <div className="product-grid">
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} onOpen={onOpenProduct} onAdded={onAdded} />
          ))}
        </div>
      </section>
    </div>
  )
}

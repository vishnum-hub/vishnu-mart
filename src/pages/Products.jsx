import React, { useMemo, useState } from 'react'
import { categories, products } from '../data/products.js'
import CategoryChip from '../components/CategoryChip.jsx'
import ProductCard from '../components/ProductCard.jsx'

const SORTS = [
  { id: 'relevance', label: 'Relevance' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'rating', label: 'Rating' },
]

export default function Products({ activeCategory, onCategoryChange, searchTerm, onOpenProduct, onAdded }) {
  const [sort, setSort] = useState('relevance')

  const filtered = useMemo(() => {
    let list = products
    if (activeCategory) list = list.filter((p) => p.category === activeCategory)
    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }
    const sorted = [...list]
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
    if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating)
    return sorted
  }, [activeCategory, searchTerm, sort])

  const activeCategoryName = categories.find((c) => c.id === activeCategory)?.name

  return (
    <div className="page page--products">
      <div className="section__head">
        <h1>{activeCategoryName || 'All products'}</h1>
        <select
          className="sort-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort products"
        >
          {SORTS.map((s) => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
      </div>

      <div className="category-rail category-rail--filters">
        <div className="category-rail__scroll">
          <CategoryChip label="All" active={!activeCategory} onClick={() => onCategoryChange(null)} />
          {categories.map((c) => (
            <CategoryChip
              key={c.id}
              icon={c.icon}
              label={c.name}
              active={activeCategory === c.id}
              onClick={() => onCategoryChange(c.id)}
            />
          ))}
        </div>
      </div>

      {searchTerm.trim() && (
        <p className="products-meta">
          {filtered.length} result{filtered.length === 1 ? '' : 's'} for "{searchTerm.trim()}"
        </p>
      )}

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state__title">No products match your search.</p>
          <p>Try a different keyword or browse a category instead.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={onOpenProduct} onAdded={onAdded} />
          ))}
        </div>
      )}
    </div>
  )
}

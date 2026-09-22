import React from 'react'

export default function StarRating({ rating, reviews, size = 'md' }) {
  const stars = [0, 1, 2, 3, 4]
  return (
    <span className={`star-rating star-rating--${size}`} aria-label={`Rated ${rating} out of 5`}>
      {stars.map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i))
        return (
          <span className="star" key={i}>
            <span className="star__base">★</span>
            <span className="star__fill" style={{ width: `${fill * 100}%` }}>★</span>
          </span>
        )
      })}
      {typeof reviews === 'number' && <span className="star-rating__reviews">({reviews})</span>}
    </span>
  )
}

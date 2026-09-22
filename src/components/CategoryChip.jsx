import React from 'react'

export default function CategoryChip({ icon, label, active, onClick }) {
  return (
    <button type="button" className={`category-chip${active ? ' category-chip--active' : ''}`} onClick={onClick}>
      {icon && <span className="category-chip__icon">{icon}</span>}
      {label}
    </button>
  )
}

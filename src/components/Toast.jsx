import React, { useEffect } from 'react'

export default function Toast({ message, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 2200)
    return () => clearTimeout(t)
  }, [onDismiss])

  if (!message) return null

  return (
    <div className="toast" role="status">
      <span className="toast__icon">✓</span>
      {message}
    </div>
  )
}

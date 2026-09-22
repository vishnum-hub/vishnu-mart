import React, { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Toast from './components/Toast.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import OrderConfirmation from './pages/OrderConfirmation.jsx'

export default function App() {
  const [view, setView] = useState('home')
  const [activeCategory, setActiveCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [lastOrder, setLastOrder] = useState(null)
  const [toastMessage, setToastMessage] = useState('')
  const [historyStack, setHistoryStack] = useState(['home'])

  const navigate = (nextView, category) => {
    if (nextView === 'products' && category !== undefined) {
      setActiveCategory(category)
      if (category) setSearchTerm('')
    }
    setView(nextView)
    setHistoryStack((stack) => [...stack, nextView])
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openProduct = (id) => {
    setSelectedProductId(id)
    setView('product')
    setHistoryStack((stack) => [...stack, 'product'])
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goBack = () => {
    setHistoryStack((stack) => {
      if (stack.length <= 1) {
        setView('products')
        return ['home', 'products']
      }
      const nextStack = stack.slice(0, -1)
      setView(nextStack[nextStack.length - 1])
      return nextStack
    })
  }

  const handleAdded = (product) => {
    setToastMessage(`${product.name} added to cart`)
  }

  const handleOrderPlaced = (order) => {
    setLastOrder(order)
    navigate('confirmation')
  }

  return (
    <div className="app-shell">
      <Header
        view={view}
        onNavigate={navigate}
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
      />

      <main>
        {view === 'home' && (
          <Home onNavigate={navigate} onOpenProduct={openProduct} onAdded={handleAdded} />
        )}

        {view === 'products' && (
          <Products
            activeCategory={activeCategory}
            onCategoryChange={(cat) => setActiveCategory(cat)}
            searchTerm={searchTerm}
            onOpenProduct={openProduct}
            onAdded={handleAdded}
          />
        )}

        {view === 'product' && (
          <ProductDetail
            productId={selectedProductId}
            onNavigate={navigate}
            onBack={goBack}
            onAdded={handleAdded}
          />
        )}

        {view === 'cart' && (
          <Cart onNavigate={navigate} onOpenProduct={openProduct} />
        )}

        {view === 'checkout' && (
          <Checkout onOrderPlaced={handleOrderPlaced} onNavigate={navigate} />
        )}

        {view === 'confirmation' && (
          <OrderConfirmation order={lastOrder} onNavigate={navigate} />
        )}
      </main>

      <Footer onNavigate={navigate} />

      <Toast message={toastMessage} onDismiss={() => setToastMessage('')} />
    </div>
  )
}

import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

const CART_STORAGE_KEY = 'fragria_cart_items'
const PROMO_STORAGE_KEY = 'fragria_promo_code'

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [promoCode, setPromoCode] = useState(() => {
    try {
      return localStorage.getItem(PROMO_STORAGE_KEY) || ''
    } catch {
      return ''
    }
  })
  const [discountPercent, setDiscountPercent] = useState(() => {
    try {
      const code = localStorage.getItem(PROMO_STORAGE_KEY)
      return code && code.toUpperCase() === 'FRAGRIA20' ? 20 : 0
    } catch {
      return 0
    }
  })
  const [toastMessage, setToastMessage] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    } catch {
      // storage unavailable
    }
  }, [cart])

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 2800)
  }

  const addToCart = (perfume, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === perfume.id)
      if (existing) {
        return prev.map((item) =>
          item.id === perfume.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      }
      return [
        ...prev,
        {
          id: perfume.id,
          name: perfume.name,
          price: perfume.price,
          volume: perfume.volume || '50ml',
          bottle: perfume.bottle,
          notes: perfume.notes || [],
          quantity,
        },
      ]
    })
    showToast(`Added ${perfume.name} to cart`)
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean)
    )
  }

  const applyPromo = (code) => {
    const clean = code.trim().toUpperCase()
    if (clean === 'FRAGRIA20') {
      setPromoCode('FRAGRIA20')
      setDiscountPercent(20)
      localStorage.setItem(PROMO_STORAGE_KEY, 'FRAGRIA20')
      showToast('20% discount applied!')
      return { success: true, message: '20% off your order has been applied!' }
    }
    return { success: false, message: 'Invalid promo code. Try "FRAGRIA20".' }
  }

  const removePromo = () => {
    setPromoCode('')
    setDiscountPercent(0)
    localStorage.removeItem(PROMO_STORAGE_KEY)
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem(CART_STORAGE_KEY)
  }

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0)
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const discountAmount = Number(((subtotal * discountPercent) / 100).toFixed(2))
  const freeShippingThreshold = 75
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 9.99
  const total = Number((subtotal - discountAmount + shippingFee).toFixed(2))

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        promoCode,
        discountPercent,
        discountAmount,
        applyPromo,
        removePromo,
        clearCart,
        totalCount,
        subtotal,
        freeShippingThreshold,
        shippingFee,
        total,
        toastMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

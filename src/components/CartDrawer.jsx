import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useModal } from '../context/ModalContext'
import { FaTrash, FaPlus, FaMinus, FaTimes, FaShoppingBag, FaTag, FaCheckCircle } from 'react-icons/fa'
import './CartDrawer.css'

const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    promoCode,
    discountPercent,
    discountAmount,
    applyPromo,
    removePromo,
    subtotal,
    freeShippingThreshold,
    shippingFee,
    total,
    totalCount,
  } = useCart()

  const { openModal } = useModal()
  const [inputCode, setInputCode] = useState('')
  const [promoError, setPromoError] = useState('')

  if (!isCartOpen) return null

  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100)
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal)

  const handleApplyPromo = (e) => {
    e.preventDefault()
    if (!inputCode.trim()) return
    const res = applyPromo(inputCode)
    if (!res.success) {
      setPromoError(res.message)
    } else {
      setPromoError('')
      setInputCode('')
    }
  }

  const handleCheckout = () => {
    closeCart()
    openModal('checkout')
  }

  return (
    <div className="cart-backdrop" onClick={closeCart}>
      <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <div className="cart-title-wrap">
            <FaShoppingBag className="cart-header-icon" />
            <h3>Your Bag</h3>
            <span className="cart-count-pill">{totalCount}</span>
          </div>
          <button className="cart-close-btn" onClick={closeCart} aria-label="Close cart">
            <FaTimes />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="cart-shipping-meter">
          <div className="shipping-meter-text">
            {remainingForFreeShipping > 0 ? (
              <span>
                Add <strong>${remainingForFreeShipping.toFixed(2)}</strong> for <strong>Free Shipping</strong>
              </span>
            ) : (
              <span className="free-shipping-unlocked">
                <FaCheckCircle /> <strong>Free Shipping Unlocked!</strong>
              </span>
            )}
          </div>
          <div className="shipping-progress-bar">
            <div className="shipping-progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Items list or empty state */}
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <div className="cart-empty-icon">
                <FaShoppingBag />
              </div>
              <h4>Your bag is empty</h4>
              <p>Discover our organic fragrances crafted in small artisanal batches.</p>
              <button
                className="cart-shop-now-btn"
                onClick={() => {
                  closeCart()
                  const el = document.getElementById('best-sellers')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Shop Best Sellers
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-media">
                  <img src={item.bottle} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <div className="cart-item-top">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <button
                      className="cart-item-remove"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                  <span className="cart-item-meta">{item.volume} • Eau de Parfum</span>
                  <div className="cart-item-bottom">
                    <div className="cart-qty-ctrl">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label="Decrease quantity"
                      >
                        <FaMinus size={10} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label="Increase quantity"
                      >
                        <FaPlus size={10} />
                      </button>
                    </div>
                    <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {cart.length > 0 && (
          <div className="cart-footer">
            {/* Promo Code input */}
            <form className="cart-promo-form" onSubmit={handleApplyPromo}>
              <div className="cart-promo-input-wrap">
                <FaTag className="cart-promo-icon" />
                <input
                  type="text"
                  placeholder="Promo code (FRAGRIA20)"
                  value={inputCode}
                  onChange={(e) => {
                    setInputCode(e.target.value)
                    setPromoError('')
                  }}
                />
                <button type="submit">Apply</button>
              </div>
              {promoError && <p className="cart-promo-error">{promoError}</p>}
            </form>

            {promoCode && (
              <div className="cart-active-promo">
                <span>
                  <FaTag size={11} /> {promoCode} ({discountPercent}% OFF)
                </span>
                <button type="button" onClick={removePromo}>
                  Remove
                </button>
              </div>
            )}

            <div className="cart-summary-breakdown">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="summary-row summary-discount">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="cart-checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout • ${total.toFixed(2)}
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}

export default CartDrawer

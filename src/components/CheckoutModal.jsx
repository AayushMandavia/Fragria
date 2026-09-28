import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useModal } from '../context/ModalContext'
import { FaTimes, FaLock, FaCheckCircle, FaCreditCard, FaPaypal, FaApple } from 'react-icons/fa'
import './CheckoutModal.css'

const CheckoutModal = () => {
  const { cart, total, clearCart } = useCart()
  const { activeModal, closeModal } = useModal()

  const [step, setStep] = useState(1) // 1: Info, 2: Payment, 3: Success
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card',
    cardNumber: '',
    expDate: '',
    cvv: '',
  })
  const [orderNumber, setOrderNumber] = useState('')

  if (activeModal !== 'checkout') return null

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleNext = (e) => {
    e.preventDefault()
    setStep(2)
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    const generatedOrderNum = 'FRAG-' + Math.floor(100000 + Math.random() * 900000)
    setOrderNumber(generatedOrderNum)
    setStep(3)
    clearCart()
  }

  return (
    <div className="checkout-backdrop" onClick={closeModal}>
      <div className="checkout-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="checkout-close" onClick={closeModal} aria-label="Close checkout">
          <FaTimes />
        </button>

        {step < 3 ? (
          <>
            <div className="checkout-header">
              <span className="checkout-kicker">Secure Checkout</span>
              <h2>Complete Your Order</h2>
              <div className="checkout-steps-indicator">
                <span className={`step-pill ${step >= 1 ? 'is-active' : ''}`}>1. Shipping</span>
                <span className="step-arrow">→</span>
                <span className={`step-pill ${step >= 2 ? 'is-active' : ''}`}>2. Payment</span>
              </div>
            </div>

            <div className="checkout-body">
              {step === 1 && (
                <form className="checkout-form" onSubmit={handleNext}>
                  <div className="form-row two-cols">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Eleanor"
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Vance"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="eleanor@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label>Street Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="742 Evergreen Terrace"
                    />
                  </div>

                  <div className="form-row two-cols">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="New York"
                      />
                    </div>
                    <div className="form-group">
                      <label>Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleChange}
                        placeholder="10001"
                      />
                    </div>
                  </div>

                  <button type="submit" className="checkout-action-btn">
                    Continue to Payment
                  </button>
                </form>
              )}

              {step === 2 && (
                <form className="checkout-form" onSubmit={handlePlaceOrder}>
                  <div className="payment-options">
                    <label
                      className={`payment-option ${
                        formData.paymentMethod === 'card' ? 'is-selected' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleChange}
                      />
                      <FaCreditCard />
                      <span>Credit Card</span>
                    </label>
                    <label
                      className={`payment-option ${
                        formData.paymentMethod === 'apple' ? 'is-selected' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="apple"
                        checked={formData.paymentMethod === 'apple'}
                        onChange={handleChange}
                      />
                      <FaApple />
                      <span>Apple Pay</span>
                    </label>
                    <label
                      className={`payment-option ${
                        formData.paymentMethod === 'paypal' ? 'is-selected' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === 'paypal'}
                        onChange={handleChange}
                      />
                      <FaPaypal />
                      <span>PayPal</span>
                    </label>
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <div className="card-fields">
                      <div className="form-group">
                        <label>Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          required
                          placeholder="•••• •••• •••• 4242"
                          value={formData.cardNumber}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-row two-cols">
                        <div className="form-group">
                          <label>Expiry (MM/YY)</label>
                          <input
                            type="text"
                            name="expDate"
                            required
                            placeholder="12/28"
                            value={formData.expDate}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>CVC</label>
                          <input
                            type="text"
                            name="cvv"
                            required
                            placeholder="382"
                            value={formData.cvv}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="checkout-security-note">
                    <FaLock /> Encrypted 256-bit SSL connection
                  </div>

                  <div className="checkout-actions-row">
                    <button
                      type="button"
                      className="checkout-back-btn"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </button>
                    <button type="submit" className="checkout-action-btn">
                      Pay ${total.toFixed(2)}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </>
        ) : (
          <div className="checkout-success">
            <div className="success-icon-wrap">
              <FaCheckCircle />
            </div>
            <h2>Order Confirmed!</h2>
            <p className="order-number-text">
              Order reference: <strong>{orderNumber}</strong>
            </p>
            <p className="order-desc">
              Thank you for supporting organic craftsmanship! A confirmation email and tracking link
              have been sent to <strong>{formData.email || 'your email'}</strong>.
            </p>
            <div className="order-delivery-est">
              <span>Estimated Delivery:</span>
              <strong>3 - 5 Business Days (Tracked Priority)</strong>
            </div>
            <button className="checkout-action-btn" onClick={closeModal}>
              Continue Exploring Fragria
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CheckoutModal

import { useState } from 'react'
import { useModal } from '../context/ModalContext'
import { useCart } from '../context/CartContext'
import { FaTimes, FaStar, FaLeaf, FaShieldAlt, FaPlus, FaMinus, FaShoppingBag } from 'react-icons/fa'
import './ProductModal.css'

const ProductModal = () => {
  const { activeModal, modalData, closeModal } = useModal()
  const { addToCart, openCart } = useCart()
  const [qty, setQty] = useState(1)
  const [selectedVol, setSelectedVol] = useState('50ml')

  if (activeModal !== 'product' || !modalData) return null

  const perfume = modalData
  const multiplier = selectedVol === '100ml' ? 1.6 : 1
  const price = Math.round(perfume.price * multiplier)

  const handleAdd = () => {
    addToCart(
      {
        ...perfume,
        volume: selectedVol,
        price,
      },
      qty
    )
    closeModal()
    openCart()
  }

  return (
    <div className="product-modal-backdrop" onClick={closeModal}>
      <div className="product-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="product-modal-close" onClick={closeModal} aria-label="Close product view">
          <FaTimes />
        </button>

        <div className="product-modal-grid">
          <div className="product-modal-media" style={{ background: perfume.bgColor || '#1a1a1a' }}>
            <img src={perfume.bottle} alt={perfume.name} className="product-modal-bottle" />
            <span className="product-modal-badge">100% Organic Batch</span>
          </div>

          <div className="product-modal-info">
            <span className="product-modal-category">Artisanal Eau de Parfum</span>
            <h2 className="product-modal-title">{perfume.name}</h2>

            <div className="product-modal-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={14} color="#e0a951" />
                ))}
              </div>
              <span>
                {perfume.rating} ({perfume.reviews} Verified Reviews)
              </span>
            </div>

            <p className="product-modal-price">${price}.00</p>
            <p className="product-modal-desc">{perfume.description}</p>

            <div className="product-modal-section">
              <label>Fragrance Notes</label>
              <div className="product-notes-chips">
                {perfume.notes?.map((note) => (
                  <span key={note} className="note-chip">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="product-modal-section">
              <label>Select Bottle Volume</label>
              <div className="product-volume-options">
                <button
                  type="button"
                  className={`vol-btn ${selectedVol === '50ml' ? 'is-selected' : ''}`}
                  onClick={() => setSelectedVol('50ml')}
                >
                  50ml (Signature)
                </button>
                <button
                  type="button"
                  className={`vol-btn ${selectedVol === '100ml' ? 'is-selected' : ''}`}
                  onClick={() => setSelectedVol('100ml')}
                >
                  100ml (Extended)
                </button>
              </div>
            </div>

            <div className="product-modal-cta-row">
              <div className="product-qty-picker">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  <FaMinus size={11} />
                </button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)}>
                  <FaPlus size={11} />
                </button>
              </div>
              <button className="product-add-cart-btn" onClick={handleAdd}>
                <FaShoppingBag /> Add to Bag • ${(price * qty).toFixed(2)}
              </button>
            </div>

            <div className="product-perks">
              <div className="perk-item">
                <FaLeaf color="#4caf50" />
                <span>Wild-harvested organic botanical oils</span>
              </div>
              <div className="perk-item">
                <FaShieldAlt color="#4caf50" />
                <span>Free shipping on orders $75+ • 30-day returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal

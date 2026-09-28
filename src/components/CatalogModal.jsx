import { useState } from 'react'
import { perfumes } from '../data/perfumes'
import { useModal } from '../context/ModalContext'
import { useCart } from '../context/CartContext'
import { FaTimes, FaStar, FaShoppingBag, FaEye } from 'react-icons/fa'
import './CatalogModal.css'

const CATEGORIES = ['All', 'Woody & Resinous', 'Floral & Rose', 'Fresh & Aquatic']

const CatalogModal = () => {
  const { activeModal, closeModal, openModal } = useModal()
  const { addToCart, openCart } = useCart()
  const [selectedCat, setSelectedCat] = useState('All')

  if (activeModal !== 'catalog') return null

  const filteredPerfumes = perfumes.filter((p) => {
    if (selectedCat === 'All') return true
    if (selectedCat === 'Woody & Resinous') return p.id === 'oud-wood'
    if (selectedCat === 'Floral & Rose') return p.id === 'ruby-passion' || p.id === 'lavender-blossom'
    if (selectedCat === 'Fresh & Aquatic') return p.id === 'blue-wave'
    return true
  })

  return (
    <div className="catalog-modal-backdrop" onClick={closeModal}>
      <div className="catalog-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="catalog-modal-close" onClick={closeModal} aria-label="Close catalog view">
          <FaTimes />
        </button>

        <div className="catalog-modal-header">
          <span className="catalog-kicker">Complete Collection</span>
          <h2>The Perfumer&apos;s Reserve</h2>
          <p className="catalog-subtitle">
            Explore our curated wardrobe of 100% organic, hand-poured perfumes.
          </p>

          <div className="catalog-filter-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`catalog-filter-btn ${selectedCat === cat ? 'is-active' : ''}`}
                onClick={() => setSelectedCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="catalog-grid">
          {filteredPerfumes.map((p) => (
            <div className="catalog-card" key={p.id}>
              <div
                className="catalog-card-media"
                style={{ background: p.bgColor || '#222' }}
                onClick={() => openModal('product', p)}
              >
                <img src={p.bottle} alt={p.name} className="catalog-bottle-img" />
                <button
                  className="catalog-quickview-badge"
                  onClick={(e) => {
                    e.stopPropagation()
                    openModal('product', p)
                  }}
                >
                  <FaEye /> Quick View
                </button>
              </div>

              <div className="catalog-card-info">
                <div className="catalog-rating-row">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} size={11} color="#e0a951" />
                    ))}
                  </div>
                  <span>{p.rating}</span>
                </div>

                <h3 className="catalog-card-title">{p.name}</h3>
                <p className="catalog-card-notes">{p.notes.join(' • ')}</p>

                <div className="catalog-card-bottom">
                  <span className="catalog-card-price">${p.price}.00</span>
                  <button
                    className="catalog-add-btn"
                    onClick={() => {
                      addToCart(p, 1)
                      closeModal()
                      openCart()
                    }}
                  >
                    <FaShoppingBag size={12} /> Add to Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CatalogModal

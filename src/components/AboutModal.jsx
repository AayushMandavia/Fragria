import { useModal } from '../context/ModalContext'
import { FaTimes, FaLeaf, FaHandsHelping, FaAward } from 'react-icons/fa'
import './AboutModal.css'

const AboutModal = () => {
  const { activeModal, closeModal, openModal } = useModal()

  if (activeModal !== 'about') return null

  return (
    <div className="about-modal-backdrop" onClick={closeModal}>
      <div className="about-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="about-modal-close" onClick={closeModal} aria-label="Close about view">
          <FaTimes />
        </button>

        <div className="about-modal-header">
          <span className="about-kicker">Our Heritage & Craft</span>
          <h2>The Fragria Story</h2>
          <p className="about-subtitle">
            Born from a desire to return to nature&apos;s purest essences without synthetic additives or harsh chemicals.
          </p>
        </div>

        <div className="about-modal-content">
          <div className="about-grid-features">
            <div className="about-feat-card">
              <div className="about-feat-icon">
                <FaLeaf />
              </div>
              <h3>100% Organic Harvesting</h3>
              <p>
                Every botanical extract and floral absolute is responsibly wild-harvested at peak bloom to preserve delicate aromatic profiles.
              </p>
            </div>

            <div className="about-feat-card">
              <div className="about-feat-icon">
                <FaHandsHelping />
              </div>
              <h3>Small-Batch Distillation</h3>
              <p>
                We produce in limited micro-batches of 500 bottles in Grasse and Provence, ensuring unmatched longevity and purity.
              </p>
            </div>

            <div className="about-feat-card">
              <div className="about-feat-icon">
                <FaAward />
              </div>
              <h3>Conscious Luxury</h3>
              <p>
                Cruelty-free, vegan, phthalate-free, and packaged in recycled heavyweight crystal glass with biodegradable caps.
              </p>
            </div>
          </div>

          <div className="about-quote-box">
            <p>
              &ldquo;We don&apos;t just formulate fragrances; we distill memories of mornings in dew-soaked cedar forests, sun-drenched lavender valleys, and velvet rose gardens.&rdquo;
            </p>
            <span>— Master Perfumer Julian & Althea Vance</span>
          </div>

          <div className="about-cta-footer">
            <button
              className="about-shop-btn"
              onClick={() => {
                closeModal()
                openModal('catalog')
              }}
            >
              Explore The Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutModal

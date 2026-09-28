import { useModal } from '../context/ModalContext'
import { FaTimes, FaShieldAlt, FaClock, FaHeart, FaRecycle, FaCheck } from 'react-icons/fa'
import './BenefitsModal.css'

const BenefitsModal = () => {
  const { activeModal, closeModal, openModal } = useModal()

  if (activeModal !== 'benefits') return null

  const benefitsList = [
    {
      icon: <FaShieldAlt />,
      title: 'Zero Synthetic Fixatives',
      desc: 'No phthalates, parabens, endocrine disruptors, or artificial dyes. Only 100% pure steam-distilled floral and wood absolutes.',
    },
    {
      icon: <FaClock />,
      title: '14+ Hours Extended Longevity',
      desc: 'Formulated at an exceptional 24% Extrait de Parfum concentration for luxurious sillage that evolves gracefully from dawn to evening.',
    },
    {
      icon: <FaHeart />,
      title: 'Gentle on Sensitive Skin',
      desc: 'Dermatologist tested and blended with organic golden jojoba and fractionated coconut oil to hydrate without skin irritation.',
    },
    {
      icon: <FaRecycle />,
      title: 'Zero-Waste & Eco-Refillable',
      desc: 'Bottles designed to be cherished for years with 100% recyclable glass and plant-based cornstarch protective shipping inserts.',
    },
  ]

  return (
    <div className="benefits-modal-backdrop" onClick={closeModal}>
      <div className="benefits-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="benefits-modal-close" onClick={closeModal} aria-label="Close benefits view">
          <FaTimes />
        </button>

        <div className="benefits-modal-header">
          <span className="benefits-kicker">Why Choose Fragria</span>
          <h2>Clean Luxury, Elevated</h2>
          <p className="benefits-subtitle">
            Experience the difference of organic master perfumery where nature meets long-lasting sophistication.
          </p>
        </div>

        <div className="benefits-modal-grid">
          {benefitsList.map((b, i) => (
            <div className="benefits-card" key={i}>
              <div className="benefits-card-icon">{b.icon}</div>
              <div className="benefits-card-text">
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="benefits-comparison-table">
          <h4>The Fragria Standard</h4>
          <div className="comparison-row">
            <span className="comp-label">Organic Plant Absolutes</span>
            <span className="comp-val fragria"><FaCheck /> 100% Pure</span>
            <span className="comp-val standard">✕ Synthetic chemical clones</span>
          </div>
          <div className="comparison-row">
            <span className="comp-label">Concentration (Oils)</span>
            <span className="comp-val fragria"><FaCheck /> 24% Extrait</span>
            <span className="comp-val standard">✕ 8-12% Eau de Toilette</span>
          </div>
          <div className="comparison-row">
            <span className="comp-label">Phthalates & Parabens</span>
            <span className="comp-val fragria"><FaCheck /> 0% Guaranteed</span>
            <span className="comp-val standard">✕ Common chemical preservatives</span>
          </div>
        </div>

        <div className="benefits-modal-cta">
          <button
            className="benefits-cta-btn"
            onClick={() => {
              closeModal()
              openModal('catalog')
            }}
          >
            Find Your Fragrance
          </button>
        </div>
      </div>
    </div>
  )
}

export default BenefitsModal

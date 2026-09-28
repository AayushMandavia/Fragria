import { useState, useEffect } from 'react'
import { useModal } from '../context/ModalContext'
import { FaTimes, FaShippingFast, FaUndo, FaQuestionCircle, FaChevronDown } from 'react-icons/fa'
import './HelpModal.css'

const FAQS = [
  {
    q: 'How long do Fragria organic fragrances last on the skin?',
    a: 'Because our formulations are blended at an exceptional 24% Extrait concentration with slow-evaporating botanical oils, our fragrances typically project for 8-10 hours and remain as intimate skin scents for 14+ hours.',
  },
  {
    q: 'Are Fragria fragrances 100% vegan and cruelty-free?',
    a: 'Yes, absolutely. We never use animal-derived musks (like civet or castoreum) or conduct animal testing at any phase. All musks are sustainably derived from organic plant seeds and white florals.',
  },
  {
    q: 'Can I test the fragrances before committing to a full bottle?',
    a: 'Every 50ml or 100ml purchase comes with a complimentary 2ml matching sample. We encourage you to test the sample vial first; if it is not your signature scent, the unopened full bottle can be returned for a 100% refund.',
  },
  {
    q: 'How should I store my organic perfume?',
    a: 'Store your fragrance in a cool, dry place away from direct sunlight and extreme humidity. The ultraviolet-filtering heavyweight crystal glass preserves delicate natural aromatic compounds for over 3 years.',
  },
  {
    q: 'Are your formulations safe for sensitive skin?',
    a: 'Yes. By excluding synthetic fixatives, parabens, phthalates, and denatured chemical alcohols, our perfumes are significantly gentler. However, because natural botanicals are potent, we recommend a small patch test if you have specific plant allergies.',
  },
]

const HelpModal = () => {
  const { activeModal, modalData, closeModal } = useModal()
  const [tab, setTab] = useState('shipping') // 'shipping', 'returns', 'faq'
  const [openFaq, setOpenFaq] = useState(0)

  useEffect(() => {
    if (modalData?.tab) {
      setTab(modalData.tab)
    }
  }, [modalData])

  if (activeModal !== 'help') return null

  return (
    <div className="help-modal-backdrop" onClick={closeModal}>
      <div className="help-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="help-modal-close" onClick={closeModal} aria-label="Close help view">
          <FaTimes />
        </button>

        <div className="help-modal-header">
          <span className="help-kicker">Client Services & Policy</span>
          <h2>Help & Concierge Center</h2>
        </div>

        <div className="help-tabs">
          <button
            className={`help-tab ${tab === 'shipping' ? 'is-active' : ''}`}
            onClick={() => setTab('shipping')}
          >
            <FaShippingFast /> Shipping & Delivery
          </button>
          <button
            className={`help-tab ${tab === 'returns' ? 'is-active' : ''}`}
            onClick={() => setTab('returns')}
          >
            <FaUndo /> Returns & Exchanges
          </button>
          <button
            className={`help-tab ${tab === 'faq' ? 'is-active' : ''}`}
            onClick={() => setTab('faq')}
          >
            <FaQuestionCircle /> Frequent Questions
          </button>
        </div>

        <div className="help-content-area">
          {tab === 'shipping' && (
            <div className="help-shipping-view">
              <h3>Delivery Rates & Timelines</h3>
              <p className="help-subtext">
                Every order is hand-packaged in our New York atelier using temperature-regulated protective packaging.
              </p>

              <div className="shipping-rates-table">
                <div className="rate-row rate-header">
                  <span>Method</span>
                  <span>Timeline</span>
                  <span>Cost</span>
                </div>
                <div className="rate-row">
                  <span>Standard Ground</span>
                  <span>3 - 5 Business Days</span>
                  <span><strong>FREE on $75+</strong> ($9.99 under $75)</span>
                </div>
                <div className="rate-row">
                  <span>Expedited Priority</span>
                  <span>2 Business Days</span>
                  <span>$18.00</span>
                </div>
                <div className="rate-row">
                  <span>Overnight Courier</span>
                  <span>Next Business Day</span>
                  <span>$32.00</span>
                </div>
              </div>

              <div className="help-callout-box">
                <strong>International Orders:</strong>
                <p>We currently ship across the United States, Canada, and the United Kingdom with all duties prepaid at checkout.</p>
              </div>
            </div>
          )}

          {tab === 'returns' && (
            <div className="help-returns-view">
              <h3>30-Day Risk-Free Guarantee</h3>
              <p className="help-subtext">
                Finding your signature scent is an intimate journey. We want you to feel completely confident in your purchase.
              </p>

              <div className="returns-steps-grid">
                <div className="return-step-card">
                  <span className="step-num">01</span>
                  <h4>Test The Sample</h4>
                  <p>Open the complimentary 2ml sample vial included with your package and wear it throughout the day.</p>
                </div>
                <div className="return-step-card">
                  <span className="step-num">02</span>
                  <h4>30 Days To Decide</h4>
                  <p>If you don&apos;t completely fall in love, keep the 2ml sample and leave the full 50ml bottle in its original seal.</p>
                </div>
                <div className="return-step-card">
                  <span className="step-num">03</span>
                  <h4>Complimentary Return</h4>
                  <p>Email concierge@fragria.com for an instant pre-paid return shipping label and full refund.</p>
                </div>
              </div>
            </div>
          )}

          {tab === 'faq' && (
            <div className="help-faq-view">
              <h3>Frequently Asked Questions</h3>
              <div className="faq-accordion-list">
                {FAQS.map((item, index) => {
                  const isOpen = openFaq === index
                  return (
                    <div className={`faq-accordion-item ${isOpen ? 'is-open' : ''}`} key={index}>
                      <button
                        className="faq-question-btn"
                        onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      >
                        <span>{item.q}</span>
                        <FaChevronDown className="faq-chevron" />
                      </button>
                      {isOpen && <div className="faq-answer-pane"><p>{item.a}</p></div>}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HelpModal

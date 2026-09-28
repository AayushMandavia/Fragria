import { useState } from 'react'
import { useModal } from '../context/ModalContext'
import { FaTimes, FaEnvelope, FaMapMarkerAlt, FaClock, FaCheckCircle, FaPaperPlane } from 'react-icons/fa'
import './ContactModal.css'

const ContactModal = () => {
  const { activeModal, closeModal } = useModal()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    inquiryType: 'general',
    message: '',
  })

  if (activeModal !== 'contact') return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleReset = () => {
    setSubmitted(false)
    setForm({ name: '', email: '', inquiryType: 'general', message: '' })
  }

  return (
    <div className="contact-modal-backdrop" onClick={closeModal}>
      <div className="contact-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="contact-modal-close" onClick={closeModal} aria-label="Close contact view">
          <FaTimes />
        </button>

        <div className="contact-modal-grid">
          {/* Left Column: Info */}
          <div className="contact-info-col">
            <span className="contact-kicker">Client Concierge</span>
            <h2>Get in Touch</h2>
            <p className="contact-blurb">
              Have questions regarding our botanical sourcing, tailored bespoke discovery sets, or orders? Our concierge team is here to guide you.
            </p>

            <div className="contact-detail-items">
              <div className="contact-detail-item">
                <FaEnvelope className="contact-icon" />
                <div>
                  <strong>Email Us</strong>
                  <p>concierge@fragria.com</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <FaClock className="contact-icon" />
                <div>
                  <strong>Concierge Hours</strong>
                  <p>Mon - Fri: 9am - 7pm EST</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <strong>Atelier</strong>
                  <p>450 Lexington Ave, New York, NY</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="contact-form-col">
            {!submitted ? (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Julian Vance"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="contact-form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="julian@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div className="contact-form-group">
                  <label>Inquiry Nature</label>
                  <select
                    value={form.inquiryType}
                    onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                  >
                    <option value="general">Fragrance Consultation</option>
                    <option value="order">Order & Shipping Status</option>
                    <option value="press">Press & Wholesale Partnerships</option>
                    <option value="custom">Bespoke Gifting Services</option>
                  </select>
                </div>

                <div className="contact-form-group">
                  <label>Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we assist your olfactory journey?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="contact-submit-btn">
                  <FaPaperPlane /> Send Message
                </button>
              </form>
            ) : (
              <div className="contact-success-state">
                <div className="contact-success-icon">
                  <FaCheckCircle />
                </div>
                <h3>Message Received</h3>
                <p>
                  Thank you, <strong>{form.name}</strong>. Our concierge team will review your inquiry and respond within 24 hours.
                </p>
                <button type="button" className="contact-new-btn" onClick={handleReset}>
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactModal

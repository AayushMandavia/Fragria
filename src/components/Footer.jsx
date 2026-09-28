import { useState } from 'react'
import { perfumes } from '../data/perfumes'
import { useModal } from '../context/ModalContext'
import SocialIcons from './SocialIcons'
import useReveal from '../lib/useReveal'
import './Footer.css'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const { openModal } = useModal()

  const sectionRef = useReveal([
    { selector: '.footer-newsletter-inner', y: 40, duration: 0.8, start: 'top 92%' },
    { selector: '.footer-col', y: 40, duration: 0.7, stagger: 0.1, start: 'top 92%' },
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
  }

  return (
    <footer className="footer" id="contact" ref={sectionRef}>
      <svg
        className="footer-top-border"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,42.7C672,32,768,32,864,42.7C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
          fill="#8a1220"
        />
      </svg>
      <div className="footer-newsletter">
        <div className="footer-newsletter-inner">
          <div>
            <h3>Be the first to know</h3>
            <p>New scents, restocks, and 10% off your first order.</p>
          </div>
          <form className="footer-form" onSubmit={handleSubmit}>
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            <button type="submit">{subscribed ? 'Subscribed ✓' : 'Subscribe'}</button>
          </form>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-col footer-brand">
          <a
            href="#home"
            className="footer-logo"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <img src="/images/logo-horizontal.png" alt="Fragria — A Scent For Every Story" className="footer-logo-img" />
          </a>
          <p>Nature&apos;s organic fragrance, crafted in small batches.</p>
          <SocialIcons className="footer-socials" />
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            {perfumes.map((p) => (
              <li key={p.id}>
                <button
                  className="footer-nav-btn"
                  onClick={() => {
                    const el = document.getElementById('best-sellers')
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  {p.name}
                </button>
              </li>
            ))}
            <li>
              <button
                className="footer-nav-btn"
                onClick={() => {
                  const el = document.getElementById('best-sellers')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                All Fragrances
              </button>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li>
              <button
                className="footer-nav-btn"
                onClick={() => {
                  const el = document.getElementById('about')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                About Us
              </button>
            </li>
            <li>
              <button
                className="footer-nav-btn"
                onClick={() => {
                  const el = document.getElementById('reviews')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Reviews
              </button>
            </li>
            <li>
              <button
                className="footer-nav-btn"
                onClick={() => {
                  const el = document.getElementById('contact')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Contact
              </button>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Help</h4>
          <ul>
            <li>
              <button
                className="footer-nav-btn"
                onClick={() => openModal('help', { tab: 'shipping' })}
              >
                Shipping
              </button>
            </li>
            <li>
              <button
                className="footer-nav-btn"
                onClick={() => openModal('help', { tab: 'returns' })}
              >
                Returns
              </button>
            </li>
            <li>
              <button
                className="footer-nav-btn"
                onClick={() => openModal('help', { tab: 'faq' })}
              >
                FAQ
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Fragria. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer

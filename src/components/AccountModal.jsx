import { useState } from 'react'
import { useModal } from '../context/ModalContext'
import { FaTimes, FaUser, FaBox, FaGift, FaHeart, FaCopy, FaCheck } from 'react-icons/fa'
import './AccountModal.css'

const AccountModal = () => {
  const { activeModal, closeModal } = useModal()
  const [activeTab, setActiveTab] = useState('orders') // 'orders', 'profile', 'referral'
  const [copied, setCopied] = useState(false)

  if (activeModal !== 'account') return null

  const handleCopy = () => {
    navigator.clipboard?.writeText('https://fragria.com/invite/VIP-SCENT')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="account-modal-backdrop" onClick={closeModal}>
      <div className="account-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="account-modal-close" onClick={closeModal} aria-label="Close account view">
          <FaTimes />
        </button>

        <div className="account-modal-top">
          <div className="account-avatar">
            <FaUser />
          </div>
          <div className="account-user-info">
            <h2>Welcome Back</h2>
            <p>Fragria Connoisseur Member</p>
          </div>
        </div>

        <div className="account-tabs">
          <button
            className={`account-tab ${activeTab === 'orders' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <FaBox /> Orders & Tracking
          </button>
          <button
            className={`account-tab ${activeTab === 'referral' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('referral')}
          >
            <FaGift /> Referral Rewards
          </button>
          <button
            className={`account-tab ${activeTab === 'wishlist' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('wishlist')}
          >
            <FaHeart /> Scent Profile
          </button>
        </div>

        <div className="account-modal-body">
          {activeTab === 'orders' && (
            <div className="account-orders-list">
              <div className="order-history-card">
                <div className="order-history-header">
                  <div>
                    <strong>Order #FRAG-841920</strong>
                    <span className="order-date">Placed on September 18, 2026</span>
                  </div>
                  <span className="order-status-badge is-delivered">Delivered</span>
                </div>
                <div className="order-history-items">
                  <div className="order-sub-item">
                    <span>1x Ruby Passion (50ml)</span>
                    <strong>$72.00</strong>
                  </div>
                  <div className="order-sub-item">
                    <span>1x Discovery Scent Blotters</span>
                    <strong>FREE</strong>
                  </div>
                </div>
                <div className="order-history-footer">
                  <span>Tracking: USP9382109481US</span>
                  <strong>Total: $72.00</strong>
                </div>
              </div>

              <div className="order-history-card">
                <div className="order-history-header">
                  <div>
                    <strong>Order #FRAG-392811</strong>
                    <span className="order-date">Placed on August 29, 2026</span>
                  </div>
                  <span className="order-status-badge is-delivered">Delivered</span>
                </div>
                <div className="order-history-items">
                  <div className="order-sub-item">
                    <span>1x Oud Wood (50ml)</span>
                    <strong>$84.00</strong>
                  </div>
                </div>
                <div className="order-history-footer">
                  <span>Tracking: USP8192837192US</span>
                  <strong>Total: $84.00</strong>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'referral' && (
            <div className="account-referral-tab">
              <div className="referral-banner">
                <h3>Give $20, Receive $20</h3>
                <p>
                  Share your bespoke link with friends. When they place their first organic fragrance order, you both receive $20 store credit.
                </p>
              </div>

              <div className="referral-link-box">
                <input type="text" readOnly value="https://fragria.com/invite/VIP-SCENT" />
                <button onClick={handleCopy}>
                  {copied ? (
                    <>
                      <FaCheck /> Copied
                    </>
                  ) : (
                    <>
                      <FaCopy /> Copy Link
                    </>
                  )}
                </button>
              </div>

              <div className="referral-stats-grid">
                <div className="ref-stat">
                  <span>Credits Earned</span>
                  <strong>$60.00</strong>
                </div>
                <div className="ref-stat">
                  <span>Friends Invited</span>
                  <strong>3</strong>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="account-wishlist-tab">
              <h3>Your Olfactory Fingerprint</h3>
              <p>Based on your seasonal selections, your primary fragrance family preferences are:</p>
              <div className="scent-chips">
                <span className="scent-tag">Smoky Woody Amber</span>
                <span className="scent-tag">Velvet Rose Absolutes</span>
                <span className="scent-tag">Crisp Sea Salt & Bergamot</span>
              </div>
              <div className="recommended-box">
                <strong>Upcoming Harvest Release:</strong>
                <p>Autumn Reserve: Golden Amber & Smoked Vetiver launching next month.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AccountModal

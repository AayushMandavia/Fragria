import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa6'

const ICONS = {
  instagram: <FaInstagram size={15} />,
  facebook: <FaFacebookF size={14} />,
  twitter: <FaTwitter size={14} />,
}

const SocialIcons = ({ items = ['instagram', 'facebook', 'twitter'], className = '' }) => (
  <div className={`social-icons ${className}`}>
    {items.map((item) => (
      <a key={item} href="#" className="social-icons-btn" aria-label={item}>
        {ICONS[item]}
      </a>
    ))}
  </div>
)

export default SocialIcons


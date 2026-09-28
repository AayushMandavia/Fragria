import { useCart } from '../context/CartContext'
import { FaCheckCircle } from 'react-icons/fa'
import './Toast.css'

const Toast = () => {
  const { toastMessage } = useCart()

  if (!toastMessage) return null

  return (
    <div className="toast-notification">
      <FaCheckCircle className="toast-icon" />
      <span>{toastMessage}</span>
    </div>
  )
}

export default Toast

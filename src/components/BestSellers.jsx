import { perfumes } from '../data/perfumes'
import { useCart } from '../context/CartContext'
import { useModal } from '../context/ModalContext'
import useReveal from '../lib/useReveal'
import './BestSellers.css'

const BestSellers = () => {
  const { addToCart, openCart } = useCart()
  const { openModal } = useModal()

  const sectionRef = useReveal([
    { selector: '.bestsellers-top', y: 30, duration: 0.7 },
    { selector: '.bs-card', y: 60, scale: 0.94, duration: 0.7, stagger: 0.1, start: 'top 80%' },
  ])

  return (
    <section className="bestsellers" id="best-sellers" ref={sectionRef}>
      <div className="bestsellers-top">
        <h2>Best Sellers</h2>
        <button
          className="bestsellers-viewall"
          onClick={() => openModal('catalog')}
        >
          View All <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className="bestsellers-grid">
        {perfumes.map((p) => (
          <div
            className="bs-card"
            key={p.id}
            onClick={() => openModal('product', p)}
            style={{ cursor: 'pointer' }}
          >
            <div className="bs-card-media">
              <img src={p.bottle} alt={p.name} className="bs-card-img" data-perfume-id={p.id} />
            </div>
            <div className="bs-card-info">
              <p className="bs-card-price">${p.price}.00</p>
              <p className="bs-card-name">{p.name}</p>
              <button
                className="bs-card-add"
                onClick={(e) => {
                  e.stopPropagation()
                  addToCart(p, 1)
                  openCart()
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BestSellers

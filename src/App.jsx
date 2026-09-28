import useLenis from './lib/useLenis'
import { CartProvider } from './context/CartContext'
import { ModalProvider } from './context/ModalContext'
import Loader from './components/Loader'
import Hero from './components/Hero'
import BestSellers from './components/BestSellers'
import OfferGallery from './components/OfferGallery'
import MoodSelector from './components/MoodSelector'
import Testimonial from './components/Testimonial'
import Reviews from './components/Reviews'
import PromoOffers from './components/PromoOffers'
import Footer from './components/Footer'
import OfferMarquee from './components/OfferMarquee'
import CartDrawer from './components/CartDrawer'
import AllModals from './components/AllModals'
import Toast from './components/Toast'

function App() {
  useLenis()

  return (
    <CartProvider>
      <ModalProvider>
        <Loader />
        <Hero />
        <BestSellers />
        <OfferGallery />
        <MoodSelector />
        <Testimonial />
        <Reviews />
        <PromoOffers />
        <Footer />
        <OfferMarquee />

        <CartDrawer />
        <AllModals />
        <Toast />
      </ModalProvider>
    </CartProvider>
  )
}

export default App

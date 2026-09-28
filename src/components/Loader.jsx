import { useEffect, useState } from 'react'
import './Loader.css'

const Loader = () => {
  const [phase, setPhase] = useState('loading')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const exitTimer = setTimeout(() => setPhase('exiting'), 1300)
    const doneTimer = setTimeout(() => {
      setPhase('done')
      document.body.style.overflow = ''
    }, 2050)
    return () => {
      clearTimeout(exitTimer)
      clearTimeout(doneTimer)
      document.body.style.overflow = ''
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div className={`loader ${phase === 'exiting' ? 'is-exiting' : ''}`}>
      <div className="loader-inner">
        <div className="loader-logo">
          <img src="/images/logo-white.png" alt="Fragria" className="loader-logo-img" />
        </div>
        <div className="loader-bar">
          <div className="loader-bar-fill" />
        </div>
      </div>
    </div>
  )
}

export default Loader

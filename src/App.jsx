import { useEffect, useState } from 'react'

const products = [
  {
    id: 1,
    name: 'Minimal Backpack',
    description: 'Simple, comfortable and made for everyday use.',
    icon: 'backpack',
  },
  {
    id: 2,
    name: 'Classic Watch',
    description: 'Clean design that fits every occasion.',
    icon: 'watch',
  },
  {
    id: 3,
    name: 'Everyday Bottle',
    description: 'Lightweight and practical for daily use.',
    icon: 'bottle',
  },
]

function ProductIcon({ type }) {
  if (type === 'backpack') {
    return (
      <svg viewBox="0 0 64 64" className="product-icon" aria-hidden="true">
        <rect x="14" y="20" width="36" height="34" rx="8" />
        <path d="M22 20v-4a10 10 0 0 1 20 0v4" fill="none" strokeWidth="3" stroke="currentColor" />
        <rect x="26" y="30" width="12" height="10" rx="2" className="icon-accent" />
      </svg>
    )
  }
  if (type === 'watch') {
    return (
      <svg viewBox="0 0 64 64" className="product-icon" aria-hidden="true">
        <rect x="24" y="6" width="16" height="10" rx="2" />
        <rect x="24" y="48" width="16" height="10" rx="2" />
        <circle cx="32" cy="32" r="16" />
        <line x1="32" y1="32" x2="32" y2="22" stroke="white" strokeWidth="2" />
        <line x1="32" y1="32" x2="39" y2="32" stroke="white" strokeWidth="2" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 64 64" className="product-icon" aria-hidden="true">
      <rect x="24" y="6" width="16" height="8" rx="2" />
      <path d="M22 14h20l4 8v34a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4V22z" />
      <rect x="18" y="30" width="28" height="12" className="icon-accent" />
    </svg>
  )
}

function App() {
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    fetch('/api/message')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.message) {
          setGreeting(data.message)
        }
      })
      .catch(() => {
        // Silently ignore; the page works fine without this
      })
  }, [])

  return (
    <div className="page">
      <header className="header">
        <div className="container header-inner">
          <div className="logo">NOVA</div>
          <nav className="nav">
            <a href="#home">Home</a>
            <a href="#products">Products</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="container hero-inner">
            <h1>Simple Things. Better Living.</h1>
            <p>Discover thoughtfully designed products made for everyday life.</p>
            <a href="#products" className="btn-primary">Explore all Products</a>
            {greeting && <span className="visually-hidden">{greeting}</span>}
          </div>
        </section>

        <section id="products" className="products">
          <div className="container">
            <h2>Our Products</h2>
            <div className="product-grid">
              {products.map((product) => (
                <div className="product-card" key={product.id}>
                  <div className="product-icon-wrap">
                    <ProductIcon type={product.icon} />
                  </div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="about">
          <div className="container about-inner">
            <h2>Made for Everyday Life</h2>
            <p>
              NOVA started with a simple idea: everyday products should be well made,
              easy to use, and built to last. We focus on clean design and honest
              materials, so the things you use every day feel a little better.
              No clutter, no noise — just simple things, done well.
            </p>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="container contact-inner">
            <h2>Let's Connect</h2>
            <p>Have a question or just want to say hello?</p>
            <a className="email-link" href="mailto:hello@nova.example">hello@nova.example</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>NOVA © 2026</p>
        </div>
      </footer>
    </div>
  )
}

export default App

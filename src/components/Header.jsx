import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
  const [cartCount, setCartCount] = useState(0)
  const [open, setOpen] = useState(false)

  const refreshCount = () => {
    const items = JSON.parse(localStorage.getItem('cartData')) || []
    setCartCount(items.length)
  }

  useEffect(() => {
    refreshCount()
    window.addEventListener('storage', refreshCount)
    window.addEventListener('cart-updated', refreshCount)
    return () => {
      window.removeEventListener('storage', refreshCount)
      window.removeEventListener('cart-updated', refreshCount)
    }
  }, [])

  const linkClass = ({ isActive }) =>
    'nav-link' + (isActive ? ' active' : '')

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          <span className="brand-blob">🫧</span>
          <span className="brand-text">Bubblewrap</span>
        </Link>

        <nav className={`main-nav ${open ? 'open' : ''}`}>
          <NavLink to="/" className={linkClass} end onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/products" className={linkClass} onClick={() => setOpen(false)}>Shop</NavLink>
          <NavLink to="/cart" className={linkClass} onClick={() => setOpen(false)}>Cart</NavLink>
          <a href="#about" className="nav-link" onClick={() => setOpen(false)}>About</a>
        </nav>

        <div className="header-actions">
          <Link to="/cart" className="cart-btn">
            🛍️
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
          <Link to="/register" className="btn btn-primary btn-sm header-register">Sign Up</Link>
          <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </div>

      <style>{`
        .site-header {
          background: var(--color-surface);
          position: sticky;
          top: 0;
          z-index: 40;
          box-shadow: 0 4px 20px rgba(66,63,92,0.06);
        }
        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 16px;
          padding-bottom: 16px;
          gap: 24px;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--color-primary-dark);
        }
        .brand-blob {
          background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
          width: 40px; height: 40px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem;
        }
        .main-nav { display: flex; gap: 6px; }
        .nav-link {
          padding: 10px 16px;
          border-radius: var(--radius-pill);
          font-weight: 600;
          color: var(--color-text);
        }
        .nav-link.active, .nav-link:hover { background: #FFF1F3; color: var(--color-primary-dark); }
        .header-actions { display: flex; align-items: center; gap: 10px; }
        .cart-btn {
          position: relative;
          width: 44px; height: 44px;
          border-radius: 50%;
          background: #F1ECFF;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem;
        }
        .cart-count {
          position: absolute; top: -4px; right: -4px;
          background: var(--color-primary);
          color: white;
          font-size: 0.7rem;
          font-weight: 700;
          border-radius: 50%;
          width: 20px; height: 20px;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid white;
        }
        .burger { display: none; flex-direction: column; gap: 4px; background: none; border: none; cursor: pointer; padding: 6px; }
        .burger span { width: 22px; height: 2px; background: var(--color-text); border-radius: 2px; }

        @media (max-width: 860px) {
          .header-register { display: none; }
          .main-nav {
            position: absolute;
            top: 100%; left: 0; right: 0;
            background: var(--color-surface);
            flex-direction: column;
            padding: 12px 24px 20px;
            display: none;
            box-shadow: 0 10px 20px rgba(66,63,92,0.08);
          }
          .main-nav.open { display: flex; }
          .burger { display: flex; }
        }
      `}</style>
    </header>
  )
}

export default Header

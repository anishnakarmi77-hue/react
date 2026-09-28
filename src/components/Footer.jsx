import React from 'react'

const Footer = () => {
  return (
    <footer className="site-footer" id="about">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="brand-blob">🫧</div>
          <div>
            <h3>Bubblewrap</h3>
            <p>Cheerful little things for everyday joy. Shop small, smile big.</p>
          </div>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <a href="/products">All Products</a>
          <a href="/cart">Your Cart</a>
          <a href="/register">Create Account</a>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <a href="#">Help Center</a>
          <a href="#">Shipping Info</a>
          <a href="#">Returns</a>
        </div>

        <div className="footer-col">
          <h4>Say hi 👋</h4>
          <p>hello@bubblewrap.shop</p>
          <div className="socials">
            <span>🐦</span><span>📸</span><span>💌</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">© {new Date().getFullYear()} Bubblewrap. Made with lots of bubbles.</div>
      </div>

      <style>{`
        .site-footer { background: #FFF1F3; margin-top: 80px; padding-top: 56px; }
        .footer-inner {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1fr;
          gap: 32px;
          padding-bottom: 40px;
        }
        .footer-brand { display: flex; gap: 12px; }
        .footer-brand .brand-blob {
          background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
          width: 44px; height: 44px; border-radius: 50%;
          display:flex; align-items:center; justify-content:center; font-size:1.3rem;
          flex-shrink: 0;
        }
        .footer-brand h3 { font-size: 1.2rem; margin-bottom: 6px; color: var(--color-primary-dark); }
        .footer-brand p { color: var(--color-text-light); font-size: 0.9rem; margin: 0; }
        .footer-col h4 { font-size: 0.95rem; margin-bottom: 14px; }
        .footer-col a, .footer-col p { display: block; color: var(--color-text-light); font-size: 0.9rem; margin-bottom: 10px; }
        .footer-col a:hover { color: var(--color-primary-dark); }
        .socials { display: flex; gap: 10px; font-size: 1.1rem; }
        .footer-bottom {
          border-top: 1px solid #FFDDE3;
          padding: 18px 0;
          font-size: 0.82rem;
          color: var(--color-text-light);
          text-align: center;
        }
        @media (max-width: 760px) {
          .footer-inner { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </footer>
  )
}

export default Footer

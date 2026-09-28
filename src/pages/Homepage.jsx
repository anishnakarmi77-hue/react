import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'

const categories = [
  { name: 'Beauty', emoji: '💄' },
  { name: 'Fragrances', emoji: '🌸' },
  { name: 'Furniture', emoji: '🛋️' },
  { name: 'Groceries', emoji: '🍊' },
]

const Homepage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=8')
      .then((result) => setProducts(result.data.products))
      .catch((err) => console.log('Something went wrong fetching products.', err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="pill pill-peach">New arrivals every week ✨</span>
            <h1>Little joys, <br />delivered to your door.</h1>
            <p>Cute, comfy and colourful picks for your everyday — curated with a lot of heart and a little chaos.</p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary">Start Shopping</Link>
              <Link to="/register" className="btn btn-outline">Create an account</Link>
            </div>
          </div>
          <div className="hero-art">
            <div className="blob blob-1" />
            <div className="blob blob-2" />
            <div className="hero-emoji">🎁</div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container categories">
        {categories.map((c) => (
          <div className="cat-pill" key={c.name}>
            <span className="cat-emoji">{c.emoji}</span> {c.name}
          </div>
        ))}
      </section>

      {/* Trending Products */}
      <section className="container trending">
        <h2 className="section-title">Trending right now 🔥</h2>
        <p className="section-sub">Handpicked favourites people can't stop adding to cart.</p>

        {loading ? (
          <div className="loading-blob" />
        ) : (
          <div className="product-grid">
            {products.map((item) => (
              <Card data={item} key={item.id} />
            ))}
          </div>
        )}

        <div className="see-all">
          <Link to="/products" className="btn btn-secondary">See all products</Link>
        </div>
      </section>

      <style>{`
        .hero {
          background: linear-gradient(180deg, #FFF1F3 0%, var(--color-bg) 100%);
          padding: 60px 0 40px;
        }
        .hero-inner {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          align-items: center;
          gap: 40px;
        }
        .hero-copy h1 {
          font-size: 2.9rem;
          line-height: 1.1;
          margin: 18px 0 16px;
          color: var(--color-text);
        }
        .hero-copy p { color: var(--color-text-light); font-size: 1.05rem; max-width: 460px; margin-bottom: 26px; }
        .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
        .hero-art { position: relative; height: 320px; }
        .blob { position: absolute; border-radius: 50%; filter: blur(2px); opacity: 0.8; }
        .blob-1 { width: 260px; height: 260px; background: var(--color-secondary); top: 10px; right: 40px; }
        .blob-2 { width: 180px; height: 180px; background: var(--color-accent); bottom: 0; left: 10px; opacity: 0.6; }
        .hero-emoji {
          position: relative;
          font-size: 7rem;
          text-align: center;
          padding-top: 90px;
        }
        .categories {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          padding: 30px 24px 10px;
          justify-content: center;
        }
        .cat-pill {
          background: white;
          padding: 10px 20px;
          border-radius: var(--radius-pill);
          font-weight: 700;
          font-family: var(--font-display);
          box-shadow: var(--shadow-card);
          font-size: 0.9rem;
        }
        .cat-emoji { margin-right: 4px; }
        .trending { padding: 50px 24px 20px; }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .see-all { text-align: center; margin-top: 36px; }

        @media (max-width: 940px) {
          .hero-inner { grid-template-columns: 1fr; }
          .hero-art { display: none; }
          .product-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .hero-copy h1 { font-size: 2.1rem; }
          .product-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  )
}

export default Homepage

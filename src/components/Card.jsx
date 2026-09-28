import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ data }) => {
  const title = data.title.length > 26 ? data.title.slice(0, 26) + '…' : data.title
  const hasDiscount = data.discountPercentage > 0
  const original = hasDiscount
    ? (data.price / (1 - data.discountPercentage / 100)).toFixed(2)
    : null

  return (
    <Link to={`/productview/${data.id}`} className="product-card wobble-hover">
      <div className="product-img-wrap">
        <img src={data.thumbnail} alt={data.title} />
        {hasDiscount && <span className="discount-tag">-{Math.round(data.discountPercentage)}%</span>}
      </div>
      <div className="product-body">
        <span className="pill pill-lavender">{data.category}</span>
        <h5 title={data.title}>{title}</h5>
        <div className="price-row">
          {original && <span className="old-price">Rs.{original}</span>}
          <span className="cur-price">Rs.{data.price}</span>
        </div>
      </div>

      <style>{`
        .product-card {
          display: block;
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-card);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .product-card:hover { box-shadow: var(--shadow-soft); }
        .product-img-wrap { position: relative; background: #FFF6EF; }
        .product-img-wrap img { width: 100%; height: 190px; object-fit: cover; }
        .discount-tag {
          position: absolute; top: 12px; left: 12px;
          background: var(--color-primary);
          color: white; font-weight: 700; font-size: 0.75rem;
          padding: 4px 10px; border-radius: var(--radius-pill);
        }
        .product-body { padding: 16px 18px 20px; }
        .product-body h5 { font-size: 1.02rem; margin: 10px 0 8px; }
        .price-row { display: flex; align-items: baseline; gap: 8px; }
        .old-price { text-decoration: line-through; color: var(--color-text-light); font-size: 0.82rem; }
        .cur-price { color: var(--color-primary-dark); font-family: var(--font-display); font-weight: 700; font-size: 1.05rem; }
      `}</style>
    </Link>
  )
}

export default Card

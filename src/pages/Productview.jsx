import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const toast = (icon, title) => {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon,
    title,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  })
}

const Productview = () => {
  const { product_id } = useParams()
  const [product, setProduct] = useState(null)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    setProduct(null)
    axios.get(`https://dummyjson.com/products/${product_id}`)
      .then((result) => setProduct(result.data))
      .catch((err) => console.log('Something went wrong fetching the product.', err))
    setQty(1)
  }, [product_id])

  const decrease = () => {
    if (qty > 1) setQty(qty - 1)
    else toast('info', 'Quantity can\'t go below 1')
  }

  const addToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartData')) || []
    const existing = cartItems.find((item) => item.id === product.id)

    if (existing) {
      existing.quantity += qty
    } else {
      cartItems.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.thumbnail,
        quantity: qty,
        discount: product.discountPercentage,
      })
    }
    localStorage.setItem('cartData', JSON.stringify(cartItems))
    window.dispatchEvent(new Event('cart-updated'))
    toast('success', 'Added to cart!')
  }

  const addToWishlist = () => {
    const wishlistItems = JSON.parse(localStorage.getItem('wishlistData')) || []
    const existing = wishlistItems.find((item) => item.id === product.id)

    if (existing) {
      toast('info', 'Already in your wishlist')
      return
    }
    wishlistItems.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.thumbnail,
      quantity: qty,
      discount: product.discountPercentage,
    })
    localStorage.setItem('wishlistData', JSON.stringify(wishlistItems))
    toast('success', 'Added to wishlist!')
  }

  if (!product) {
    return <div className="loading-blob" />
  }

  return (
    <section className="container pv-page">
      <p className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <span>{product.category}</span>
      </p>

      <div className="pv-card">
        <div className="pv-img">
          <img src={product.thumbnail} alt={product.title} />
        </div>

        <div className="pv-info">
          <span className="pill pill-lavender">{product.category}</span>
          <h1>{product.title}</h1>

          <div className="price-row">
            {product.discountPercentage > 0 && (
              <span className="old-price">
                Rs.{(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
            <span className="cur-price">Rs.{product.price}</span>
          </div>

          {product.stock > 10 ? (
            <span className="pill pill-mint">In Stock</span>
          ) : (
            <span className="pill pill-peach">Only {product.stock} left</span>
          )}

          <div className="qty-row">
            <span>Quantity</span>
            <div className="qty-control">
              <button onClick={decrease}>–</button>
              <input type="text" value={qty} readOnly />
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>

          <div className="pv-actions">
            <button className="btn btn-primary" onClick={addToCart}>Add to Cart 🛍️</button>
            <button className="btn btn-outline" onClick={addToWishlist}>Save for later 💗</button>
          </div>

          <p className="pv-desc"><strong>Description:</strong> {product.description}</p>
        </div>
      </div>

      <style>{`
        .pv-page { padding: 40px 24px 60px; }
        .breadcrumb { color: var(--color-text-light); font-weight: 600; margin-bottom: 20px; }
        .breadcrumb a { color: var(--color-primary-dark); }
        .pv-card {
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-card);
          padding: 32px;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 40px;
        }
        .pv-img { background: #FFF6EF; border-radius: var(--radius-md); overflow: hidden; }
        .pv-img img { width: 100%; height: 100%; object-fit: cover; }
        .pv-info h1 { font-size: 1.9rem; margin: 12px 0 14px; }
        .price-row { display: flex; align-items: baseline; gap: 10px; margin-bottom: 14px; }
        .old-price { text-decoration: line-through; color: var(--color-text-light); }
        .cur-price { font-family: var(--font-display); font-size: 1.5rem; font-weight: 800; color: var(--color-primary-dark); }
        .qty-row { display: flex; align-items: center; gap: 16px; margin: 22px 0; font-weight: 700; }
        .qty-control { display: flex; align-items: center; border: 2px solid #F1ECFF; border-radius: var(--radius-pill); overflow: hidden; }
        .qty-control button {
          border: none; background: #FFF1F3; width: 38px; height: 38px; font-size: 1.2rem;
          cursor: pointer; color: var(--color-primary-dark); font-weight: 700;
        }
        .qty-control input { width: 44px; text-align: center; border: none; font-weight: 700; }
        .pv-actions { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 22px; }
        .pv-desc { color: var(--color-text-light); line-height: 1.7; }

        @media (max-width: 820px) {
          .pv-card { grid-template-columns: 1fr; padding: 20px; }
        }
      `}</style>
    </section>
  )
}

export default Productview

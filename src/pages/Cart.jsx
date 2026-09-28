import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const Cart = () => {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cartData')) || []
    setCartItems(data)
  }, [])

  const persist = (items) => {
    setCartItems(items)
    localStorage.setItem('cartData', JSON.stringify(items))
    window.dispatchEvent(new Event('cart-updated'))
  }

  const updateQty = (id, delta) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    )
    persist(updated)
  }

  const removeItem = (id) => {
    persist(cartItems.filter((item) => item.id !== id))
  }

  const checkout = () => {
    Swal.fire({
      title: 'Yay! 🎉',
      text: 'Your order has been placed (this is a demo, no payment taken).',
      icon: 'success',
      confirmButtonText: 'Nice!',
    })
    persist([])
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 4.99 : 0
  const total = subtotal + shipping

  if (cartItems.length === 0) {
    return (
      <section className="container empty-cart">
        <div className="empty-emoji">🛍️</div>
        <h1>Your cart is feeling light</h1>
        <p>Go find something that sparks joy.</p>
        <Link to="/products" className="btn btn-primary">Browse Products</Link>

        <style>{`
          .empty-cart { text-align: center; padding: 90px 24px; }
          .empty-emoji { font-size: 4rem; margin-bottom: 10px; }
          .empty-cart h1 { font-size: 1.8rem; margin-bottom: 8px; }
          .empty-cart p { color: var(--color-text-light); margin-bottom: 26px; }
        `}</style>
      </section>
    )
  }

  return (
    <section className="container cart-page">
      <h2 className="section-title">Your Cart</h2>
      <p className="section-sub">{cartItems.length} item{cartItems.length > 1 ? 's' : ''} ready to go.</p>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-row" key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="cart-row-info">
                <h5>{item.title}</h5>
                <span className="cur-price">Rs.{item.price}</span>
              </div>
              <div className="qty-control">
                <button onClick={() => updateQty(item.id, -1)}>–</button>
                <input type="text" value={item.quantity} readOnly />
                <button onClick={() => updateQty(item.id, 1)}>+</button>
              </div>
              <div className="row-total">Rs.{(item.price * item.quantity).toFixed(2)}</div>
              <button className="remove-btn" onClick={() => removeItem(item.id)} aria-label="Remove item">✕</button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h4>Order Summary</h4>
          <div className="summary-row"><span>Subtotal</span><span>Rs.{subtotal.toFixed(2)}</span></div>
          <div className="summary-row"><span>Shipping</span><span>Rs.{shipping.toFixed(2)}</span></div>
          <hr />
          <div className="summary-row summary-total"><span>Total</span><span>Rs.{total.toFixed(2)}</span></div>
          <button className="btn btn-primary btn-block" onClick={checkout}>Checkout 🎉</button>
          <Link to="/products" className="continue-link">← Continue shopping</Link>
        </div>
      </div>

      <style>{`
        .cart-page { padding: 44px 24px 60px; }
        .cart-layout { display: grid; grid-template-columns: 1.6fr 1fr; gap: 30px; align-items: start; }
        .cart-items { display: flex; flex-direction: column; gap: 16px; }
        .cart-row {
          background: var(--color-surface);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-card);
          padding: 14px 18px;
          display: grid;
          grid-template-columns: 64px 1fr auto auto auto;
          align-items: center;
          gap: 16px;
        }
        .cart-row img { width: 64px; height: 64px; object-fit: cover; border-radius: var(--radius-sm); }
        .cart-row-info h5 { font-size: 0.98rem; margin-bottom: 4px; }
        .cur-price { color: var(--color-text-light); font-size: 0.88rem; }
        .qty-control { display: flex; align-items: center; border: 2px solid #F1ECFF; border-radius: var(--radius-pill); overflow: hidden; }
        .qty-control button { border: none; background: #FFF1F3; width: 30px; height: 30px; cursor: pointer; font-weight: 700; color: var(--color-primary-dark); }
        .qty-control input { width: 34px; text-align: center; border: none; font-weight: 700; }
        .row-total { font-family: var(--font-display); font-weight: 700; color: var(--color-primary-dark); min-width: 80px; text-align: right; }
        .remove-btn { border: none; background: #FFEDE3; color: #E36B3A; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-weight: 700; }

        .cart-summary {
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-card);
          padding: 26px;
        }
        .cart-summary h4 { margin-bottom: 18px; }
        .summary-row { display: flex; justify-content: space-between; margin-bottom: 12px; color: var(--color-text-light); font-weight: 600; }
        .summary-total { color: var(--color-text); font-family: var(--font-display); font-size: 1.15rem; font-weight: 800; }
        .cart-summary hr { border: none; border-top: 1px dashed #F1ECFF; margin: 14px 0; }
        .continue-link { display: block; text-align: center; margin-top: 14px; font-weight: 600; color: var(--color-primary-dark); }

        @media (max-width: 860px) {
          .cart-layout { grid-template-columns: 1fr; }
          .cart-row { grid-template-columns: 50px 1fr auto; grid-template-areas: "img info total" "img qty remove"; }
        }
      `}</style>
    </section>
  )
}

export default Cart

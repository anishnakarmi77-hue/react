import React, { useEffect, useMemo, useState } from 'react'
import Card from '../components/Card'
import axios from 'axios'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=100')
      .then((result) => setProducts(result.data.products))
      .catch((err) => console.log('Something went wrong fetching products.', err))
      .finally(() => setLoading(false))
  }, [])

  const visible = useMemo(() => {
    let list = products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    )
    if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price)
    return list
  }, [products, search, sort])

  return (
    <section className="container products-page">
      <h2 className="section-title">All Products</h2>
      <p className="section-sub">{visible.length} cheerful things waiting for you.</p>

      <div className="toolbar">
        <input
          type="text"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="sort-select">
          <option value="default">Sort: Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      {loading ? (
        <div className="loading-blob" />
      ) : visible.length === 0 ? (
        <p className="empty-msg">No products match "{search}" 🫧</p>
      ) : (
        <div className="product-grid">
          {visible.map((item) => (
            <Card data={item} key={item.id} />
          ))}
        </div>
      )}

      <style>{`
        .products-page { padding: 44px 24px 60px; }
        .toolbar {
          display: flex;
          gap: 14px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }
        .search-input, .sort-select {
          border: 2px solid #F1ECFF;
          background: white;
          border-radius: var(--radius-pill);
          padding: 11px 20px;
          font-weight: 600;
          font-size: 0.92rem;
          outline: none;
        }
        .search-input { flex: 1; min-width: 220px; }
        .search-input:focus, .sort-select:focus { border-color: var(--color-accent); }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .empty-msg { color: var(--color-text-light); font-weight: 600; padding: 40px 0; }

        @media (max-width: 940px) { .product-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 520px) { .product-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}

export default Products

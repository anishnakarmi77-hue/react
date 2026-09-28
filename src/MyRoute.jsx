import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import Homepage from './pages/Homepage'
import Products from './pages/Products'
import Productview from './pages/Productview'
import Register from './pages/Register'
import Cart from './pages/Cart'

const MyRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path='/products' element={<Products />} />
          <Route path='/productview/:product_id' element={<Productview />} />
          <Route path='/register' element={<Register />} />
          <Route path='/cart' element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default MyRoute

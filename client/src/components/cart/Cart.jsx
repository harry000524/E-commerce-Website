import React from 'react'
import { BsFillTrashFill } from 'react-icons/bs'
import { CiCircleRemove } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { emptyCart, removeProduct, toggleShowCart } from '../../redux/cartSlice'
import './Cart.css'

function Cart() {
  const {products} = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  let total = 0
  products?.length > 0 && products.map((product) => total += (Number(product.quantity) * Number(product.price)))

  const removeFromCart = (id) => {
    dispatch(removeProduct({id}))
  }

  const resetCart = () => {
    dispatch(emptyCart())
  }
 
  const handleCloseCart = () => {
    dispatch(toggleShowCart())
  }

  return (
    <div className="show-cart-container">
      <div className="show-cart-wrapper">
        {total > 0 && <h2 className='show-cart-title'>Cart Items</h2>}
        <div className="show-cart-items">
          {products?.length === 0 ? (
            <h1 className='no-product'>No products yet.</h1>
          ): (
            products?.map((product) => (
              <div key={product.id} className="show-cart-item">
                <Link to={`/productDetail/${product.id}`}>
                  <img src={`https://d-and-j-diner.onrender.com/images/${product?.img}`} alt="product" className='show-cart-image' />
                </Link>
                <div className="show-cart-price-and-title">
                  <p className="show-cart-product-title">{product.title}</p>
                  <p className="show-cart-price">
                    {product.quantity} x <span>₱</span> {product.price}
                  </p>
                </div>
                <BsFillTrashFill className='trash-icon' onClick={() => removeFromCart(product.id)}/>
              </div>
            ))
          )}
        </div>
        {total > 0 &&
        <>
        <div className="subtotal">
          <span>Subtotal</span>
          <span className="totalPrice">
            <span>₱</span> {Number(total).toFixed(2)}
          </span>
        </div>
        <Link to="/address" onClick={handleCloseCart} className="checkOutBtn">Proceed to Check-out</Link>
        </>
        }
        {total > 0 && (
          <div onClick={resetCart} className="reset-cart">
            Reset Cart
          </div>
        )}
        <CiCircleRemove onClick={handleCloseCart} className="remove-icon"/>
      </div>
    </div>
  )
}

export default Cart
import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ArrowLeftOutlined } from '@ant-design/icons/lib/icons'
import { Button } from 'antd'
import './cart.css'
import { removeFromCart, incrementCart, decrementCart, clearCart, getTotals } from '../features/cartSlice'

const Cart = () => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)

  useEffect(() => {
    dispatch(getTotals())
  }, [cart, dispatch]);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem))
  }
  const handleIncrementCart = (cartItem) => {
    dispatch(incrementCart(cartItem))
  }
  const handleDecrementCart = (cartItem) => {
    dispatch(decrementCart(cartItem))
  }
  const handleClearCart = () => {
    dispatch(clearCart())
  }

  return (
    <div className='cart-container'>
      <h2 className="title">Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className='cart-empty'>
          <p className="warning">
            Your cart is currently empty
          </p>
          <div className='start'>
            <Link to='/'>
              <ArrowLeftOutlined className='arrow' />
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className='product-specify'>
            <span className='product-name'>Product</span>
            <span className='price'>Price</span>
            <span className='quantity'>Quantity</span>
            <span className='total'>Total</span>
          </div>

          <div className='product-items'>
            <ul className='product-ul'>
              {cart.cartItems?.map((cartItem, key) => {
                return (
                  <li className='cart-list' key={cartItem.id}>
                    <div className='cartItem'>
                      <img src={cartItem.image} alt={cartItem.name}></img>
                      <div className='cartItem-desc'>
                        <h3>{cartItem.name}</h3>
                        <p>{cartItem.desc}</p>
                        <div className='remove'><Button className='remove-button' onClick={() => handleRemoveFromCart(cartItem)}>Remove</Button></div>
                      </div>
                    </div>

                    <div className='cartItem-price'>${cartItem.price}</div>
                    <div className='quantity-align'>
                      <div className='quantity-group'>
                        <button onClick={() => handleDecrementCart(cartItem)}>-</button>
                        <div className='cartItem-cartQuantity'>{cartItem.cartQuantity}</div>
                        <button onClick={() => handleIncrementCart(cartItem)}>+</button>
                      </div>
                    </div>

                    <div className='cartItem-totalPrice'>${cartItem.price * cartItem.cartQuantity}</div>
                  </li>
                )
              })
              }
            </ul>
          </div>
          <div className='total'>
            <Button className='clear-cart' onClick={() => handleClearCart()}>Clear Cart</Button>
            <div className='total-div'>
              <div className='subtotal'>
                <h3>Subtotal</h3>
                <h3>${cart.cartTotalAmount}</h3>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <Button className='check-out' type="primary">Check out</Button>
              <div>
                <Link to='/'>
                  <ArrowLeftOutlined />
                  <span className='continue'>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
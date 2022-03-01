import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ShoppingCartOutlined } from '@ant-design/icons/lib/icons'
import './navbar.css'

const Navbar = () => {
  const { cartTotalQuantity } = useSelector(state => state.cart)

  return (
    <div className='navbar'>
        <Link to='/'><h2>Online Shop</h2></Link>
        <Link to='/cart'>
          <div className='navbar-bag'>
            <div>
              <ShoppingCartOutlined className='navbar-svg' />
            </div>
            <div className='navbar-bag-quantity'>
              <span>{ cartTotalQuantity }</span>
            </div>
          </div>
        </Link>
      </div>
  )
}

export default Navbar
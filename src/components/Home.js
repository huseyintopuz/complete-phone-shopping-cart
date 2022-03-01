import React from 'react'
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom'
import { data } from '../Data'
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './home.css'
import { addToCart } from '../features/cartSlice';

const Home = () => {
  const dispatch = useDispatch()
  // const navigate = useNavigate()

  const handleAddToCart = (product) => {
      dispatch(addToCart(product))
      // navigate.push('/cart')
  }

  return (
    <div className='home'>
      <ul className='products-list' >
        {data.map((product, key) => {
          return (
            <li className='product' key={product.id}>
              <img src={product.image} alt={product.name}></img>
              <span className='span span-name'>{product.name}</span>
              <span className='span'>{product.desc}</span>
              <span className='span'>${product.price}</span>
              <Button className='button' type="primary" onClick={() => handleAddToCart(product)}>Add to Cart</Button>              
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Home
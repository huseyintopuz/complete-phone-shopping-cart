import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons/lib/icons'
import './notfound.css'

const NotFound = () => {
    return (
        <div className='notfound'>
            <h1>Page Not Found</h1>
            <p>Looks like you have followed a broken link or entered <br /> a URL that doesn't exist on this site</p>
            <Link to='/'>
                <div className='back'>
                    <ArrowLeftOutlined className='back-icon' />
                    <h2>Back to our site</h2>
                </div>
            </Link>
        </div>
    )
}

export default NotFound
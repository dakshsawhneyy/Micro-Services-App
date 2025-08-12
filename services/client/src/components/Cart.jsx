import React from 'react'
import { useState } from 'react'
import image1 from '../assets/image1.png'
import image from '../assets/image.png'
import image3 from '../assets/image3.png'
import axios from 'axios'

const Cart = () => {

    const cartItems = [
        { id: 1, name: 'Japanese Shoes', image: image1, price: 50 },
        { id: 2, name: 'Japanese Tshirt', image: image, price: 20 },
        { id: 3, name: 'Japanese Cap', image: image3, price: 15 }
    ]

    const handleCheckout = async() => {
        try {
            const response = await axios.post('http://localhost:8000/payment-service',{
            "cart": cartItems, "total": 3500
            })
            console.log("Checkout response:", response.data);
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    }

    return (
        <div className='h-screen py-10 px-5 flex flex-col'>
            <div className='grid md:grid-cols-4 gap-5 '>
                <div className='max-w-80 border'>
                    <img src={image1} alt="" className='' />
                    <h1 className='text-xl text-center'>Japanese Shoes</h1>
                    <p className='text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus adipisci minima dolores! Eligendi incidunt</p>
                </div>
                <div className='max-w-80 border'>
                    <img src={image} alt="" className='' />
                    <h1 className='text-xl text-center'>Japanese Tshirt</h1>
                    <p className='text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus adipisci minima dolores! Eligendi incidunt</p>
                </div>
                <div className='max-w-80 border'>
                    <img src={image3} alt="" className='' />
                    <h1 className='text-xl text-center'>Japanese Cap</h1>
                    <p className='text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus adipisci minima dolores! Eligendi incidunt</p>
                </div>
            </div>
            <div className='flex gap-5 mt-10 w-60'>
                <h3 className='text-xl'>Total</h3>
                <div className='flex-1 border p-5 '>
                    <h2 className='text-2xl'>3</h2>
                    <p className='text-sm'>Items in cart</p>
                </div>
            </div>

            <button className='bg-black text-white w-24 p-3 rounded text-center ml-auto mr-auto' onClick={handleCheckout}>CheckOut</button>

        </div>
    )
}

export default Cart

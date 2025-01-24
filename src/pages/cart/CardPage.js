import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CardHeader from '../header/cardHeader';
import './CardPage.css';

export const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cartget',{
        headers:{
          Authorization:localStorage.token
        }
      });
      console.log(response,"responseeeeeeeee");
      
      if (response.status === 200) {
        setCart(response.data.cart);
      } 
      else {
        console.error('Error fetching cart:', response.statusText);
      }
    } catch (error) {
      
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    fetchCart(); 
  }, []);

 
  const handleRemoveFromCart = async (id) => {
    try {
      const updatedCart = cart.filter(item => item._id === id);

          

      const response = await axios.post('http://localhost:5000/api/cartput', updatedCart,{
        headers:{
          Authorization:localStorage.token
        }
      });
      if (response.status === 200) {
        setCart(updatedCart);
      } else {
        console.error('Error updating cart:', response.statusText);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <>
      <CardHeader />
      <div className="app-container">
        <h1 className="heading">Your Cart</h1>
        
        <div className="cart-items-container">
          {cart?.length > 0 ? (
            cart.map((item) => (
              <div key={item._id} className="cart-item">
                <h2>{item.title}</h2>
                <p>Price: ${item.amount}</p>
                <p>Quantity: {item.quantity}</p>
                <button className="remove-btn" onClick={() => handleRemoveFromCart(item._id)}>
                  Remove from Cart
                </button>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        
        <div className="cart-actions">
          <button className="checkout-btn" onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartPage;

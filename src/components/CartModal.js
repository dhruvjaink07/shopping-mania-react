import React from 'react';
import PropTypes from 'prop-types';
import '../styles/CartModal.css';  // Ensure you have a separate CSS file for CartModal styles

const CartModal = ({ open, onClose, cart }) => {
    return (
      <div className={`cart-modal ${open ? 'open' : ''}`} onClick={onClose}>
        <div className="cart-content" onClick={(e) => e.stopPropagation()}>
          <h2>Your Cart</h2>
          <ul>
          <div className='disp-prod'>
            {cart.map((product) => (
              <li key={product.id}>
                <p>{product.title}</p>
                <p>{product.price}</p>
              </li>
            ))}
            </div>
          </ul>
          <button className='redBtn' onClick={onClose}>Close Cart</button>
        </div>
      </div>
    );
  };

CartModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
};

export default CartModal;

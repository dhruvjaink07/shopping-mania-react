import React from 'react';
import PropTypes from 'prop-types';
import '../styles/card.css';

const ProCard = ({ product, onAddToCart }) => {
  const { thumbnail, title, price, rating } = product;

  return (
        
    <div className="card">
        <div className="coverimage">
            <img src={thumbnail} alt={title} />
        </div>
        <div className="card-info">
            <h3>{title}</h3>
            <div className="other">
                <p>{price}</p>
                <p className='yellow'>{rating}</p>
            </div>
        </div>
        <button className='add-cart' onClick={()=>onAddToCart(product)}>
            Add Cart
        </button>
    </div>

    
  );
};

ProCard.propTypes = {
  product: PropTypes.shape({
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProCard;

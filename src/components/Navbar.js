import React, { useState } from 'react';
import '../styles/navbar.css';
import FilterModal from './FilterModal';
import CartModal from './CartModal';

const Navbar = ({ onFilter, onOpenCart, cart, onSearch }) => {
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenFilterModal = () => {
    setFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setFilterModalOpen(false);
  };

  const handleOpenCartModal = () => {
    setCartModalOpen(true);
  };

  const handleCloseCartModal = () => {
    setCartModalOpen(false);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className='navbar'>
      <nav>
        <ul>
          <li className='start'>Shopping Mania</li>
          <input
            type="text"
            id="searchInput"
            className="searchBox"
            placeholder='Search Products'
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="btngrp">
            <li>
              <button className="btn" onClick={handleOpenFilterModal}>
                <i className="fa fa-filter"></i> Filter
              </button>
              <FilterModal open={filterModalOpen} onClose={handleCloseFilterModal} onFilter={onFilter} />
            </li>
            <li>
              <button className="btn" onClick={onOpenCart}>
                Add Cart
              </button>
              <CartModal open={cartModalOpen} onClose={handleCloseCartModal} cart={cart} />
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

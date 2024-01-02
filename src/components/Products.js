import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import '../styles/Products.css';
import Navbar from './Navbar';
import ProCard from "./ProCard";
import CartModal from "./CartModal";
import FilterModal from "./FilterModal";

const Products = () => {  
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchedProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();

        if (Array.isArray(data.products)) {
          setProducts(data.products);
          setLoading(false);
        } else {
          console.error('Invalid data structure:', data);
        }
      } catch (error) {
        console.error("Error fetching products ", error);
      }
    };
    fetchedProducts();
  }, []);
  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    setCart([...cart, product]);
    console.log(`Added ${product.title} to the cart`, cart);
  };
  
  const handleOpenCart = () => {
    console.log('Opening cart');
    setCartModalOpen(true);
  };
  

  const handleCloseCart = () => {
    setCartModalOpen(false);
  };


  const handleOpenFilterModal = () => {
    setFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setFilterModalOpen(false);
  };

  const handleFilter = (criterion) => {
    const sortedProducts = [...products].sort((a, b) => {
      if (criterion) {
        return a[criterion] - b[criterion];
      }
      return 0;
    });
  
    setFilteredProducts(sortedProducts);
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  }
  return (
    <div>
      <Navbar onFilter={handleFilter} onOpenCart={handleOpenCart} cart={cart}  onSearch={handleSearch} />
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          (filteredProducts.length > 0 ? filteredProducts : products).map((product) => (
            <ProCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))

        )}
      </div>
      <CartModal open={cartModalOpen} onClose={handleCloseCart} cart={cart} product={products} />
      <FilterModal open={filterModalOpen} onClose={handleCloseFilterModal} onFilter={handleFilter} />
    </div>
  );
};


Products.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Products;

// FilterModal.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/FilterModal.css';

const FilterModal = ({ open, onClose, onFilter }) => {
  const [selectedCriteria, setSelectedCriteria] = useState([]);

  const handleToggleCriterion = (criterion) => {
    // Toggle the selected criteria
    if (selectedCriteria.includes(criterion)) {
      setSelectedCriteria(selectedCriteria.filter((c) => c !== criterion));
    } else {
      setSelectedCriteria([...selectedCriteria, criterion]);
    }
  };

  const handleApplyFilter = () => {
    // Apply filter with the selected criteria
    onFilter(selectedCriteria);
    onClose();
  };

  const handleResetFilter = () => {
    // Reset the selected criteria and close the modal
    setSelectedCriteria([]);
    onClose();
  };

  return (
    <div className={`filter-modal ${open ? 'open' : ''}`}>
      <div className="filter-content" onClick={(e) => e.stopPropagation()}>
        <h2>Filter Options</h2>
        <div className="filter-options">
          {/* Use map to generate checkboxes and labels */}
          {['price', 'discountPercentage', 'rating', 'stock', 'brand', 'category'].map((criterion) => (
            <div key={criterion} className="filter-column">
              <label>
                <input
                  type="checkbox"
                  name="filterCriterion"
                  value={criterion}
                  checked={selectedCriteria.includes(criterion)}
                  onChange={() => handleToggleCriterion(criterion)}
                />
                {criterion.charAt(0).toUpperCase() + criterion.slice(1)}
              </label>
            </div>
          ))}
        </div>
        <div className="filter-buttons">
          <button onClick={handleApplyFilter}>Apply Filter</button>
          <button className="redBtn" onClick={handleResetFilter}>Close</button>
        </div>
      </div>
    </div>
  );
};

FilterModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default FilterModal;

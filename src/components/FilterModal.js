import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../FilterModal.css';

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

  return (
    <div className={`filter-modal ${open ? 'open' : ''}`}>
      <div className="filter-content" onClick={(e) => e.stopPropagation()}>
        <h2>Filter Options</h2>
        <div>
          {/* Use map to generate checkboxes and labels */}
          {['price', 'discountPercentage', 'rating', 'stock', 'brand', 'category'].map((criterion) => (
            <label key={criterion}>
              <input
                type="checkbox"
                name="filterCriterion"
                value={criterion}
                checked={selectedCriteria.includes(criterion)}
                onChange={() => handleToggleCriterion(criterion)}
              />
              {criterion.charAt(0).toUpperCase() + criterion.slice(1)}
            </label>
          ))}
        </div>
        <button onClick={handleApplyFilter}>Apply Filter</button>
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

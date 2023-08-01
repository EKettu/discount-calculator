import { useState } from 'react';
import PropTypes from 'prop-types';

const DiscountForm = ({ createDiscount }) => {
  const [newDiscount, setNewDiscount] = useState({
    reason: '',
    percentage: ''
  })

  const addDiscount = (event) => {
    event.preventDefault();
    createDiscount(newDiscount);
    setNewDiscount({
        reason: '',
        percentage: ''
      });
  }

  function handleChange(evt) {
    const value = evt.target.value;
    setNewDiscount({
      ...newDiscount,
      [evt.target.name]: value,
    });
  }

  return (
    <div>
      <h2>Create a new discount reason</h2>

      <form onSubmit={addDiscount}>
      <label>
        Discount reason
        <input
          type="text"
          name="reason"
          value={newDiscount.reason}
          onChange={handleChange}
        />
      </label>
      <label>
        Discount percentage
        <input
          type="text"
          name="percentage"
          value={newDiscount.percentage}
          onChange={handleChange}
        />
      </label>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

DiscountForm.propTypes = {
    createDiscount: PropTypes.func
};

export default DiscountForm
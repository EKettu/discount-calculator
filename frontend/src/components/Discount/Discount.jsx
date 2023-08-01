import {useParams} from 'react-router-dom';
import PropTypes from 'prop-types';

const Discount = ({ discount, updateDiscountPct, newDiscountPct, handleDiscountChange }) => {
  const id = useParams().id;
  
  if (discount) {
    return (
      <div className="container">
        <h2>Discount: {discount.reason}</h2>
        <p>Current discount percentage: {discount.percentage}</p>
        <div>
          <h4>Update discount percentage</h4>
          <form onSubmit={updateDiscountPct(id)}>        
            <input value={newDiscountPct} onChange={handleDiscountChange}/>        
            <button type="submit">update</button>      
          </form>
        </div>
      </div>    
    )
  }
  return (
    <div>
      <p> Loading</p>  
    </div>
    
  )
}

Discount.propTypes = {
  discount: PropTypes.shape({
      reason: PropTypes.string,
      id: PropTypes.number,
      percentage: PropTypes.number,
  }),
  updateDiscountPct: PropTypes.func,
  handleDiscountChange: PropTypes.func,
  newDiscountPct: PropTypes.string
};

export default Discount;
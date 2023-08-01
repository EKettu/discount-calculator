import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DiscountForm from '../DiscountForm';

const DiscountList = ({discounts, createDiscount}) => {

    return (
        <div>
            <h2>Discounts</h2>
            <ul>
            {discounts.map(discount => 
                <li key={discount.id}>
                    <Link to={`/discounts/${discount.id}`}>{discount.reason}</Link>
                </li>          
            )} 
        </ul>
        <DiscountForm createDiscount={createDiscount}/>
      </div>
    )
}

DiscountList.propTypes = {
    discounts: PropTypes.array,
    createDiscount: PropTypes.func
};

export default DiscountList;
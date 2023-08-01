import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const DiscountList = ({discounts}) => {

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
      </div>
    )
}

DiscountList.propTypes = {
    discounts: PropTypes.array,
};

export default DiscountList;
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CustomerList = ({customers}) => {

    return (
        <div>
            <h2>Customers</h2>
            <ul>
            {customers.map(customer => 
                <li key={customer.id}>
                    <Link to={`/customers/${customer.id}`}>{customer.name}</Link>
                </li>          
            )} 
        </ul>
      </div>
    )
}

CustomerList.propTypes = {
    customers: PropTypes.array,
};

export default CustomerList;
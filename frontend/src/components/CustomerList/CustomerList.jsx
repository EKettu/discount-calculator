import {
    Link
  } from 'react-router-dom';


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

export default CustomerList
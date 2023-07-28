// import {useState} from 'react'
// import {useParams} from 'react-router-dom'
import { createCustomerProductList } from './../../services/utils'
// import Select from 'react-select'

const Customer = ({ customer, products }) => {

  // const id = useParams().id;
  // const [selectedProduct, setSelectedProduct] = useState(null);

  if(customer) {
    
    const customersProducts = createCustomerProductList(customer, products)
    return (
      <div>
        <h2>{customer.name}</h2>
        <div>
              <h4>Products purchased</h4>
              <ul>
              {customersProducts.map(product => 
                  <li key={product.id}>
                      <p>{product.name} price: {product.normalPrice}</p>
                  </li>          
              )} 
          </ul>
        </div>
      </div>

    )
  }

  return (
    <p>Loading...</p>
  )

}

export default Customer
import { useState, useEffect}  from 'react';
import axios from 'axios'
import Product from './components/Product/Product';
import Customer from './components/Customer/Customer';
import { BASE_URL } from './services/config';

const App = () => {

  const [products, setProducts] = useState([])
  const [customers, setCustomers] = useState([])
  const [deals, setDeals] = useState([])

  useEffect(() => { 
    axios
    .get(`${BASE_URL}/products`)
    .then(response => {
      console.log(response)
      setProducts(response.data)
      console.log(products)
    })
  }, [])

  useEffect(() => { 
    axios
    .get(`${BASE_URL}/customers`)
    .then(response => {
      console.log(response)
      setCustomers(response.data)
      console.log(customers)
    })
  }, [])

  useEffect(() => { 
    axios
    .get(`${BASE_URL}/deals`)
    .then(response => {
      console.log(response)
      setDeals(response.data)
      console.log(deals)
    })
  }, [])

  return(
    <div>
    <h1>Discount Calculator</h1>
    <h2>Products</h2>
    <ul>
      {products.map(product =>           
        <Product key={product.id} product={product} />
        )} 
    </ul>
    <h2>Customers</h2>
    <ul>
      {customers.map(customer =>           
        <Customer key={customer.id} customer={customer}/>
        )} 
    </ul>
  </div>
  )
}

export default App

import { useState, useEffect}  from 'react';
import {
  Routes, Route, Link, useMatch
} from 'react-router-dom'
import axios from 'axios'
import Product from './components/Product/Product';
import CustomerList from './components/CustomerList/CustomerList';
import ProductList from './components/ProductList/ProductList';
import { BASE_URL } from './services/config';
import Customer from './components/Customer/Customer';
import productService from './services/products';

const App = () => {

  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [newDiscountPct, setNewDiscountPct] = useState("");

  const match = useMatch('/products/:id');
  const product = match ? products.find(product => product.id === Number(match.params.id)) : null;

  useEffect(() => { 
    productService
    .getAll()
    .then(response => {
      // console.log(response)
      setProducts(response.data);
    })
  }, [])

  useEffect(() => { 
    axios
    .get(`${BASE_URL}/customers`)
    .then(response => {
      // console.log(response)
      setCustomers(response.data);
    })
  }, [])

  const padding = {
    padding: 5
  }

  const handleDiscountChange = (event) => {
    setNewDiscountPct(event.target.value)
  }
  
  const updateDiscountPct = (event) => {
    event.preventDefault();
    const changedProduct = { ...product, discountPct: Number(newDiscountPct)};

    productService
      .update(product.id, changedProduct)
      .then(response => {
        setProducts(response.data);       
      })
      .catch(error => {
        console.log(error.message)
        alert("Update failed, please check the input");
      });

    setNewDiscountPct('');
  }

  return(
    <div>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/products">products</Link>
        <Link style={padding} to="/customers">customers</Link>
      </div>

      <Routes>
        <Route path="/products/:id" element={<Product product={product} 
                                                      updateDiscountPct={()=>updateDiscountPct} 
                                                      newDiscountPct={newDiscountPct} 
                                                      handleDiscountChange={handleDiscountChange} 
                                                      customers={customers}/>} />
        <Route path="/customers/:id" element={<Customer customers={customers} />} />
        <Route path="/products" element={<ProductList products={products} />} />
        <Route path="/customers" element={<CustomerList customers={customers}/>} />
        <Route path="/" element={<ProductList products={products} />} />
      </Routes>
    </div>
  )
}

export default App

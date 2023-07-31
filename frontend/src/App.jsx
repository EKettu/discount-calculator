import { useState, useEffect}  from 'react';
import {
  Routes, Route, Link, useMatch
} from 'react-router-dom'
import Product from './components/Product/Product';
import CustomerList from './components/CustomerList/CustomerList';
import ProductList from './components/ProductList/ProductList';
import Customer from './components/Customer/Customer';
import axiosService from './services/axiosService';
import { BASE_URL } from './services/config';

const productsUrl = `${BASE_URL}/products`
const customersUrl = `${BASE_URL}/customers`

const App = () => {

  const padding = {
    padding: 5
  }

  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [newDiscountPct, setNewDiscountPct] = useState("");
  const [newDealPrice, setNewDealPrice] = useState("");

  const productMatch = useMatch('/products/:id');
  const product = productMatch ? products.find(product => product.id === Number(productMatch.params.id)) : null;

  const customerMatch = useMatch('/customers/:id');
  const customer = customerMatch ?customers.find(customer => customer.id === Number(customerMatch.params.id)) : null;

  useEffect(() => { 
    axiosService
    .getAll(productsUrl)
    .then(response => {
      // console.log(response)
      setProducts(response.data);
    })
  }, [])

  useEffect(() => { 
    axiosService
    .getAll(customersUrl)
    .then(response => {
      // console.log(response)
      setCustomers(response.data);
    })
  }, [])

  const handleDiscountChange = (event) => {
    setNewDiscountPct(event.target.value)
  }

  const handleDealChange = (event) => {
    setNewDealPrice(event.target.value)
  }
  
  const updateDiscountPct = (event) => {
    event.preventDefault();
    const changedProduct = { ...product, discountPct: Number(newDiscountPct)};

    axiosService
      .update(productsUrl, product.id, changedProduct)
      .then(response => {
        setProducts(response.data);       
      })
      .catch(error => {
        console.log(error.message)
        alert("Update failed, please check the input");
      });

    setNewDiscountPct('');
  }

  const updateDeal = (event) => {
    const productId = Number(event.target[0].value)
    event.preventDefault();
    let specialDeals = customer.specialDeals
    if(!specialDeals.some(deal => deal.productId === productId)) {
      specialDeals.push({productId: productId, dealPrice: Number(newDealPrice)})
    }
    else {
      specialDeals = specialDeals.map(deal => deal.productId === productId ? {...deal, dealPrice: Number(newDealPrice)} : deal);
    }
    const changedCustomer = {...customer, specialDeals: specialDeals};
    axiosService
      .update(customersUrl, customer.id, changedCustomer)
      .then(response => {
        setCustomers(response.data);       
      })
      .catch(error => {
        console.log(error.message)
        alert("Update failed, please check the input ", error.message);
      });

    setNewDealPrice('');
  }

  return(
    <div className="container">
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
        <Route path="/customers/:id" element={<Customer customer={customer} 
                                                        products={products} 
                                                        updateDeal={()=>updateDeal}
                                                        newDealPrice={newDealPrice}
                                                        handleDealChange={handleDealChange}/>} />
        <Route path="/products" element={<ProductList products={products} />} />
        <Route path="/customers" element={<CustomerList customers={customers}/>} />
        <Route path="/" element={<ProductList products={products} />} />
      </Routes>
    </div>
  )
}

export default App

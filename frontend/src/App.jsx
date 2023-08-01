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
import DiscountList from './components/DiscountList/DiscountList';
import Discount from './components/Discount/Discount';
import Home from './components/Home/Home'

const productsUrl = `${BASE_URL}/products`
const customersUrl = `${BASE_URL}/customers`
const discountsUrl = `${BASE_URL}/discounts`

const App = () => {

  const padding = {
    padding: 5
  }

  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [newDiscountPct, setNewDiscountPct] = useState("");
  const [newDealPrice, setNewDealPrice] = useState("");

  const productMatch = useMatch('/products/:id');
  const product = productMatch ? products.find(product => product.id === Number(productMatch.params.id)) : null;

  const customerMatch = useMatch('/customers/:id');
  const customer = customerMatch ?customers.find(customer => customer.id === Number(customerMatch.params.id)) : null;

  const discountMatch = useMatch('/discounts/:id');
  const discount = discountMatch ? discounts.find(discount => discount.id === Number(discountMatch.params.id)) : null;
  
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

  useEffect(() => { 
    axiosService
    .getAll(discountsUrl)
    .then(response => {
      // console.log(response)
      setDiscounts(response.data);
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
    const changedDiscount = { ...discount, percentage: Number(newDiscountPct)};

    axiosService
      .update(discountsUrl, discount.id, changedDiscount)
      .then(response => {
        setDiscounts(response.data);       
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
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/products">Products</Link>
        <Link style={padding} to="/customers">Customers</Link>
        <Link style={padding} to="/discounts">Discounts</Link>
      </div>

      <Routes>
        <Route path="/products/:id" element={<Product product={product}
                                                      discounts={discounts}
                                                      customers={customers}/>} />
        <Route path="/customers/:id" element={<Customer customer={customer}
                                                        discounts={discounts}
                                                        products={products} 
                                                        updateDeal={()=>updateDeal}
                                                        newDealPrice={newDealPrice}
                                                        handleDealChange={handleDealChange}/>} />
        <Route path="/discounts/:id" element={<Discount discount={discount} 
                                                        updateDiscountPct={()=>updateDiscountPct} 
                                                        newDiscountPct={newDiscountPct} 
                                                        handleDiscountChange={handleDiscountChange} />} />
        <Route path="/products" element={<ProductList products={products} />} />
        <Route path="/customers" element={<CustomerList customers={customers}/>} />
        <Route path="/discounts" element={<DiscountList discounts={discounts}/>} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App

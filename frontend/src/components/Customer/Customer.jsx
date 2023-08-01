import {useState} from 'react';
import {useParams} from 'react-router-dom';
import { createCustomerProductOptions, 
        getProductsPriceForCustomer, 
        saleLimitExceeded, 
        createProductOptions } from './../../services/utils';
import Select from 'react-select';
import PropTypes from 'prop-types';
import './Customer.css'

const Customer = ({ customer, products, discounts, updateDeal, handleDealChange, newDealPrice }) => {

  const id = useParams().id;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const buttonText = showAll ? 'Hide product list' : 'Show product list';

  if(customer) {
    const productOptions = createProductOptions(products);
    const customersProducts = createCustomerProductOptions(customer, products);
    const specialProduct = selectedProduct ? 
                            (customer.specialDeals.find(deal => deal.productId === selectedProduct.id) 
                            || saleLimitExceeded(customer)) : false;
    const customerPrice = selectedProduct && discounts ? 
                            getProductsPriceForCustomer(customer, selectedProduct, discounts) : null;
    const priceText = specialProduct ? '(special price)' : '(normal price)';

    return (
      <div className='body'>
        <h2>{customer.name}</h2>
        <h4>All products</h4>
        <p>Select a product to see the price for the customer and/or set a new static price for a product.</p>
        {productOptions.length > 0 ?
            <div >
                <div style={{maxWidth: 300}}>
                  <Select
                    placeholder='Select product'
                    defaultValue={selectedProduct}
                    onChange={setSelectedProduct}
                    options={productOptions}
                />  
                </div>
                {selectedProduct ? 
                  <div> <p>Price for customer {customer.name}: {customerPrice} {priceText}</p>
                        <div>
                          <h4>Update product deal</h4>
                          <p>Use the form to change static price of the product for the customer.</p>
                          <form onSubmit={updateDeal(id)}> 
                            <input type="hidden" value={selectedProduct.id}/>       
                            <input value={newDealPrice} onChange={handleDealChange}/>        
                            <button type="submit">update</button>      
                          </form>
                      </div> 
                  </div>
                  : ""}
          </div> 
          :
          <p>No products found</p>}

        <div className='list'>
          <p>Click the button below to see a list of products currently associated with the customer.</p>
          <div className='button'>
            <button onClick={() => setShowAll(prevShowAll => !prevShowAll)}>{buttonText}</button>  
          </div>
          { showAll ? 
            <div >
                <h4>Customers products</h4>
                <ul>
                {customersProducts.map(product => 
                    <li key={product.id}>
                        <p>{product.name} normal price: {product.normalPrice} price for {customer.name}: {getProductsPriceForCustomer(customer, product)} </p>
                    </li>          
                )} 
            </ul>
            </div>
            : null}
          </div>
      </div>
    );
  }


  return (
    <p>Loading...</p>
  );

}

Customer.propTypes = {
  customer: PropTypes.shape({
      name: PropTypes.string,
      specialDeals: PropTypes.array
  }),
  products: PropTypes.array,
  discounts: PropTypes.array,
  updateDeal: PropTypes.func,
  handleDealChange: PropTypes.func,
  newDealPrice: PropTypes.string
};

export default Customer;
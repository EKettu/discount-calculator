import {useState} from 'react';
import {useParams} from 'react-router-dom';
import { createCustomerProductOptions, getProductsPriceForCustomer } from './../../services/utils';
import Select from 'react-select';
import PropTypes from 'prop-types';

const Customer = ({ customer, products, updateDeal, handleDealChange, newDealPrice }) => {

  const id = useParams().id;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const buttonText = showAll ? 'Hide product list' : 'Show product list';

  if(customer) {

    const customersProducts = createCustomerProductOptions(customer, products);
    const specialProduct = selectedProduct ? customer.specialDeals.find(deal => deal.productId === selectedProduct.id) : false;
    const priceText = specialProduct ? '(special price)' : '(normal price)'

    return (
      <div>
        <h2>{customer.name}</h2>
        <h4>Products of the customer</h4>
        {customersProducts.length > 0 ?
            <div>
                <div style={{maxWidth: 400}}>
                  <Select
                    defaultValue={selectedProduct}
                    onChange={setSelectedProduct}
                    options={customersProducts}
                />  
                </div>
                {selectedProduct ? 
                  <div> <p>Price for customer {customer.name}: {getProductsPriceForCustomer(customer, selectedProduct)} {priceText}</p>
                        <div>
                          <h4>Update product deal</h4>
                          <form onSubmit={updateDeal(id)}> 
                            <input type="hidden" value={selectedProduct.id}/>       
                            <input value={newDealPrice} onChange={handleDealChange}/>        
                            <button type="submit">update</button>      
                          </form>
                      </div> 
                  </div>
                  : "select a product"}
          </div> 
          :
          <p>No associated products found for {customer.name}</p>}

        <div>
          <button onClick={() => setShowAll(prevShowAll => !prevShowAll)}>{buttonText}</button>  
        </div>
        { showAll ?         <div>
              <h4>Products as a list</h4>
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
  updateDeal: PropTypes.func,
  handleDealChange: PropTypes.func,
  newDealPrice: PropTypes.string
};

export default Customer;
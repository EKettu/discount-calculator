import {useState, useRef } from 'react';
import Select from 'react-select';
import { SEASONS } from '../../services/config';
import {createCustomerOptions, 
        calculateDiscountPrice, 
        saleLimitExceeded} from '../../services/utils';
import PropTypes from 'prop-types';


const setCustomerDiscountPrice = (productSalePrice, deal, saleAmountLimitExceeded, discountReason) => {
  if(deal && saleAmountLimitExceeded) {
    if(deal.dealPrice < productSalePrice) {
      discountReason.current = ('a static price negotiated');
      return deal.dealPrice;
    }
    else {
      discountReason.current = ('the amount of purchases made');
      return productSalePrice;
    }
  }
  if(deal) {
    discountReason.current = ('a static price negotiated');
    return deal.dealPrice
  }
  if(saleAmountLimitExceeded) {
    discountReason.current = ('the amount of purchases made');
    return productSalePrice
  }
  else {
    return ''
  }
}

const Product = ({ product, discounts, customers}) => {

  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const discountReason = useRef('');

  if (product) {
    let seasonDiscountPrice = discounts ? calculateDiscountPrice(product, discounts, 'season') : product.normalPrice;
    const productSalePrice = discounts ? calculateDiscountPrice(product, discounts, 'sales') : product.normalPrice;

    const saleSeasonSelected = product.saleMonths ? product.saleMonths.includes(selectedSeason ? selectedSeason.value : 0) : false;
    const deal = selectedCustomer ? selectedCustomer.specialDeals.find(dealProduct => 
                                      dealProduct.productId ===product.id) : null;

    const dealCustomerOptions = customers ? createCustomerOptions(product, customers) : [];
    const saleAmountLimitExceeded = selectedCustomer && (saleLimitExceeded(selectedCustomer));
    let customerDiscountPrice = setCustomerDiscountPrice(productSalePrice, deal, saleAmountLimitExceeded, discountReason);

    return (
      <div className="container">
        <h2>{product.name}</h2>
        <p>Normal price: {product.normalPrice}</p>
        <div style={{maxWidth: 300}}> 
          <Select
            defaultValue={selectedSeason}
            onChange={setSelectedSeason}
            options={SEASONS}
          />  
        </div>
        <p>Seasonal discount price: {saleSeasonSelected ? seasonDiscountPrice : "no discount"}</p>
        {/* <div>
          <h3>Discounts based on season </h3>
          <p>Current seasonal discount percentage: {product.discountPct} %</p>
          <h4>Update discount percentage</h4>
          <form onSubmit={updateProductDiscountPct(id)}>        
            <input value={newDiscountPct} onChange={handleDiscountChange}/>        
            <button type="submit">update</button>      
          </form>
        </div> */}
        <div>
          <h3>Customers with special deals for {product.name}</h3>
          {dealCustomerOptions.length > 0 ?
            <div>
                <div style={{maxWidth: 400}}>
                  <Select
                  defaultValue={selectedCustomer}
                  onChange={setSelectedCustomer}
                  options={dealCustomerOptions}
                />  
                </div>
                {selectedCustomer? <p>Special price for customer {selectedCustomer.name}: {customerDiscountPrice} based on {discountReason.current}</p> 
                : "select a customer"}
          </div> 
          :
          <p>No customers with special deals for {product.name} found</p>}
        </div>
      </div>    
    )
  }
  return (
    <div>
      <p> Loading</p>  
    </div>
    
  )
}

Product.propTypes = {
  product: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
      normalPrice: PropTypes.number,
      saleMonths: PropTypes.array,
  }),
  customers: PropTypes.array,
  discounts: PropTypes.array,
};

export default Product;
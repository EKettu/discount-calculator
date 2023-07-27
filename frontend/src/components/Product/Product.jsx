import {useState, useRef } from 'react'
import {useParams} from 'react-router-dom';
import Select from 'react-select'
import { SEASONS, SALE_AMOUNT_DISCOUNT_PCT, SALE_AMOUNT_LIMIT } from '../../services/config';
import {createCustomerOptions} from '../../services/utils';


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

const Product = ({ product, updateDiscountPct, newDiscountPct, handleDiscountChange, customers}) => {
  const id = useParams().id;

  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const discountReason = useRef('');

  if (product) {
    let seasonDiscountPrice = product.normalPrice - (product.normalPrice * (product.discountPct/100))
    let saleSeasonSelected = product.saleMonths.includes(selectedSeason ? selectedSeason.value : 0) | false

    const productSalePrice = product.normalPrice - (product.normalPrice * SALE_AMOUNT_DISCOUNT_PCT)

    const deal = selectedCustomer ? selectedCustomer.specialDeals.find(dealProduct => 
      dealProduct.productID ===product.id) : null

    const dealCustomerOptions = customers ? createCustomerOptions(product, customers) : []

    const saleAmountLimitExceeded = selectedCustomer && (selectedCustomer.sales >= SALE_AMOUNT_LIMIT)

    let customerDiscountPrice = setCustomerDiscountPrice(productSalePrice, deal, saleAmountLimitExceeded, discountReason)

    return (
      <div>
        <h2>{product.name}</h2>
        <p>Normal price: {product.normalPrice}</p>
        <Select
          defaultValue={selectedSeason}
          onChange={setSelectedSeason}
          options={SEASONS}
        />  
        <p>Seasonal discount price: {saleSeasonSelected ? seasonDiscountPrice : "no discount"}</p>
        <div>
          <h3>Discounts based on season </h3>
          <p>Current seasonal discount percentage: {product.discountPct} %</p>
          <h4>Update discount percentage</h4>
          <form onSubmit={updateDiscountPct(id)}>        
            <input value={newDiscountPct} onChange={handleDiscountChange}/>        
            <button type="submit">update</button>      
          </form>
        </div>
        <div>
          <h3>Customers with special deals for {product.name}</h3>
          {dealCustomerOptions.length > 0 ?
            <div>
                  <Select
                  defaultValue={selectedCustomer}
                  onChange={setSelectedCustomer}
                  options={dealCustomerOptions}
                />  
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

export default Product
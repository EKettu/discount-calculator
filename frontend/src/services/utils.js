import { SALE_AMOUNT_LIMIT } from "./config"

export const getCustomersDeals = (customer, deals) => {
    if(deals) {
        const deal = deals.find(deal => customer.id === deal.customerID)
        return deal
    }
    return null
}

export const createCustomerOptions = (product, customers) => {
    let dealCustomers = customers.filter(customer => 
        customer.specialDeals.some(deal => 
            deal.productID === product.id) || customer.sales >= SALE_AMOUNT_LIMIT
    )
    dealCustomers = dealCustomers.map(customer => ({...customer, value: customer.id, label: customer.name}))
    return dealCustomers
}

// export const createCustomerProductList = (deal, products) => {
//     const newProducts = products.forEach(product => {
//         const dealProduct = deal.products.find(dealProduct => dealProduct.productID === product.id)
//         if(dealProduct) {
//             product.price = dealProduct.dealPrice
//         }
        
//     });
//     return newProducts | null
// }

  // const printSalePricesForCustomerProducts = () => {
  //   if(customers.length!==0 && deals.length!==0 && products.length!==0) {
  //     const customer = customers[0];
  //     const deal = getCustomersDeals(customer, deals);
  //     const dealProducts = products.filter((product) => {
  //       return deal.products.some((dealProduct) => {
  //         // product.discountPrice = dealProduct.dealPrice;
  //         return dealProduct.productID === product.id; 
  //       });
  //     });
  //     setCustomerDealPrices(dealProducts, customer, deal)
  //   }
  // }

  // const setCustomerDealPrices = (dealProducts, customer, deal) => {
  //   const customerDeals = dealProducts.forEach(product => {
  //     const customerDeal = deal.products.find(dealProduct => {
  //       return dealProduct.productId === product.id });
  //     if(customerDeal) {
  //       product.discountPrice = customerDeal.dealPrice;
  //       // {return product}
  //     }
      
  //   });
  //   console.log("CUSTOMER DEALS ", customerDeals)
  // }

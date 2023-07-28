import { SALE_AMOUNT_LIMIT } from "./config"

export const createCustomerOptions = (product, customers) => {
    let dealCustomers = customers.filter(customer => 
        customer.specialDeals.some(deal => 
            deal.productID === product.id) || customer.sales >= SALE_AMOUNT_LIMIT
    )
    dealCustomers = dealCustomers.map(customer => ({...customer, value: customer.id, label: customer.name}))
    return dealCustomers
}

export const createCustomerProductList = (customer, products) => {
    const customersProducts = products.filter(product => !customer.products.some(id => id === product.id));
    return customersProducts;
}

export const getCustomerDeals = (customer, customersProducts) => {
    const customerDeals = customersProducts.filter(product => !customer.specialDeals.some(prod => prod.productID === product.id));
    // console.log("customerDeals ", customerDeals)
    return customerDeals;
}

import { SALE_AMOUNT_LIMIT } from "./config"

export const calculateDiscountPrice = (product, discounts, reason) => {
    if(discounts) {
        const discount = discounts.find(discount => discount.reason === reason);
        return discount ? 
            product.normalPrice - (product.normalPrice * discount.percentage/100) : 
            product.normalPrice;
    }
    return product.normalPrice
}

export const saleLimitExceeded = (customer) => {
    return customer.sales >= SALE_AMOUNT_LIMIT;
}

export const createCustomerOptions = (product, customers) => {
    let dealCustomers = customers.filter(customer => 
        customer.specialDeals.some(deal => 
            deal.productId === product.id) || customer.sales >= SALE_AMOUNT_LIMIT
    );
    dealCustomers = dealCustomers.map(customer => ({...customer, value: customer.id, label: customer.name}));
    return dealCustomers;
}

export const createProductOptions = (products) => {
    const productOptions = products ? products.map(product => ({...product, value: product.id, label: product.name})) : [];
    return productOptions;
}

export const createCustomerProductOptions = (customer, products) => {
    let customersProducts = products.filter(product => customer.products.some(id => id === product.id));
    customersProducts = customersProducts.map(product => ({...product, value: product.id, label: product.name}));
    return customersProducts;
}

export const getProductsPriceForCustomer = (customer, product, discounts) => {
    const specialDeal = customer.specialDeals.find(dealProduct => dealProduct.productId === product.id);
    let price = product.normalPrice;
    if(!specialDeal || specialDeal === undefined) {
        if(saleLimitExceeded(customer)) {
            price = calculateDiscountPrice (product, discounts, 'sales');
            return price
        }
        else {
            return price;
        }
    }
    price = saleLimitExceeded(customer) ? Math.min(specialDeal.dealPrice, price) : specialDeal.dealPrice;
    return price;  
}
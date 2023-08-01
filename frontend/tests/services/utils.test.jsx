import { createCustomerOptions, calculateDiscountPrice } from './../../src/services/utils';
import { describe, beforeEach, it, expect } from 'vitest';
import { customers } from './../testData/testCustomers';
import { products } from './../testData/testProducts';
import { discounts } from '../testData/testDiscounts';
import { SALE_AMOUNT_LIMIT } from './../../src/services/config';

describe('creating customer options', () => {

    let testProduct;
    let dealCustomers;

    beforeEach(() => {
        testProduct = products[0];
        dealCustomers = createCustomerOptions(testProduct, customers);
    });

    it('test customer options has a right length', () => {
        expect(dealCustomers.length).toBe(2);
    });

    it('test customer options has a right customer for the product', () => {
        const firstCustomer = dealCustomers[0];
        const productInCustomerDeals = firstCustomer.products.includes(productId => productId === testProduct.id);
        const saleAmountExceeded =  firstCustomer.sales >= SALE_AMOUNT_LIMIT;
        expect(productInCustomerDeals || saleAmountExceeded).toBeTruthy();
    });

});

describe('calculate discount price', () => {

    let testProduct;

    beforeEach(() => {
        testProduct = products[0];
    });

    it('if reason not found, returns normal price', () => {
        const price = calculateDiscountPrice(testProduct, discounts, 'random');
        expect(price).toBe(testProduct.normalPrice);
    });

    it('if reason found, returns discounted price', () => {
        const price = calculateDiscountPrice(testProduct, discounts, 'sales');
        expect(price).toBeLessThan(testProduct.normalPrice);
    });

});

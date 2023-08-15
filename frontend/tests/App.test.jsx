import { act, render, screen } from '@testing-library/react';
import App from "../src/App";
import {describe, it, expect, vi, beforeEach} from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { customers } from './testData/testCustomers';
import { products } from './testData/testProducts';
import { discounts } from './testData/testDiscounts';

vi.mock('axios')

describe('App basic elements', () => {

    beforeEach(async() => {
        await act(() => { axios.get.mockResolvedValue({
            products: products,
            customers: customers,
            discounts: discounts
        }) 
        render(
            <Router>
                <App />
            </Router>
        )})
      });

    it('renders app with a proper headline', async () => {
        const headline = screen.getByText(/Discount Calculator/i);
        expect(headline).toBeInTheDocument();
    });

    it('renders app with proper links', async () => {
        expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', `/`);
        expect(screen.getByRole('link', { name: 'Products' })).toHaveAttribute('href', `/products`);
        expect(screen.getByRole('link', { name: 'Customers' })).toHaveAttribute('href', `/customers`);
        expect(screen.getByRole('link', { name: 'Discounts' })).toHaveAttribute('href', `/discounts`);
    });
});
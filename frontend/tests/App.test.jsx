import { act, render, screen } from '@testing-library/react';
import App from "../src/App";
import {describe, it, expect, vi} from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { customers } from './testData/testCustomers';
import { products } from './testData/testProducts';
import { discounts } from './testData/testDiscounts';

vi.mock('axios')

describe('App basic texts', () => {

    it('renders app with Home', async () => {
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
        const headline = screen.getByText(/Discount Calculator/i);
        expect(headline).toBeInTheDocument();
    });
});
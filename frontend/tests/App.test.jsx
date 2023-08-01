import { render, screen } from '@testing-library/react';
import App from "../src/App";
import {describe, it, expect } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom'

describe('App basic texts', () => {
  it('renders app with Home', () => {
    render(
        <Router>
          <App />
        </Router>
      );
    const headline = screen.getByText(/Discount Calculator/i);
    expect(headline).toBeInTheDocument();
  });
});
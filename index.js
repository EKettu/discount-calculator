const express = require('express')
const app = express()
const cors = require('cors')
const { validateProductSchema, 
        validateCustomerSchema, 
        validateDiscountSchema} = require('./services/validator.js')

app.use(cors())
app.use(express.json())

let customers = [
  {
    id: 101,
    name: 'John Smith',
    products: [1, 2],
    specialDeals: [
      {
        productId: 2,
        dealPrice: 5
      }
    ],
    sales: 5
  },
  {
    id: 102,
    name: 'Jane Doe',
    products: [3],
    specialDeals: [
      {
        productId: 3,
        dealPrice: 4
      }
    ],
    sales: 2
  },
  {
    id: 103,
    name: 'Bob Johnson',
    products: [1, 4],
    specialDeals: [
      {
        productId: 1,
        dealPrice: 8
      },
      {
        productId: 4,
        dealPrice: 20
      }
    ],
    sales: 10
  }
];

let products = [
  {
    name: 'Organic Almond Butter',
    id: 1,
    normalPrice: 10.99,
    discountPrice: 9.89,
    discountPct: 10,
    saleMonths: [6, 12]
  },
  {
    name: 'Fair Trade Coffee',
    id: 2,
    normalPrice: 19.99,
    discountPrice: 17.99,
    discountPct: 10,
    saleMonths: [4, 12]
  },
  {
    name: 'Organic Chia Seeds',
    id: 3,
    normalPrice: 5.99,
    discountPrice: 5.09,
    discountPct: 15,
    saleMonths: [6, 12]
  },
  {
    name: 'Natural Whey Protein',
    id: 4,
    normalPrice: 29.99,
    discountPrice: 23.99,
    discountPct: 20,
    saleMonths: [4, 6]
  }
];

let discounts = [
  {
    id: 1,
    reason: 'season',
    percentage: 10
  },
  {
    id: 2,
    reason: 'sales',
    percentage: 5
  },
]

app.get('/api/customers', (request, response) => {
  response.json(customers)
})

app.get('/api/products', (request, response) => {
    response.json(products)
})

app.get('/api/discounts', (request, response) => {
  response.json(discounts)
})

app.post('/api/products', (request, response) => {
  let newProduct = request.body
  newProduct = {...newProduct, id: products.length+1, normalPrice: Number(newProduct.normalPrice)}
  const {error, value } = validateProductSchema(newProduct)
  if(!error && !products.find(product => product.id === newProduct.id)) {
    products.push(newProduct)
    response.json(products)
  }
  else {
    throw new Error("Adding a new product failed ", error.details[0].message)
  }
})

app.post('/api/customers', (request, response) => {
  let newCustomer = request.body
  newCustomer = {...newCustomer, id: customers.length+1, sales: Number(newCustomer.sales)}
  const {error, value } = validateCustomerSchema(newCustomer)
  if(!error && !customers.find(customer => customer.id === newCustomer.id)) {
    customers.push(newCustomer)
    response.json(customers)
  }
  else {
    throw new Error("Adding a new customer failed ", error.details[0].message)
  }
})

app.post('/api/discounts', (request, response) => {
  let newDiscount = request.body
  newDiscount = {...newDiscount, id: discounts.length+1, percentage: Number(newDiscount.percentage)}
  const {error, value } = validateDiscountSchema(newDiscount)
  if(!error && !discounts.find(discount => discount.id === newDiscount.id)) {
    discounts.push(newDiscount)
    response.json(discounts)
  }
  else {
    throw new Error("Adding a new discount failed ", error.details[0].message)
  }
})

app.get('/api/products/:id', (request, response) => {
    const id = Number(request.params.id)
    const product = products.find(product => product.id === id)
    response.json(product)
})

app.put('/api/products/:id', (request, response) => {
  const id = Number(request.params.id)
  const updatedProduct = request.body
  const {error, value } = validateProductSchema(updatedProduct)
  if(!error) {
    products = products.filter(product => product.id !== id)
    products.push(updatedProduct)
    response.json(products)
  }
  else {
    throw new Error("Update failed due to invalid input, ", error.details[0].message)
  }
})

app.put('/api/customers/:id', (request, response) => {
  const id = Number(request.params.id)
  const updatedCustomer = request.body
  const {error, value } = validateCustomerSchema(updatedCustomer)
  if(!error) {
    customers = customers.filter(customer => customer.id !== id)
    customers.push(updatedCustomer)
    response.json(customers)
  }
  else {
    throw new Error("Update failed due to invalid input, ", error.details[0].message)
  }
})

app.put('/api/discounts/:id', (request, response) => {
  const id = Number(request.params.id)
  const updatedDiscount = request.body
  const {error, value } = validateDiscountSchema(updatedDiscount)
  if(!error) {
    discounts = discounts.filter(discount => discount.id !== id)
    discounts.push(updatedDiscount)
    response.json(discounts)
  }
  else {
    throw new Error("Update failed due to invalid input, ", error.details[0].message)
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
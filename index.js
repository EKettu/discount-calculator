const express = require('express')
const app = express()
const cors = require('cors')
const { validateProductSchema, validateCustomerSchema } = require('./services/validator.js')

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
    products: [2, 3],
    sales: 2,
    specialDeals: []
  },
  {
    id: 103,
    name: 'Alice',
    products: [2, 3],
    sales: 2,
    specialDeals: [
      {
      productId: 2,
      dealPrice: 4
      },
        {
      productId: 3,
      dealPrice: 8
      }
  ]
  }
]

let products = [
    {
        name: 'product1',
        id: 1,
        normalPrice: 6,
        discountPrice: 6,
        discountPct: 10,
        saleMonths: [12, 6]
    },
    {
        name: 'product2',
        id: 2,
        normalPrice: 7,
        discountPrice: 7,
        discountPct: 15,
        saleMonths: [12, 6]
    },
    {
        name: 'product3',
        id: 3,
        normalPrice: 10,
        discountPrice: 10,
        discountPct: 5,
        saleMonths: [12, 6]
    }
]

app.get('/api/customers', (request, response) => {
  response.json(customers)
})

app.get('/api/products', (request, response) => {
    response.json(products)
})

app.post('/api/products', (request, response) => {
  const newProduct = request.body
  const {error, value } = validateProductSchema(newProduct)
  if(!error && !products.find(product => product.id === newProduct.id)) {
    products.push(newProduct)
    response.json(products)
  }
  else {
    throw new Error("Adding a new product failed ", error.details[0].message)
  }
    // console.log(request)
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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
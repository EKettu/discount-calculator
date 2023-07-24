const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

let customers = [
  {
    id: 'ID1',
    name: 'John Smith',
    products: ['productID1', 'productID2'],
    sales: 5
  },
  {
    id: 'ID2',
    name: 'Jane Doe',
    products: ['productID3', 'productID2'],
    sales: 2
  }
]

let deals = [
    {
        customerID: 'ID1',
        products: [
            {
                productID: 'productID3',
                dealPrice: 5
            }
        ]
    }
]

let products = [
    {
        name: 'product1',
        id: 'productID1',
        price: 6,
        discountPct: 10,
        saleMonths: [12, 6]
    },
    {
        name: 'product2',
        id: 'productID2',
        price: 4,
        discountPct: 15,
        saleMonths: [12, 6]
    },
    {
        name: 'product3',
        id: 'productID3',
        price: 8,
        discountPct: 10,
        saleMonths: [12, 6]
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/customers', (request, response) => {
  response.json(customers)
})

app.get('/api/deals', (request, response) => {
    response.json(deals)
})

app.get('/api/products', (request, response) => {
    response.json(products)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
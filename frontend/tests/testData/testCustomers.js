export let customers = [
    {
      id: 101,
      name: 'John Smith',
      products: [2,3],
      specialDeals: [
          {
              productId: 2,
              dealPrice: 4
          }
      ],
      sales: 6
    },
    {
      id: 102,
      name: 'Jane Doe',
      products: [1, 3],
      sales: 3,
      specialDeals: []
    },
    {
      id: 103,
      name: 'Alice',
      products: [1, 2],
      sales: 4,
      specialDeals: [
        {
        productId: 1,
        dealPrice: 6
        },
          {
        productId: 2,
        dealPrice: 3
        }
    ]
    }
  ]

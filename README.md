# json-server

# 1. Product

## 1.1. Get a single product

- Endpoint: `/product/:productId`
- Method: `GET`
- Param: `productId`

### Response:

```json
{
  "id": 1, // int
  "name": "...", // string
  "description": "...", // string
  "quantity": 1, // int
  "regularPrice": 1, // double
  "salePrice": 1, // double
  "sku": "...", // string

  "brand": {
    "id": 1, // int
    "name": "..." // string
  },

  "category": {
    "id": 1, // int
    "name": "..." // string
  },

  "productImages": [
    {
      "id": 1, // int
      "imageURL": "...", // string
      "imageTitle": "..." // string
    }
    // ...
  ]
}
```

## 1.2. Get all products

- Endpoint: `/products/:categoryId`
- Method: `GET`
- Param: `categoryId`

### Response

```json
[
  {
    "id": 1, // int
    "name": "...", // string
    "description": "...", // string
    "quantity": 1, // int
    "regularPrice": 1, // double
    "salePrice": 1, // double
    "sku": "...", // string

    "brand": {
      "id": 1, // int
      "name": "..." // string
    },

    "category": {
      "id": 1, // int
      "name": "..." // string
    },

    "productImages": [
      {
        "id": 1, // int
        "imageURL": "...", // string
        "imageTitle": "..." // string
      }
      // ...
    ]
  }
  // ...
]
```

## 1.3. Add a product

### 1.3.1. Add information of the product

- Endpoint: `/product`
- Method: `POST`

#### Request body

```json
{
  "name": "...", // string
  "description": "...", // string
  "quantity": 1, // int
  "regularPrice": 1, // double
  "salePrice": 1, // double
  "sku": "...", // string
  "brandId": 1, // int
  "categoryId": 1 // int
}
```

#### Response

```json
{
  "productId": 1 // int
}
```

### 1.3.2. Add images of the product

- Endpoint: `/product-image/:productId`
- Method: `POST`
- Param: `productId` - The product Id of the previous response

#### Request body

- Doesn't have
- Submitted by `FormData` and `multer` to save file

#### Response

```json
{
  "message": "ok"
}
```

## 1.4. Remove a product

- Endpoint: `/product/:productId`
- Method: `DELETE`
- Param: `productId`

### Response

```json
{
  "message": "ok"
}
```

## 1.5. Update a product

- Have no idea yet for now

# 2. Category

## 2.1. Get a category

- Endpoint: `/category/:categoryId`
- Method: `GET`
- Param: `categoryId`

### Response

```json
{
  "id": 1, // int
  "name": "..." // string
}
```

## 2.2. Get all categories

- Endpoint: `/categories`
- Method: `GET`

### Response

```json
[
  {
    "id": 1, // int
    "name": "..." // string
  }
  // ...
]
```

## 2.3. Add a category

- Endpoint: `/category`
- Method: `POST`

### Request body

```json
{
  "name": "..." // string
}
```

### Response

```json
{
  "message": "ok"
}
```

## 2.4. Remove a category

- Endpoint: `/category/:categoryId`
- Method: `DELETE`
- Param: `categoryId`

### Response

```json
{
  "message": "ok"
}
```

## 2.5. Update a category

- Endpoint: `/category/:categoryId`
- Method: `PUT`
- Param: `categoryId`

### Request body

```json
{
  "name": "..." // string
}
```

# 3. Brand

## 3.1. Get a brand

- Endpoint: `/brand/:brandId`
- Method: `GET`
- Param: `brandId`

### Response

```json
{
  "id": 1, // int
  "name": "..." // string
}
```

## 3.2. Get all brands

- Endpoint: `/brands`
- Method: `GET`

### Response

```json
[
  {
    "id": 1, // int
    "name": "..." // string
  }
  // ...
]
```

## 3.3. Add a brand

- Endpoint: `/brand`
- Method: `POST`

### Request body

```json
{
  "name": "..." // string
}
```

### Response

```json
{
  "message": "ok"
}
```

## 3.4. Remove a brand

- Endpoint: `/brand/:brandId`
- Method: `DELETE`
- Param: `brandId`

### Response

```json
{
  "message": "ok"
}
```

## 3.5. Update a brand

- Endpoint: `/brand/:brandId`
- Method: `PUT`
- Param: `brandId`

### Request body

```json
{
  "name": "..." // string
}
```

# 4. Shipping

## 4.1. Get a shipping

- Endpoint: `/shipping/:shippingId`
- Method: `GET`
- Param: `shippingId`

### Response

```json
{
  "id": 1, // int
  "name": "..." // string
}
```

## 4.2. Get all shippings

- Endpoint: `/shippings`
- Method: `GET`

### Response

```json
[
  {
    "id": 1, // int
    "name": "..." // string
  }
  // ...
]
```

## 4.3. Add a shipping

- Endpoint: `/shipping`
- Method: `POST`

### Request body

```json
{
  "name": "..." // string
}
```

### Response

```json
{
  "message": "ok"
}
```

## 4.4. Remove a shipping

- Endpoint: `/shipping/:shippingId`
- Method: `DELETE`
- Param: `shippingId`

### Response

```json
{
  "message": "ok"
}
```

## 4.5. Update a shipping

- Endpoint: `/shipping/:shippingId`
- Method: `PUT`
- Param: `shippingId`

### Request body

```json
{
  "name": "..." // string
}
```

# 5. Payment Method

## 5.1. Get a payment method

- Endpoint: `/payment-method/:paymentMethodId`
- Method: `GET`
- Param: `paymentMethodId`

### Response

```json
{
  "id": 1, // int
  "name": "..." // string
}
```

## 5.2. Get all payment methods

- Endpoint: `/payment-methods`
- Method: `GET`

### Response

```json
[
  {
    "id": 1, // int
    "name": "..." // string
  }
  // ...
]
```

## 5.3. Add a payment method

- Endpoint: `/payment-method`
- Method: `POST`

### Request body

```json
{
  "name": "..." // string
}
```

### Response

```json
{
  "message": "ok"
}
```

## 5.4. Remove a payment method

- Endpoint: `/payment-method/:paymentMethodId`
- Method: `DELETE`
- Param: `paymentMethodId`

### Response

```json
{
  "message": "ok"
}
```

## 5.5. Update a payment method

- Endpoint: `/payment-method/:paymentMethodId`
- Method: `PUT`
- Param: `paymentMethodId`

### Request body

```json
{
  "name": "..." // string
}
```

# 6. Order Status

## 6.1. Get a order status

- Endpoint: `/order-status/:orderStatusId`
- Method: `GET`
- Param: `orderStatusId`

### Response

```json
{
  "id": 1, // int
  "name": "..." // string
}
```

## 6.2. Get all order statuses

- Endpoint: `/order-statuses`
- Method: `GET`

### Response

```json
[
  {
    "id": 1, // int
    "name": "..." // string
  }
  // ...
]
```

## 6.3. Add a order status

- Endpoint: `/order-status`
- Method: `POST`

### Request body

```json
{
  "name": "..." // string
}
```

### Response

```json
{
  "message": "ok"
}
```

## 6.4. Remove a order status

- Endpoint: `/order-status/:orderStatusId`
- Method: `DELETE`
- Param: `orderStatusId`

### Response

```json
{
  "message": "ok"
}
```

## 6.5. Update a order status

- Endpoint: `/order-status/:orderStatusId`
- Method: `PUT`
- Param: `orderStatusId`

### Request body

```json
{
  "name": "..." // string
}
```

# 7. Order Status

## 7.1. Get a user payment method

- Endpoint: `/user-payment-method/:userPaymentMethodId`
- Method: `GET`
- Param: `userPaymentMethodId`

### Response

```json
{
  "id": 1, // int
  "cardholderName": "...", // string
  "cardNumber": "...", // string

  "paymentMethod": {
    "id": 1, // int
    "name": "..." // string
  }
}
```

## 7.2. Get all user payment methods

- Endpoint: `/user-payment-methods`
- Method: `GET`

### Response

```json
[
  {
    "id": 1, // int
    "cardholderName": "...", // string
    "cardNumber": "...", // string

    "paymentMethod": {
      "id": 1, // int
      "name": "..." // string
    }
  }
  // ...
]
```

## 7.3. Add a user payment method

- Endpoint: `/user-payment-method`
- Method: `POST`

### Request body

```json
{
  "cardholderName": "...", // string
  "cardNumber": "...", // string
  "paymentMethodId": 1 // int
}
```

### Response

```json
{
  "message": "ok"
}
```

## 7.4. Remove a user payment method

- Endpoint: `/user-payment-method/:userPaymentMethodId`
- Method: `DELETE`
- Param: `userPaymentMethodId`

### Response

```json
{
  "message": "ok"
}
```

## 7.5. Update a order status

- Endpoint: `/user-payment-method/:userPaymentMethodId`
- Method: `PUT`
- Param: `userPaymentMethodId`

### Request body

```json
{
  "cardholderName": "USER 1",
  "cardNumber": "123123123123",
  "paymentMethodId": 1
}
```

# 8. Order

## 8.1. Get a order details

- Endpoint: `/order/:orderId`
- Method: `GET`
- Param: `orderId`

### Response

```json
{
  "id": 1, // int
  "note": "...", // string
  "address": "...", // string

  "orderStatus": {
    "id": 1, // int
    "name": "..." // string
  },
  "shipping": {
    "id": 1, // int
    "name": "..." // string
  },
  "userPaymentMethod": {
    "id": 1, // int
    "cardholderName": "...", // string
    "cardNumber": "...", // string

    "paymentMethod": {
      "id": 1, // int
      "name": "..." // string
    },
    "user": {
      "id": 1, // int
      "firstName": "...", // string
      "lastName": "...", // string
      "email": "...", // string
      "phone": "..." // string
    }
  },
  "products": [
    {
      "id": 1, // int
      "name": "...", // string
      "description": "...", // string
      "quantity": 1, // int
      "regularPrice": 1, // double
      "salePrice": 1, // double
      "sku": "..." // string
    }
    // ...
  ]
}
```

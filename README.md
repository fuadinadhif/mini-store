# 🛍️ Mini Store API Contract

**Base URL:** `https://your-api-url.com/api/v1`

---

## 🔹 Create Product

**Endpoint:** `POST /products`

**Request Body:**

```json
{
  "name": "Product Name",
  "description": "Product Description",
  "price": 100,
  "stock": 10,
  "image": "https://example.com/image.png"
}
```

**Responses:**

- ✅ `201 Created`: Product created successfully

  ```json
  {
    "id": 1,
    "name": "Product Name",
    "description": "Product Description",
    "price": 100,
    "stock": 10,
    "image": "https://example.com/image.png",
    "createdAt": "2025-06-08T00:00:00.000Z"
  }
  ```

- ❌ `400 Bad Request`: Missing required fields

  ```json
  {
    "error": "Missing fields"
  }
  ```

- ❌ `500 Internal Server Error`: Failed to create product
  ```json
  {
    "error": "Failed to create product"
  }
  ```

---

## 🔹 Get All Products

**Endpoint:** `GET /products`

**Query Parameters (optional):**

| Param      | Type   | Description                       |
| ---------- | ------ | --------------------------------- |
| `name`     | string | Filter by product name (contains) |
| `orderBy`  | string | Sort by `price` or `createdAt`    |
| `orderDir` | string | Sort direction: `asc` or `desc`   |

**Example:**

```
GET /products?name=shoe&orderBy=price&orderDir=asc
```

**Responses:**

- ✅ `200 OK`: Returns list of products

  ```json
  [
    {
      "id": 1,
      "name": "Running Shoe",
      "description": "Lightweight running shoe",
      "price": 120,
      "stock": 5,
      "image": "https://example.com/shoe.png",
      "createdAt": "2025-06-08T00:00:00.000Z"
    }
  ]
  ```

- ❌ `500 Internal Server Error`: Failed to get products
  ```json
  {
    "error": "Failed to get products"
  }
  ```

---

## 🔹 Get Single Product

**Endpoint:** `GET /products/[id]`

**Path Parameter:**

- `id` (integer): Product ID

**Example:**

```
GET /products/1
```

**Responses:**

- ✅ `200 OK`: Returns product details

  ```json
  {
    "id": 1,
    "name": "Product Name",
    "description": "Product Description",
    "price": 100,
    "stock": 10,
    "image": "https://example.com/image.png",
    "createdAt": "2025-06-08T00:00:00.000Z"
  }
  ```

- ❌ `404 Not Found`: Product does not exist

  ```json
  {
    "error": "Product not found"
  }
  ```

- ❌ `500 Internal Server Error`: Failed to get product

  ```json
  {
    "error": "Failed to get product"
  }
  ```

---

## 🔹 Update Product

**Endpoint:** `PUT /products/[id]`

**Path Parameter:**

- `id` (integer): Product ID

**Request Body:**

```json
{
  "name": "Updated Name",
  "description": "Updated description",
  "price": 150,
  "stock": 20,
  "image": "https://example.com/updated-image.png"
}
```

**Responses:**

- ✅ `200 OK`: Product updated successfully

  ```json
  {
    "id": 1,
    "name": "Updated Name",
    "description": "Updated description",
    "price": 150,
    "stock": 20,
    "image": "https://example.com/updated-image.png",
    "createdAt": "2025-06-08T00:00:00.000Z"
  }
  ```

- ❌ `500 Internal Server Error`: Failed to update product

  ```json
  {
    "error": "Failed to update product"
  }
  ```

---

## 🔹 Delete Product

**Endpoint:** `DELETE /products/[id]`

**Path Parameter:**

- `id` (integer): Product ID

**Example:**

```
DELETE /products/1
```

**Responses:**

- ✅ `200 OK`: Product deleted successfully

  ```json
  {
    "id": 1,
    "name": "Deleted Product",
    "description": "Description",
    "price": 100,
    "stock": 10,
    "image": "https://example.com/image.png",
    "createdAt": "2025-06-08T00:00:00.000Z"
  }
  ```

- ❌ `500 Internal Server Error`: Product not found

  ```json
  {
    "error": "Failed to delete product"
  }
  ```

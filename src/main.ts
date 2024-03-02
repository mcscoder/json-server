import jsonServer from "json-server";
import { CategoryWithQuantityType, DatabaseDTO, OrderType, ProductDTO, ProductType } from "./types";
import { DB } from "./utils";

const server = jsonServer.create();
const router = jsonServer.router<DatabaseDTO>("db.json");
const db = new DB(router);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// add a new user
// server.post("/api/user", (req, res) => {
//   const newUser: UserDTO = req.body;
//   newUser.id = generateId(db.get("users").value())
//   db.get("users").push(newUser).write();
//   res.status(201).json(newUser)
// });

// 8.1. Get an order
server.get("/api/order/:orderId", (req, res) => {
  const { orderId } = req.params;
  const orderResponse: OrderType | undefined = db.getOrder(parseInt(orderId))
  if (orderResponse) {
    res.json(orderResponse);
  }
})

// 8.2. Get all orders
server.get("/api/orders", (req, res) => {
  req;
  const allOrdersResponse: OrderType[] = db.getOrders();
  res.json(allOrdersResponse);
})

// 1.1. Get a single product
server.get("/api/product/:productId", (req, res) => {
  const { productId } = req.params;
  const productResponse: ProductType | undefined = db.getProduct(parseInt(productId))
  if (productResponse) {
    res.json(productResponse)
  }
})

// 1.2. Get all products
server.get("/api/products", (req, res) => {
  req;
  const allProductResponse: ProductType[] | undefined = db.getProducts();
  if (allProductResponse) {
    res.json(allProductResponse);
  }
})

// 1.2. Get all products by category
server.get("/api/products/:categoryId", (req, res) => {
  const { categoryId } = req.params
  const allProductResponse: ProductType[] | undefined = db.getProducts(parseInt(categoryId));
  if (allProductResponse) {
    res.json(allProductResponse);
  }
})

// 1.3. Add a product
// 1.3.1. Add information of the product
server.post("/api/product", (req, res) => {
  const newProduct: ProductDTO = req.body;
  res.status(201).json(db.addProduct(newProduct));
})

// 2.1. Get a category
server.get("/api/category/:categoryId", (req, res) => {
  const { categoryId } = req.params
  const categoryResponse: CategoryWithQuantityType | undefined = db.getCategory(parseInt(categoryId))
  if (categoryResponse) {
    res.json(categoryResponse)
  }
})

// 2.2. Get all categories
server.get("/api/categories", (req, res) => {
  req;
  const categoriesResponse: CategoryWithQuantityType[] = db.getCategories()
  res.json(categoriesResponse)
})


// Use default router -------------------------
server.use("/api", router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});

import jsonServer from "json-server";
import { AdminDTO, CategoryWithQuantityType, DatabaseDTO, OrderDTO, OrderProductDTO, OrderType, ProductDTO, ProductType } from "./types";
import { DB } from "./utils";
import express from "express"
import path from "path"
import multer from "multer";

const server = jsonServer.create();
const router = jsonServer.router<DatabaseDTO>("db.json");
const db = new DB(router);
const middlewares = jsonServer.defaults();
const commonPath = {
  publicImage: path.join(__dirname, '../public/images'),
}

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use("/api/public/images", express.static(commonPath.publicImage))

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

// 8.3. Get all order by status
server.get("/api/orders/:statusId", (req, res) => {
  const { statusId } = req.params
  const allOrdersResponse: OrderType[] = db.getOrders(parseInt(statusId));
  res.json(allOrdersResponse);
})

// 8.4. Add an order
// 8.4.1. Add order
server.post("/api/order", (req, res) => {
  req.body.createdAt = Date.now();
  const order: OrderDTO = req.body;
  res.status(201).json(db.addOrder(order));
})
// 8.4.2. Add ordered product
server.post("/api/order/products", (req, res) => {
  const orderedProducts: OrderProductDTO[] = req.body;
  res.status(201).json(db.addOrderedProducts(orderedProducts));
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
  const search = req.query.search as string | undefined
  const allProductResponse: ProductType[] | undefined = db.getProducts(undefined, search);
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

// 1.4.1. Deprecated a product
server.patch("/api/product/:productId", (req, res) => {
  const { productId } = req.params
  db.deprecatedProduct(parseInt(productId))
  res.jsonp("ok")
})

// 1.5. Update product
// 1.5.1. Update product images
// 1.5.1.1. Delete product images
server.delete("/api/product-images", (req, res) => {
  const productImageIds: number[] = req.body;
  db.deleteProductImages(productImageIds)
  res.json("ok")
})
// 1.5.1.2. Upload new images
// Set up multer to handle file uploads
const storage = multer.diskStorage({
  destination: commonPath.publicImage,
  filename: function (req, file, cb) {
    req;
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Handle POST request to /upload
server.post("/api/upload/product-image/:productId", upload.array("files", 10), (req, res) => {
  const { productId } = req.params
  const fileList = req.files as Express.Multer.File[]
  if (fileList) {
    db.uploadProductImages(parseInt(productId), fileList)
  }

  // File has been uploaded successfully
  res.json({ message: "File uploaded successfully" });
});

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

// 9.1. Admin authentication
server.post("/api/admin-authentication", (req, res) => {
  const admin: AdminDTO = req.body;
  const adminResponse = db.adminAuthentication(admin);
  if (adminResponse) {
    res.status(200).json(adminResponse);
  } else {
    res.status(401).json({ message: "Login failed" });
  };

})


// Use default router -------------------------
server.use("/api", router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});

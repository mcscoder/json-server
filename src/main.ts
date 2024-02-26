import jsonServer from "json-server";
import { DatabaseDTO, OrderDTO, OrderProductDTO, OrderStatusDTO, OrderType, PaymentMethodDTO, ProductDTO, ShippingDTO, UserDTO, UserPaymentMethodDTO } from "./types";
import { generateId } from "./utils";

const server = jsonServer.create();
const router = jsonServer.router<DatabaseDTO>("db.json");
const db = router.db
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// add a new user
server.post("/api/user", (req, res) => {
  const newUser: UserDTO = req.body;
  newUser.id = generateId(db.get("users").value())
  db.get("users").push(newUser).write();
  res.status(201).json(newUser)
});

// get order details
server.get("/api/order/:orderId", (req, res) => {
  const { orderId } = req.params;
  const orderDTO: OrderDTO | undefined = db.get("orders").find(({ id }) => id === parseInt(orderId)).value();
  if (orderDTO) {
    const orderStatusDTO: OrderStatusDTO = db.get("orderStatuses").find(({ id }) => id === orderDTO.orderStatusId).value();
    const shippingDTO: ShippingDTO = db.get("shippings").find(({ id }) => id === orderDTO.shippingId).value();
    const userPaymentMethodDTO: UserPaymentMethodDTO = db.get("userPaymentMethods").find(({ id }) => id === orderDTO.shippingId).value();
    const paymentMethodDTO: PaymentMethodDTO = db.get("paymentMethods").find(({ id }) => id === userPaymentMethodDTO.paymentMethodId).value();
    const userDTO: UserDTO = db.get("users").find(({ id }) => id === userPaymentMethodDTO.userId).value();
    const orderProductDTO: OrderProductDTO[] = db.get("orderProducts").filter(({ orderId }) => orderId === orderDTO.id).value();
    const productDTOs: ProductDTO[] = db.get("products").filter(({ id }) => orderProductDTO.some(({ productId }) => id === productId)).value();

    const orderResponse: OrderType = {
      ...orderDTO,
      orderStatus: orderStatusDTO,
      shipping: shippingDTO,
      userPaymentMethod: {
        ...userPaymentMethodDTO,
        paymentMethod: paymentMethodDTO,
        user: userDTO
      },
      products: productDTOs
    };

    res.json(orderResponse);
  }
})

// Use default router -------------------------
server.use("/api", router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});

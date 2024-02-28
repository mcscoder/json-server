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
  const orderDTO: OrderDTO | undefined = db.get("orders").value().binarySearch((order) => [order.id, parseInt(orderId)]);
  if (orderDTO) {
    const orderStatusDTO: OrderStatusDTO = db.get("orderStatuses").value().binarySearch((orderStatus) => [orderStatus.id, orderDTO.orderStatusId])!;
    const shippingDTO: ShippingDTO = db.get("shippings").value().binarySearch((shipping) => [shipping.id, orderDTO.shippingId])!;
    const userPaymentMethodDTO: UserPaymentMethodDTO = db.get("userPaymentMethods").value().binarySearch((userPaymentMethod) => [userPaymentMethod.id, orderDTO.userPaymentMethodId])!;
    const paymentMethodDTO: PaymentMethodDTO = db.get("paymentMethods").value().binarySearch((paymentMethod) => [paymentMethod.id, userPaymentMethodDTO.paymentMethodId])!;
    const userDTO: UserDTO = db.get("users").value().binarySearch((user) => [user.id, userPaymentMethodDTO.userId])!;
    const orderProductDTO: OrderProductDTO[] = db.get("orderProducts").value().filter(({ orderId }) => orderId === orderDTO.id)!;
    const productDTOs: ProductDTO[] = orderProductDTO.map((orderProduct) => db.get("products").value().binarySearch((product) => [product.id, orderProduct.productId])!);

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

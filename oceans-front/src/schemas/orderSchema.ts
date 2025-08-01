import { array, number, object, string } from "valibot";
import { MenuSchema } from "./menuSchema";
import { UserSchema } from "./userSchema";

export const OrderSchema = object({
  orderId: number(),
  tip: number(),
  totalPrice: number(),
  menus: array(MenuSchema),
  paymentMethod: string(),
  user: UserSchema,
  status: string(),
  createdAt: string(),
});

export const ResponseOrderSchema = object({
  statusCode: number(),
  orders: array(OrderSchema),
});

export const SingleOrderResponseSchema = object({
  status: number(),
  order: OrderSchema,
});

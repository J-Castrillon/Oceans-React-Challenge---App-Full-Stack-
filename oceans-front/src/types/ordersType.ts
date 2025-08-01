import type { InferInput } from "valibot";
import type { ResponseOrderSchema } from "../schemas/orderSchema";

export type OrdersType = InferInput<typeof ResponseOrderSchema>; 
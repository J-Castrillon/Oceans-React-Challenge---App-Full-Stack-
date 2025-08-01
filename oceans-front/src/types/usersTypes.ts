import type { InferInput } from "valibot";
import type { ResponseUserSchema } from "../schemas/userSchema";

export type ResponseUsersType = InferInput<typeof ResponseUserSchema>; 
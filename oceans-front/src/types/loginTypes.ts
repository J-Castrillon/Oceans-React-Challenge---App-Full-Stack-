import type { InferInput, InferOutput } from "valibot";
import type { LoginSchema, ResponseLoginSchema } from "../../schemas/login/loginSchemas";

export type LoginType = InferOutput<typeof LoginSchema>; 
export type ResponseLoginType = InferInput<typeof ResponseLoginSchema>


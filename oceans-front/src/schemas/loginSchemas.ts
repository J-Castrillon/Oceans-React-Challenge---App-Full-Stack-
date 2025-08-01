import { object, string } from "valibot";

export const LoginSchema = object({
  document: string(),
  password: string(),
});

export const ResponseLoginSchema = object({
  token: string(),
});

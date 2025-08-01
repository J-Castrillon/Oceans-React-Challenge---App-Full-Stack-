import { array, number, object, string } from "valibot";

export const TypeUserSchema = object({
  roleId: number(),
  roleName: string(),
  description: string(),
  accesLevel: array(string()),
  created_at: string(),
});

export const UserSchema = object({
  document: number(),
  name: string(),
  email: string(),
  password: string(),
  age: number(),
  dateOfBirth: string(),
  totalSales: number(),
  role: TypeUserSchema,
  status: string(),
  createdAt: string(),
});

export const ResponseUserSchema = object({
  statusCode: number(), 
  message: string(),
  users: array(UserSchema)
})

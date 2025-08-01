import { number, object, string } from "valibot";
import { ResourceSchema } from "./resourcesSchema";

export const MenuSchema = object({
  menuId: number(),
  tipoMenu: string(),
  menuName: string(),
  description: string(),
  price: number(),
  image: ResourceSchema,
  createdAt: string(),
});

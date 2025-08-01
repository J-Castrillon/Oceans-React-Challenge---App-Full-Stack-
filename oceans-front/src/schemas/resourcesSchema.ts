import { number, object, optional, string } from "valibot";

export const ResourceSchema = object({
  resourceId: number(),
  resourceName: string(),
  description: string(),
  extension: string(),
  size: number(),
  lastModified: string(),
  status: string(),
  path: optional(string()),
  created_at: string(),
});

export const ResourcesSchema = object({
  status: number(),
  unicResource: ResourceSchema,
});

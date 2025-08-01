import type { InferInput } from "valibot";
import type { ResourcesSchema } from "../../schemas/resources/resourcesSchema";

export type ResponseResourcesType = InferInput<typeof ResourcesSchema>;

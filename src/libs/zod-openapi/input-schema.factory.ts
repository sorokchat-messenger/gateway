import { type ZodType } from "zod";
import { createOpenapiSchema } from "./schema.factory.js";

export function createInputSchema(schema: ZodType) {
  return createOpenapiSchema(schema, "input");
}

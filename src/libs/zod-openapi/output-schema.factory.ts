import { type ZodType } from "zod";
import { createOpenapiSchema } from "./schema.factory.js";

export function createOutputSchema(schema: ZodType) {
  return createOpenapiSchema(schema, "output");
}

import { type SchemaObject } from "@nestjs/swagger";
import { type ZodType } from "zod";
import { createSchema } from "zod-openapi";

export function createOpenapiSchema(
  schema: ZodType,
  io: "input" | "output",
): {
  schema: SchemaObject;
  components: Record<string, SchemaObject>;
} {
  const { components, schema: resultSchema } = createSchema(schema, {
    io,
  });
  return {
    schema: resultSchema as SchemaObject,
    components: components as Record<string, SchemaObject>,
  };
}

import { ReferenceObject, SchemaObject } from "@nestjs/swagger";
import { LoginSchema, RegisterSchema } from "@sorokchat-messenger/contracts";
import { type ZodType } from "zod";
import { createSchema } from "zod-openapi";

type ConvertedSchema = {
  schema: SchemaObject | ReferenceObject;
  components: Record<string, SchemaObject>;
};

function createOpenapiSchema(
  schema: ZodType,
  io: "input" | "output",
): ConvertedSchema {
  const { schema: resultSchema, components } = createSchema(schema, {
    io,
    openapiVersion: "3.2.0",
  });
  return {
    schema: resultSchema as SchemaObject | ReferenceObject,
    components: components as Record<string, SchemaObject>,
  };
}

export const RegisterOpenapiSchema = createOpenapiSchema(
  RegisterSchema,
  "input",
);
export const LoginOpenapiSchema = createOpenapiSchema(LoginSchema, "input");

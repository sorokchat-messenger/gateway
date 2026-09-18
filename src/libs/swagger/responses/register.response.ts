import { ApiCreatedResponse, type SchemaObject } from "@nestjs/swagger";
import { AuthorizedOpenapiSchema } from "../../zod-openapi/authorized.schema.js";
import { applyDecorators } from "@nestjs/common";
import { AccessDeniedResponse } from "./access-denied.response.js";

export const RegisterResponse = () =>
  applyDecorators(
    ApiCreatedResponse({
      description: "Користувача успішно зареєстровано",
      schema: AuthorizedOpenapiSchema.schema as SchemaObject,
    }),
    AccessDeniedResponse(),
  );

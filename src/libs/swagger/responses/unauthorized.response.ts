import { ApiUnauthorizedResponse, SchemaObject } from "@nestjs/swagger";
import { ErrorOpenapiSchema } from "../../zod-openapi/index.js";
import { UNAUTHORIZED_ERROR } from "@sorokchat-messenger/contracts";

export const UnauthorizedResponse = () =>
  ApiUnauthorizedResponse({
    description: "Користувач не авторизований",
    schema: ErrorOpenapiSchema.schema as SchemaObject,
    example: UNAUTHORIZED_ERROR,
  });

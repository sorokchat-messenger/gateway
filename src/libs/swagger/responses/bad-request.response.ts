import { ApiBadRequestResponse } from "@nestjs/swagger";
import { ErrorOpenapiSchema } from "../../zod-openapi/index.js";
import { createBadRequestError } from "@sorokchat-messenger/contracts";

export const BadRequestResponse = (errors: Record<string, string> = {}) =>
  ApiBadRequestResponse({
    description: "Помилка у данних",
    schema: ErrorOpenapiSchema.schema,
    example: createBadRequestError(errors),
  });

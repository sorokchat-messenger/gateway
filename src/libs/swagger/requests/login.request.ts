import { ApiOperation } from "@nestjs/swagger";
import { LoginOpenapiSchema } from "../../zod-openapi/index.js";

export const LoginRequest = () =>
  ApiOperation({
    summary: "Вхід",
    description: "Вхід користувача у систему",
    requestBody: {
      content: {
        "application/json": {
          schema: LoginOpenapiSchema.schema,
        },
      },
    },
  });

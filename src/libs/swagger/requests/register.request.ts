import { ApiOperation } from "@nestjs/swagger";
import { RegisterOpenapiSchema } from "../../zod-openapi/index.js";

export const RegisterRequest = () =>
  ApiOperation({
    summary: "Реєстрація",
    description: "Реєстрація та авторизації користувача у системі",
    requestBody: {
      content: {
        "application/json": {
          schema: RegisterOpenapiSchema.schema,
        },
      },
    },
  });

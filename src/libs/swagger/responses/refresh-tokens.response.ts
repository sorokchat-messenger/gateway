import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { AuthorizedOpenapiSchema } from "../../zod-openapi/index.js";
import { AccessDeniedResponse } from "./access-denied.response.js";

export const RefreshTokensResponse = () =>
  applyDecorators(
    ApiOkResponse({
      description: "Успішне оновлення токенів",
      schema: AuthorizedOpenapiSchema.schema,
    }),
    AccessDeniedResponse(),
  );

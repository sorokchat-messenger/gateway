import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { UserOpenapiSchema } from "../../zod-openapi/index.js";
import { UnauthorizedResponse } from "./unauthorized.response.js";

export const ProfileResponse = () =>
  applyDecorators(
    ApiOkResponse({
      description: "Успішне отримання",
      schema: UserOpenapiSchema.schema,
    }),
    UnauthorizedResponse(),
  );

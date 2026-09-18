import { applyDecorators } from "@nestjs/common";
import { ApiNoContentResponse } from "@nestjs/swagger";
import { UnauthorizedResponse } from "./unauthorized.response.js";

export const LogoutResponse = () =>
  applyDecorators(
    ApiNoContentResponse({ description: "Успішний вихід" }),
    UnauthorizedResponse(),
  );

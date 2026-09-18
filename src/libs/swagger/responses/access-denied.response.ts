import { ApiForbiddenResponse } from "@nestjs/swagger";
import { ACCESS_DENIED_ERROR } from "@sorokchat-messenger/contracts";

export const AccessDeniedResponse = () =>
  ApiForbiddenResponse({
    description: "У доступі відмовлено",
    example: ACCESS_DENIED_ERROR,
  });

import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";

export const LogoutRequest = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: "Вихід",
      description: "Вихід користувача із системи",
      requestBody: undefined,
    }),
  );

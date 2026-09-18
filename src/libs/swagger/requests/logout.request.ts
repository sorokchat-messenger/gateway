import { ApiOperation } from "@nestjs/swagger";

export const LogoutRequest = () =>
  ApiOperation({
    summary: "Вихід",
    description: "Вихід користувача із системи",
    requestBody: undefined,
  });

import { ApiOperation } from "@nestjs/swagger";

export const LoginRequest = () =>
  ApiOperation({
    summary: "Вхід",
    description: "Вхід користувача у систему",
  });

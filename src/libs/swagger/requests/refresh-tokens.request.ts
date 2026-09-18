import { ApiOperation } from "@nestjs/swagger";

export const RefreshTokensRequest = () =>
  ApiOperation({
    summary: "Оновлення токенів",
    description: "Генерує нові токени доступу та відновлення",
    requestBody: undefined,
  });

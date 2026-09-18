import { ApiOperation } from "@nestjs/swagger";

export const ProfileRequest = () =>
  ApiOperation({
    summary: "Профіль",
    description: "Отримання даних авторизованого користувача",
    requestBody: undefined,
  });

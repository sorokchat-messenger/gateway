import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";

export const ProfileRequest = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: "Профіль",
      description: "Отримання даних авторизованого користувача",
      requestBody: undefined,
    }),
  );

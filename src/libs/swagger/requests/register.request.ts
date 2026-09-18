import { ApiOperation } from "@nestjs/swagger";

export const RegisterRequest = () =>
  ApiOperation({
    summary: "Реєстрація",
    description: "Реєстрація та авторизації користувача у системі",
  });

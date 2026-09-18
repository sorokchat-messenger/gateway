import { applyDecorators } from "@nestjs/common";
import { LoginRequest } from "../requests/login.request.js";
import { LoginResponse } from "../responses/login.response.js";

export const LoginOperation = () =>
  applyDecorators(LoginRequest(), LoginResponse());

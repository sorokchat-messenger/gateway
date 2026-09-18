import { applyDecorators } from "@nestjs/common";
import { RegisterRequest } from "../requests/register.request.js";
import { RegisterResponse } from "../responses/register.response.js";

export const RegisterOperation = () =>
  applyDecorators(RegisterRequest(), RegisterResponse());

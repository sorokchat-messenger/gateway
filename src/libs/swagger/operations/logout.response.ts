import { applyDecorators } from "@nestjs/common";
import { LogoutRequest } from "../requests/index.js";
import { LogoutResponse } from "../responses/index.js";

export const LogoutOperation = () =>
  applyDecorators(LogoutRequest(), LogoutResponse());

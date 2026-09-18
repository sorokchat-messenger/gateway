import { applyDecorators } from "@nestjs/common";
import { RefreshTokensRequest } from "../requests/index.js";
import { RefreshTokensResponse } from "../responses/index.js";

export const RefreshTokensOperations = () =>
  applyDecorators(RefreshTokensRequest(), RefreshTokensResponse());

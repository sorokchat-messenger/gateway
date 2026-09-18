import { applyDecorators } from "@nestjs/common";
import { ProfileRequest } from "../requests/index.js";
import { ProfileResponse } from "../responses/index.js";

export const ProfileOperation = () =>
  applyDecorators(ProfileRequest(), ProfileResponse());

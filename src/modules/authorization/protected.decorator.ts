import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { PROTECTED_ROLES, ProtectedGuard } from "./protected.guard.js";
import { Role } from "@sorokchat-messenger/contracts";

export const Protected = (...roles: Role[]) =>
  applyDecorators(
    SetMetadata(PROTECTED_ROLES, roles),
    UseGuards(ProtectedGuard),
  );

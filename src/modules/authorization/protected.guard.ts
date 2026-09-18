import {
  CanActivate,
  type ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import {
  AuthorizationCodes,
  Role,
  ROLE_HIERARCHY,
} from "@sorokchat-messenger/contracts";
import { type Request } from "express";

export const PROTECTED_ROLES: string = "protected_roles";

@Injectable()
export class ProtectedGuard implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const user = request.user;
    if (!user) throw new UnauthorizedException(AuthorizationCodes.UNAUTHORIZED);
    const neededRoles = this.reflector.getAllAndOverride<Role[]>(
      PROTECTED_ROLES,
      [context.getHandler(), context.getClass()],
    );
    if (neededRoles.length === 0) return true;
    const allowed: boolean = neededRoles.some((role) =>
      ROLE_HIERARCHY.hasRole(role, user.role),
    );
    if (!allowed) {
      throw new ForbiddenException(AuthorizationCodes.ACCESS_DENIED);
    }
    return true;
  }
}

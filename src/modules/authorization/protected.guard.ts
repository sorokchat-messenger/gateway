import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthorizationCodes } from "@sorokchat-messenger/contracts";
import { type Request } from "express";
import { Observable } from "rxjs";

export class ProtectedGuard implements CanActivate {
  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const user = request.user;
    if (!user) throw new UnauthorizedException(AuthorizationCodes.UNAUTHORIZED);
    return true;
  }
}

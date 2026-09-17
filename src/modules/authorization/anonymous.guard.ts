import {
  CanActivate,
  type ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { AuthorizationCodes } from "@sorokchat-messenger/contracts";
import { type ProfileResponse } from "@sorokchat-messenger/microservices";
import { type Request } from "express";

@Injectable()
export class AnonymousGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const user: ProfileResponse = context
      .switchToHttp()
      .getRequest<Request>().user;
    if (user) {
      throw new ForbiddenException(AuthorizationCodes.ACCESS_DENIED);
    }
    return true;
  }
}

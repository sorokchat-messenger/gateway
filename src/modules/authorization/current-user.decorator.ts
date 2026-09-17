import { createParamDecorator, type ExecutionContext } from "@nestjs/common";
import { type ProfileResponse } from "@sorokchat-messenger/microservices";
import { type Request } from "express";

export const CurrentUser = createParamDecorator(
  (
    data: keyof ProfileResponse | undefined,
    context: ExecutionContext,
  ): ProfileResponse | ProfileResponse[keyof ProfileResponse] => {
    const user = context.switchToHttp().getRequest<Request>().user;
    return data ? user[data] : user;
  },
);

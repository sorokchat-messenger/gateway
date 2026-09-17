import { Inject, type NestMiddleware } from "@nestjs/common";
import { type Response, type Request, type NextFunction } from "express";
import { AUTHORIZATION_SERVICE_TOKEN } from "../../infrastructure/index.js";
import {
  type AuthorizationServiceClient,
  ProfileResponse,
} from "@sorokchat-messenger/microservices";
import { lastValueFrom } from "rxjs";
import { ServiceError } from "@grpc/grpc-js";
import { AuthorizationCodes } from "@sorokchat-messenger/contracts";

declare global {
  namespace Express {
    interface Request {
      user: ProfileResponse;
    }
  }
}

export class AccessTokenMiddleware implements NestMiddleware {
  private static readonly BEARER_PREFIX: string = "Bearer ";

  public constructor(
    @Inject(AUTHORIZATION_SERVICE_TOKEN)
    private readonly service: AuthorizationServiceClient,
  ) {}

  public async use(
    request: Request,
    _response: Response,
    next: NextFunction,
  ): Promise<void> {
    const header = request.headers.authorization;
    if (!header || !header.startsWith(AccessTokenMiddleware.BEARER_PREFIX)) {
      return next();
    }
    const accessToken = header.slice(
      AccessTokenMiddleware.BEARER_PREFIX.length,
    );
    try {
      const user = await lastValueFrom(this.service.profile({ accessToken }));
      request["user"] = user;
      return next();
    } catch (error) {
      if (
        this.isGrpcServiceError(error) &&
        error.details === AuthorizationCodes.BAD_CREDENTIALS
      ) {
        return next();
      }
      throw error;
    }
  }

  private isGrpcServiceError(error: unknown): error is ServiceError {
    return (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof (error as { code: unknown }).code === "number"
    );
  }
}

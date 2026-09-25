import { Inject, Logger, type NestMiddleware } from "@nestjs/common";
import { type Response, type Request, type NextFunction } from "express";
import { AUTHORIZATION_SERVICE_TOKEN } from "../../infrastructure/index.js";
import {
  type AuthorizationServiceClient,
  GrpcStatus,
  ProfileResponse,
} from "@sorokchat-messenger/microservices";
import { lastValueFrom } from "rxjs";
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
  ) { }

  public async use(
    request: Request,
    _response: Response,
    next: NextFunction,
  ): Promise<void> {
    const logger = new Logger("AccessTokenMiddleware");
    const header = request.headers.authorization;
    if (!header || !header.startsWith(AccessTokenMiddleware.BEARER_PREFIX)) {
      logger.debug("Access token not provided");
      return next();
    }
    const accessToken = header.slice(
      AccessTokenMiddleware.BEARER_PREFIX.length,
    );
    logger.debug(`TOKEN: ${accessToken}`);
    try {
      const user = await lastValueFrom(this.service.profile({ accessToken }));
      logger.debug(`User by login "${user.login} found"`);
      request["user"] = user;
      return next();
    } catch (error) {
      if (
        this.isGrpcError(error) &&
        error.details === AuthorizationCodes.UNAUTHORIZED
      ) {
        logger.debug(`Profile error: ${error.code}`);
        return next();
      }
      logger.error(`Unknown error: `, error);
      throw error;
    }
  }

  private isGrpcError(
    error: unknown,
  ): error is { code: GrpcStatus; details: string } {
    return (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof error.code === "number" &&
      "details" in error &&
      typeof error.details === "string"
    );
  }
}

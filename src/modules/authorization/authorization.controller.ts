import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  Res,
} from "@nestjs/common";
import {
  AUTHORIZATION_CONTROLLER,
  type LoginPayload,
  LoginSchema,
  type RegisterPayload,
  RegisterSchema,
} from "@sorokchat-messenger/contracts";
import { AUTHORIZATION_SERVICE_TOKEN } from "../../infrastructure/index.js";
import {
  type LoginResponse,
  type RefreshTokensResponse,
  type AuthorizationServiceClient,
  type RegisterResponse,
} from "@sorokchat-messenger/microservices";
import { type Response } from "express";
import { lastValueFrom } from "rxjs";

type AuthorizationPayload =
  RegisterResponse | LoginResponse | RefreshTokensResponse;

@Controller(AUTHORIZATION_CONTROLLER.NAME)
export class AuthorizationController {
  public constructor(
    @Inject(AUTHORIZATION_SERVICE_TOKEN)
    private readonly service: AuthorizationServiceClient,
  ) {}

  @Post(AUTHORIZATION_CONTROLLER.REGISTER)
  public async register(
    @Body({ schema: RegisterSchema }) payload: RegisterPayload,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await lastValueFrom(this.service.register(payload));
    return this.authorize(result, response);
  }

  @Post(AUTHORIZATION_CONTROLLER.LOGIN)
  public async login(
    @Body({ schema: LoginSchema }) payload: LoginPayload,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await lastValueFrom(this.service.login(payload));
    return this.authorize(result, response);
  }

  @Delete(AUTHORIZATION_CONTROLLER.LOGOUT)
  public async logout() {}

  @Put(AUTHORIZATION_CONTROLLER.REFRESH_TOKENS)
  public async refreshTokens() {}

  @Get(AUTHORIZATION_CONTROLLER.PROFILE)
  public async profile() {}

  private authorize(
    { accessToken, refreshToken }: AuthorizationPayload,
    response: Response,
  ): { accessToken: string } {
    response.cookie("__Host-", refreshToken, {
      domain: undefined,
      path: "/",
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return { accessToken };
  }
}

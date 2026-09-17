import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Put,
  Req,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import {
  AUTHORIZATION_CONTROLLER,
  AuthorizationCodes,
  type LoginPayload,
  LoginSchema,
  type RegisterPayload,
  RegisterSchema,
} from "@sorokchat-messenger/contracts";
import {
  AUTHORIZATION_SERVICE_TOKEN,
  type RefreshTokenConfig,
} from "../../infrastructure/index.js";
import {
  type LoginResponse,
  type RefreshTokensResponse,
  type AuthorizationServiceClient,
  type RegisterResponse,
  type ProfileResponse,
} from "@sorokchat-messenger/microservices";
import { type Request, type Response } from "express";
import { lastValueFrom } from "rxjs";
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  SchemaObject,
} from "@nestjs/swagger";
import { REFRESH_TOKEN_TOKEN } from "./refresh-token.provider.js";
import { CookiesService } from "../cookies/cookies.service.js";
import { CurrentUser } from "./current-user.decorator.js";
import { Protected } from "./protected.decorator.js";
import { AuthorizedOpenapiSchema } from "../../libs/index.js";

type AuthorizationPayload =
  RegisterResponse | LoginResponse | RefreshTokensResponse;

@ApiTags("Авторизація")
@Controller(AUTHORIZATION_CONTROLLER.NAME)
export class AuthorizationController {
  public constructor(
    @Inject(AUTHORIZATION_SERVICE_TOKEN)
    private readonly service: AuthorizationServiceClient,
    @Inject(REFRESH_TOKEN_TOKEN)
    private readonly refreshTokensOptions: RefreshTokenConfig,
    private readonly cookieService: CookiesService,
  ) {}

  @ApiOperation({
    summary: "Реєстрація",
    description: "Створення та авторизація користувача у системі",
  })
  @ApiCreatedResponse({
    description: "Успішна реєстрація",
    schema: AuthorizedOpenapiSchema.schema as SchemaObject,
  })
  @Post(AUTHORIZATION_CONTROLLER.REGISTER)
  @HttpCode(HttpStatus.CREATED)
  public async register(
    @Body({ schema: RegisterSchema }) payload: RegisterPayload,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await lastValueFrom(this.service.register(payload));
    return this.authorize(result, response);
  }

  @Post(AUTHORIZATION_CONTROLLER.LOGIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: "Успішний вхід",
    schema: AuthorizedOpenapiSchema.schema as SchemaObject,
  })
  public async login(
    @Body({ schema: LoginSchema }) payload: LoginPayload,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await lastValueFrom(this.service.login(payload));
    return this.authorize(result, response);
  }

  @Delete(AUTHORIZATION_CONTROLLER.LOGOUT)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Protected()
  public async logout(@Res({ passthrough: true }) response: Response) {
    this.cookieService.clearCookie(
      this.refreshTokensOptions.cookieName,
      response,
    );
  }

  @Put(AUTHORIZATION_CONTROLLER.REFRESH_TOKENS)
  public async refreshTokens(@Req() request: Request) {
    const refreshToken = this.cookieService.getCookie(
      this.refreshTokensOptions.cookieName,
      request,
    );
    if (refreshToken) return this.service.refreshTokens({ refreshToken });
    throw new UnauthorizedException(AuthorizationCodes.BAD_CREDENTIALS);
  }

  @Get(AUTHORIZATION_CONTROLLER.PROFILE)
  @Protected()
  public async profile(@CurrentUser() user: ProfileResponse) {
    return user;
  }

  private authorize(
    { accessToken, refreshToken }: AuthorizationPayload,
    response: Response,
  ): { accessToken: string } {
    this.cookieService.setCookie(
      this.refreshTokensOptions.cookieName,
      refreshToken,
      this.refreshTokensOptions.maxAge,
      response,
    );
    return { accessToken };
  }
}

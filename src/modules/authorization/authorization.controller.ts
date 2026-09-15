import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
} from "@nestjs/common";
import {
  AUTHORIZATION_CONTROLLER,
  type LoginPayload,
  LoginSchema,
  type RegisterPayload,
  RegisterSchema,
} from "@sorokchat-messenger/contracts";
import { AUTHORIZATION_SERVICE_TOKEN } from "../../infrastructure/index.js";
import { type AuthorizationServiceClient } from "@sorokchat-messenger/microservices";

@Controller(AUTHORIZATION_CONTROLLER.NAME)
export class AuthorizationController {
  public constructor(
    @Inject(AUTHORIZATION_SERVICE_TOKEN)
    private readonly service: AuthorizationServiceClient,
  ) {}

  @Post(AUTHORIZATION_CONTROLLER.REGISTER)
  public async register(
    @Body({ schema: RegisterSchema }) payload: RegisterPayload,
  ) {
    return this.service.register(payload);
  }

  @Post(AUTHORIZATION_CONTROLLER.LOGIN)
  public async login(@Body({ schema: LoginSchema }) payload: LoginPayload) {
    return this.service.login(payload);
  }

  @Delete(AUTHORIZATION_CONTROLLER.LOGOUT)
  public async logout() {}

  @Put(AUTHORIZATION_CONTROLLER.REFRESH_TOKENS)
  public async refreshTokens() {}

  @Get(AUTHORIZATION_CONTROLLER.PROFILE)
  public async profile() {}
}

import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { type LoginDto, type RegisterDto } from "../../libs/index.js";
import { AUTHORIZATION_CONTROLLER } from "@sorokchat-messenger/contracts";

@Controller(AUTHORIZATION_CONTROLLER.NAME)
export class AuthorizationController {
  @Post(AUTHORIZATION_CONTROLLER.REGISTER)
  public async register(@Body() payload: RegisterDto) {
    return payload;
  }

  @Post(AUTHORIZATION_CONTROLLER.LOGIN)
  public async login(@Body() payload: LoginDto) {
    return payload;
  }

  @Delete(AUTHORIZATION_CONTROLLER.LOGOUT)
  public async logout() {}

  @Put(AUTHORIZATION_CONTROLLER.REFRESH_TOKENS)
  public async refreshTokens() {}

  @Get(AUTHORIZATION_CONTROLLER.PROFILE)
  public async profile() {}
}

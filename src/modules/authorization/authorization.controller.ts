import { Body, Controller, Post } from "@nestjs/common";
import { RegisterDto } from "../../libs/index.js";

@Controller()
export class AuthorizationController {
  @Post()
  public async register(@Body() payload: RegisterDto) {
    return payload;
  }
}

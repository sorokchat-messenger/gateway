import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthorizationController } from "./authorization.controller.js";
import { AccessTokenMiddleware } from "./access-token.middleware.js";
import { REFRESH_TOKEN_PROVIDER } from "./refresh-token.provider.js";
import { CookiesModule } from "../cookies/cookies.module.js";

@Module({
  imports: [CookiesModule],
  controllers: [AuthorizationController],
  providers: [REFRESH_TOKEN_PROVIDER],
})
export class AuthorizationModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AccessTokenMiddleware).forRoutes("*");
  }
}

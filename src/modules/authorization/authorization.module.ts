import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthorizationController } from "./authorization.controller.js";
import { AccessTokenMiddleware } from "./access-token.middleware.js";

@Module({
  controllers: [AuthorizationController],
})
export class AuthorizationModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AccessTokenMiddleware).forRoutes("*");
  }
}

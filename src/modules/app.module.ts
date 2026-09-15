import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthorizationModule } from "./authorization/authorization.module.js";
import { ConfigModule } from "@nestjs/config";
import {
  getConfigOptions,
  MicroservicesModule,
} from "../infrastructure/index.js";
import { AccessTokenMiddleware } from "./authorization/access-token.middleware.js";

@Module({
  imports: [
    ConfigModule.forRoot(getConfigOptions()),
    MicroservicesModule,
    AuthorizationModule,
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AccessTokenMiddleware).forRoutes("*");
  }
}

import { Module } from "@nestjs/common";
import { AuthorizationModule } from "./authorization/authorization.module.js";
import { ConfigModule } from "@nestjs/config";
import {
  getConfigOptions,
  MicroservicesModule,
} from "../infrastructure/index.js";

@Module({
  imports: [
    ConfigModule.forRoot(getConfigOptions()),
    MicroservicesModule,
    AuthorizationModule,
  ],
})
export class AppModule {}

import { DynamicModule, Global, Module } from "@nestjs/common";
import { createClientModule } from "@sorokchat-messenger/microservices";
import { getAuthorizationOptions } from "../options/authorization.options.js";
import { AUTHORIZATION_SERVICE_PROVIDER } from "./providers/authorization.provider.js";

const ClientsModule: DynamicModule = createClientModule([
  getAuthorizationOptions(),
]) as DynamicModule;

@Global()
@Module({
  imports: [ClientsModule],
  providers: [AUTHORIZATION_SERVICE_PROVIDER],
  exports: [AUTHORIZATION_SERVICE_PROVIDER],
})
export class MicroservicesModule {}

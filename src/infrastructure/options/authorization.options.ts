import { ConfigService } from "@nestjs/config";
import {
  AUTHORIZATION_CLIENT,
  createClientModule,
} from "@sorokchat-messenger/microservices";
import { type AllConfigs } from "../config/index.js";

export function getAuthorizationOptions(): Parameters<
  typeof createClientModule
>[number][number] {
  return {
    ...AUTHORIZATION_CLIENT,
    inject: [ConfigService],
    urlFactory(configService: ConfigService<AllConfigs>): string {
      const host: string = configService.getOrThrow("authorization.host", {
        infer: true,
      });
      const port: number = configService.getOrThrow("authorization.port", {
        infer: true,
      });
      return `${host}:${port}`;
    },
  };
}

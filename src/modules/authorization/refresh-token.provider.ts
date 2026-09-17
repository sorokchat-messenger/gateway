import { type Provider } from "@nestjs/common";
import {
  AllConfigs,
  type RefreshTokenConfig,
} from "../../infrastructure/index.js";
import { ConfigService } from "@nestjs/config";

export const REFRESH_TOKEN_TOKEN: string = "refresh-token";
export const REFRESH_TOKEN_PROVIDER: Provider<RefreshTokenConfig> = {
  provide: REFRESH_TOKEN_TOKEN,
  inject: [ConfigService],
  useFactory(configSerice: ConfigService<AllConfigs>): RefreshTokenConfig {
    return {
      cookieName: configSerice.getOrThrow("refreshToken.cookieName", {
        infer: true,
      }),
      maxAge: configSerice.getOrThrow("refreshToken.maxAge", { infer: true }),
    };
  },
};

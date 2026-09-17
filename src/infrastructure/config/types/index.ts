import { type BasicConfig } from "@sorokchat-messenger/config";
import {
  type RefreshTokenConfig,
  type AuthorizationConfig,
  type HttpConfig,
} from "../schemas/index.js";

export type AllConfigs = {
  basic: BasicConfig;
  http: HttpConfig;
  authorization: AuthorizationConfig;
  refreshToken: RefreshTokenConfig;
};

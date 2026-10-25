import { type BasicConfig } from "@sorokchat-messenger/config";
import {
  type RefreshTokenConfig,
  type AuthorizationConfig,
  type HttpConfig,
  type ChatsConfig,
} from "../schemas/index.js";

export type AllConfigs = {
  basic: BasicConfig;
  http: HttpConfig;
  authorization: AuthorizationConfig;
  refreshToken: RefreshTokenConfig;
  chats: ChatsConfig
};

import "dotenv/config";
import { getBasicEnv } from "@sorokchat-messenger/config";
import { getHttpEnv } from "./http.env.js";
import { getAuthorizationEnv } from "./authorization.env.js";
import { getRefreshTokenEnv } from "./refresh-token.env.js";
import { getChatsEnv } from "./chats.env.js";

export function loadEnv() {
  return [
    getBasicEnv(process.env),
    getHttpEnv(process.env),
    getAuthorizationEnv(process.env),
    getRefreshTokenEnv(process.env),
    getChatsEnv(process.env)
  ];
}

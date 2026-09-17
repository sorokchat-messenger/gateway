import { getBasicEnv } from "@sorokchat-messenger/config";
import { getHttpEnv } from "./http.env.js";
import { getAuthorizationEnv } from "./authorization.env.js";
import { getRefreshTokenEnv } from "./refresh-token.env.js";

export function loadEnv() {
  return [
    getBasicEnv(process.env),
    getHttpEnv(process.env),
    getAuthorizationEnv(process.env),
    getRefreshTokenEnv(process.env),
  ];
}

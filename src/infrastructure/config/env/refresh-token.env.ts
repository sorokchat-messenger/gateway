import { registerEnv } from "@sorokchat-messenger/config";
import { RefreshTokenSchema } from "../schemas/index.js";

export function getRefreshTokenEnv(data: unknown) {
  return registerEnv("refreshToken", RefreshTokenSchema, data);
}

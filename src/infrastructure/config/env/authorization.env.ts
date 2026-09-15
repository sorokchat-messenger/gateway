import { registerEnv } from "@sorokchat-messenger/config";
import { AuthorizationSchema } from "../schemas/index.js";

export function getAuthorizationEnv(data: unknown) {
  return registerEnv("authorization", AuthorizationSchema, data);
}

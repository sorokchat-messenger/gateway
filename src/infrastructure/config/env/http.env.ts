import { registerEnv } from "@sorokchat-messenger/config";
import { HttpSchema } from "../schemas/index.js";

export function getHttpEnv(data: unknown) {
  return registerEnv("http", HttpSchema, data);
}

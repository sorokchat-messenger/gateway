import { HostSchema, PortSchema } from "@sorokchat-messenger/config";
import z from "zod";

export const AuthorizationSchema = z
  .object({
    AUTHORIZATION_HOST: HostSchema,
    AUTHORIZATION_PORT: PortSchema,
  })
  .transform(({ AUTHORIZATION_HOST, AUTHORIZATION_PORT }) => ({
    host: AUTHORIZATION_HOST,
    port: AUTHORIZATION_PORT,
  }));

export type AuthorizationConfig = z.infer<typeof AuthorizationSchema>;

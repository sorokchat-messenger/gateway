import { HostSchema, PortSchema } from "@sorokchat-messenger/config";
import z from "zod";

export const HttpSchema = z
  .object({
    HTTP_PROTOCOL: z
      .enum(["http", "https"], { error: "Протокол має бути http чи https" })
      .nonoptional({ error: "Протокол має бути" }),
    HTTP_HOST: HostSchema,
    HTTP_PORT: PortSchema,
  })
  .transform(({ HTTP_HOST, HTTP_PORT, HTTP_PROTOCOL }) => ({
    protocol: HTTP_PROTOCOL,
    host: HTTP_HOST,
    port: HTTP_PORT,
  }));

export type HttpConfig = z.infer<typeof HttpSchema>;

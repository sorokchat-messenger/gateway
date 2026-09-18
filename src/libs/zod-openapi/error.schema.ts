import { ErrorSchema } from "@sorokchat-messenger/contracts";
import { createSchema } from "zod-openapi";

export const ErrorOpenapiSchema: ReturnType<typeof createSchema> = createSchema(
  ErrorSchema,
  { io: "output" },
);

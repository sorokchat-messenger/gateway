import { AuthorizedSchema } from "@sorokchat-messenger/contracts";
import { createSchema } from "zod-openapi";

export const AuthorizedOpenapiSchema: ReturnType<typeof createSchema> =
  createSchema(AuthorizedSchema, {
    io: "output",
  });

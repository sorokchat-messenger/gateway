import { LoginSchema } from "@sorokchat-messenger/contracts";
import { createInputSchema } from "./input-schema.factory.js";

export const LoginOpenapiSchema = createInputSchema(LoginSchema);

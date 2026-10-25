import { AuthorizedSchema, LoginSchema, RegisterSchema } from "@sorokchat-messenger/contracts";
import { createOutputSchema } from "./output-schema.factory.js";
import { createInputSchema } from "./input-schema.factory.js";

export const AuthorizedOpenapiSchema = createOutputSchema(AuthorizedSchema);
export const LoginOpenapiSchema = createInputSchema(LoginSchema);
export const RegisterOpenapiSchema = createInputSchema(RegisterSchema);

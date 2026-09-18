import { RegisterSchema } from "@sorokchat-messenger/contracts";
import { createInputSchema } from "./input-schema.factory.js";

export const RegisterOpenapiSchema = createInputSchema(RegisterSchema);

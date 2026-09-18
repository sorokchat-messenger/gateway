import { UserSchema } from "@sorokchat-messenger/contracts";
import { createOutputSchema } from "./output-schema.factory.js";

export const UserOpenapiSchema = createOutputSchema(UserSchema);

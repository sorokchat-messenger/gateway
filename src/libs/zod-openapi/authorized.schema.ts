import { AuthorizedSchema } from "@sorokchat-messenger/contracts";
import { createOutputSchema } from "./output-schema.factory.js";

export const AuthorizedOpenapiSchema = createOutputSchema(AuthorizedSchema);

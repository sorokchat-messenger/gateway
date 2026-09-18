import { ErrorSchema } from "@sorokchat-messenger/contracts";
import { createOutputSchema } from "./output-schema.factory.js";

export const ErrorOpenapiSchema = createOutputSchema(ErrorSchema);

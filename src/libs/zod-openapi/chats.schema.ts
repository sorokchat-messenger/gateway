import {
    NewChatSchema,
    ChatSchema,
    ChatsSchema,
    UpdateChatSchema
} from "@sorokchat-messenger/contracts";
import { createInputSchema } from "./input-schema.factory.js";
import { createOutputSchema } from "./output-schema.factory.js";

export const NewChatOpenapiSchema = createInputSchema(NewChatSchema);
export const ChatOpenapiSchema = createOutputSchema(ChatSchema);
export const ChatsOpenapiSchema = createOutputSchema(ChatsSchema);
export const UpdateChatOpenapiSchema = createInputSchema(UpdateChatSchema);
export const CreatedChatOpenapiSchema = createOutputSchema(ChatSchema.pick({ id: true }));
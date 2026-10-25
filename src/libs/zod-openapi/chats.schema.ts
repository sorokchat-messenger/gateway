import {
    NewChatSchema,
    ChatSchema,
    UpdateChatSchema
} from "@sorokchat-messenger/contracts";
import { createInputSchema } from "./input-schema.factory.js";
import { createOutputSchema } from "./output-schema.factory.js";
import z from "zod";

export const PositiveNumberSchema = z.coerce.number();

export const NewChatOpenapiSchema = createInputSchema(NewChatSchema);
export const ChatOpenapiSchema = createOutputSchema(ChatSchema);
export const ChatsOpenapiSchema = createOutputSchema(ChatSchema.array());
export const UpdateChatOpenapiSchema = createInputSchema(UpdateChatSchema);
export const CreatedChatOpenapiSchema = createOutputSchema(ChatSchema.pick({ id: true }));
export const OffsetOpenapiSchema = createInputSchema(PositiveNumberSchema);
export const LimitOpenapiSchema = createInputSchema(PositiveNumberSchema);
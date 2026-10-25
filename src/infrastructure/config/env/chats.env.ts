import { registerEnv } from "@sorokchat-messenger/config";
import { ChatsSchema } from "../schemas/index.js";

export function getChatsEnv(data: unknown) {
    return registerEnv("chats", ChatsSchema, data);
}
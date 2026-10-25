import { HostSchema, PortSchema } from "@sorokchat-messenger/config";
import z from "zod";

export const ChatsSchema = z
    .object({
        CHATS_HOST: HostSchema,
        CHATS_PORT: PortSchema,
    })
    .transform(({ CHATS_HOST, CHATS_PORT }) => ({
        host: CHATS_HOST,
        port: CHATS_PORT,
    }));

export type ChatsConfig = z.infer<typeof ChatsSchema>;

import { ConfigService } from "@nestjs/config";
import {
    CHATS_CLIENT,
    createClientModule,
} from "@sorokchat-messenger/microservices";
import { type AllConfigs } from "../config/index.js";

export function getChatsOptions(): Parameters<
    typeof createClientModule
>[number][number] {
    return {
        ...CHATS_CLIENT,
        inject: [ConfigService],
        urlFactory(configService: ConfigService<AllConfigs>): string {
            const host: string = configService.getOrThrow("chats.host", {
                infer: true,
            });
            const port: number = configService.getOrThrow("chats.port", {
                infer: true,
            });
            return `${host}:${port}`;
        },
    };
}

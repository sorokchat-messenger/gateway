import { type Provider } from "@nestjs/common";
import {
    CHATS_SERVICE,
    type ChatsServiceClient,
} from "@sorokchat-messenger/microservices";
import { ClientGrpc } from "@nestjs/microservices";

export const CHATS_SERVICE_TOKEN: string = "CHATS_SERVICE";
export const CHATS_SERVICE_PROVIDER: Provider<ChatsServiceClient> =
{
    provide: CHATS_SERVICE_TOKEN,
    inject: [CHATS_SERVICE.NAME],
    useFactory(client: ClientGrpc): ChatsServiceClient {
        return client.getService<ChatsServiceClient>(
            CHATS_SERVICE.NAME,
        );
    },
};

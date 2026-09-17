import { type Provider } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE,
  type AuthorizationServiceClient,
} from "@sorokchat-messenger/microservices";
import { ClientGrpc } from "@nestjs/microservices";

export const AUTHORIZATION_SERVICE_TOKEN: string = "AUTHORIZATION_SERVICE";
export const AUTHORIZATION_SERVICE_PROVIDER: Provider<AuthorizationServiceClient> =
  {
    provide: AUTHORIZATION_SERVICE_TOKEN,
    inject: [AUTHORIZATION_SERVICE.NAME],
    useFactory(client: ClientGrpc): AuthorizationServiceClient {
      return client.getService<AuthorizationServiceClient>(
        AUTHORIZATION_SERVICE.NAME,
      );
    },
  };

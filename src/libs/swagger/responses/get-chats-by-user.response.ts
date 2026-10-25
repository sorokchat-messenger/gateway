import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { ChatsOpenapiSchema } from "../../zod-openapi/index.js";
import { UnauthorizedResponse } from "./unauthorized.response.js";

export const GetChatsByUserResponse = () => applyDecorators(
    ApiOkResponse({
        summary: "Мої чати",
        description: "Отримання чатів авторизованого користувача",
        content: {
            "application/json": {
                schema: ChatsOpenapiSchema.schema
            }
        }
    }),
    UnauthorizedResponse()
);
import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { LimitOpenapiSchema, OffsetOpenapiSchema } from "../../zod-openapi/index.js";

export const GetChatsByUserRequest = () => applyDecorators(
    ApiOperation({
        summary: "Мої чати",
        description: "Отримання чатів авторизованого користувача",
        parameters: [
            {
                in: "query",
                name: "offset",
                description: "Скільки елементів пропустити",
                schema: OffsetOpenapiSchema.schema
            },
            {
                in: "query",
                name: "limit",
                description: "Скільки елементів взяти",
                schema: LimitOpenapiSchema.schema
            }
        ]
    }),
    ApiBearerAuth()
);
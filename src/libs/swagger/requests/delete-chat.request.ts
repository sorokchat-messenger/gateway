import { applyDecorators } from "@nestjs/common";
import { ApiBasicAuth, ApiOperation } from "@nestjs/swagger";
import { ChatIdOpenapiSchema } from "../../zod-openapi/index.js";

export const DeleteChatRequest = () => applyDecorators(
    ApiOperation({
        summary: "Видалення чату",
        description: "Видалити чат із системи",
        parameters: [
            {
                in: "path",
                name: "id",
                description: "Унікальний ідентифікатор чату",
                schema: ChatIdOpenapiSchema.schema
            }
        ]
    }),
    ApiBasicAuth()
);
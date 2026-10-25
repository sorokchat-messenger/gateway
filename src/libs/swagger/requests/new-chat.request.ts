import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { NewChatOpenapiSchema } from "../../zod-openapi/index.js";

export const NewChatRequest = () => applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
        summary: "Новий чат",
        description: "Створити чат у системі",
        requestBody: {
            content: {
                "application/json": {
                    schema: NewChatOpenapiSchema.schema
                }
            }
        }
    })
)
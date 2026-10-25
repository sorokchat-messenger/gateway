import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { UpdateChatOpenapiSchema } from "../../zod-openapi/index.js";

export const UpdateChatRequest = () => applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
        summary: "Оновлення чату",
        description: "Оновити чат",
        requestBody: {
            content: {
                "application/json": {
                    schema: UpdateChatOpenapiSchema.schema
                }
            }
        }
    })
);
import { applyDecorators } from "@nestjs/common";
import { ApiCreatedResponse } from "@nestjs/swagger";
import { CreatedChatOpenapiSchema } from "../../zod-openapi/index.js";
import { UnauthorizedResponse } from "./unauthorized.response.js";

export const NewChatResponse = () => applyDecorators(
    ApiCreatedResponse({
        description: "Успішне створення чату",
        schema: CreatedChatOpenapiSchema.schema
    }),
    UnauthorizedResponse()
);
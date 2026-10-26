import { applyDecorators } from "@nestjs/common";
import { ApiNoContentResponse } from "@nestjs/swagger";
import { AccessDeniedResponse } from "./access-denied.response.js";
import { UnauthorizedResponse } from "./unauthorized.response.js";

export const DeleteChatResponse = () => applyDecorators(
    ApiNoContentResponse({
        description: "Успішне видалення"
    }),
    AccessDeniedResponse(),
    UnauthorizedResponse()
);
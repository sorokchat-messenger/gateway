import { applyDecorators } from "@nestjs/common";
import { ApiNoContentResponse } from "@nestjs/swagger";
import { UnauthorizedResponse } from "./unauthorized.response.js";
import { AccessDeniedResponse } from "./access-denied.response.js";

export const UpdateChatResponse = () => applyDecorators(
    ApiNoContentResponse({
        description: "Успішне оновлення чату"
    }),
    UnauthorizedResponse(),
    AccessDeniedResponse()
);
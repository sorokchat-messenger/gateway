import { applyDecorators } from "@nestjs/common";
import { DeleteChatRequest } from "../requests/index.js";
import { DeleteChatResponse } from "../responses/index.js";

export const DeleteChatOperation = () => applyDecorators(
    DeleteChatRequest(),
    DeleteChatResponse()
);
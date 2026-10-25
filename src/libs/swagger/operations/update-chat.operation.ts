import { applyDecorators } from "@nestjs/common";
import { UpdateChatRequest } from "../requests/index.js";
import { UpdateChatResponse } from "../responses/index.js";

export const UpdateChatOperation = () => applyDecorators(
    UpdateChatRequest(),
    UpdateChatResponse()
);
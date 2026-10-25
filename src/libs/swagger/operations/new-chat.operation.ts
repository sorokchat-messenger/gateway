import { applyDecorators } from "@nestjs/common";
import { NewChatRequest } from "../requests/index.js";
import { NewChatResponse } from "../responses/index.js";

export const NewChatOperation = () => applyDecorators(
    NewChatRequest(),
    NewChatResponse()
)
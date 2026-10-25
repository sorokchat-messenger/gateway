import { applyDecorators } from "@nestjs/common";
import { GetChatsByUserRequest } from "../requests/index.js";
import { GetChatsByUserResponse } from "../responses/index.js";

export const GetChatsByUserOperation = () => applyDecorators(
    GetChatsByUserRequest(),
    GetChatsByUserResponse()
);
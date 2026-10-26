import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post, Put, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {
    CHATS_CONTROLLER,
    ChatSchema,
    type NewChatPayload,
    NewChatSchema,
    type UpdateChatPayload,
    UpdateChatSchema
} from "@sorokchat-messenger/contracts";
import { CHATS_SERVICE_TOKEN } from "../../infrastructure/index.js";
import { type ChatsServiceClient } from "@sorokchat-messenger/microservices";
import {
    NewChatOperation,
    UpdateChatOperation,
    GetChatsByUserOperation,
    PositiveNumberSchema,
    DeleteChatOperation
} from "../../libs/index.js";
import { lastValueFrom } from "rxjs";
import { Protected } from "../authorization/protected.decorator.js";
import { CurrentUser } from "../authorization/current-user.decorator.js";

@Controller(CHATS_CONTROLLER.NAME)
@ApiTags("Чати")
export class ChatsController {
    public constructor(
        @Inject(CHATS_SERVICE_TOKEN)
        private readonly service: ChatsServiceClient
    ) { }

    @GetChatsByUserOperation()
    @Protected()
    @Get()
    @HttpCode(HttpStatus.OK)
    public async getByUser(
        @CurrentUser("id") userId: string,
        @Query("limit", { schema: PositiveNumberSchema }) limit: number,
        @Query("offset", { schema: PositiveNumberSchema }) offset: number
    ) {
        const { chats } = await lastValueFrom(this.service.getChatsByUser({ userId, limit, offset }));
        return chats;
    }

    @NewChatOperation()
    @Protected()
    @Post(CHATS_CONTROLLER.CREATE.PATTERN)
    @HttpCode(HttpStatus.CREATED)
    public async createChat(
        @CurrentUser('id') actorId: string,
        @Body({ schema: NewChatSchema }) payload: NewChatPayload
    ) {
        const request = { ...{ name: payload.name, description: payload.description || "" }, actorId };
        return await lastValueFrom(this.service.createChat(request))
    }

    @UpdateChatOperation()
    @Protected()
    @Put(CHATS_CONTROLLER.UPDATE.PATTERN)
    @HttpCode(HttpStatus.NO_CONTENT)
    public async updateChat(
        @CurrentUser('id') actorId: string,
        @Body({ schema: UpdateChatSchema }) payload: UpdateChatPayload,
        @Param(CHATS_CONTROLLER.UPDATE.PATTERN.replace(":", "")) id: string
    ) {
        await lastValueFrom(this.service.updateChat({ ...payload, actorId, id }));
    }

    @DeleteChatOperation()
    @Protected()
    @Delete(CHATS_CONTROLLER.DELETE.PATTERN)
    @HttpCode(HttpStatus.NO_CONTENT)
    public async deleteChat(
        @Param("id", { schema: ChatSchema.shape.id }) id: string,
        @CurrentUser("id") actorId: string
    ) {
        await lastValueFrom(this.service.deleteChat({ actorId, id }));
    }
}
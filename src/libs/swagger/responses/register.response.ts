import { ApiConflictResponse, ApiCreatedResponse, type SchemaObject } from "@nestjs/swagger";
import { AuthorizedOpenapiSchema, ErrorOpenapiSchema } from "../../zod-openapi/index.js";
import { applyDecorators, ConflictException } from "@nestjs/common";
import { AccessDeniedResponse } from "./access-denied.response.js";
import { BadRequestResponse } from "./bad-request.response.js";
import { UserCodes } from "@sorokchat-messenger/contracts";

export const RegisterResponse = () =>
  applyDecorators(
    ApiCreatedResponse({
      description: "Користувача успішно зареєстровано",
      schema: AuthorizedOpenapiSchema.schema as SchemaObject,
    }),
    AccessDeniedResponse(),
    ApiConflictResponse({
      description: "Користувач вже існує",
      schema: ErrorOpenapiSchema.schema
    }),
    BadRequestResponse({
      login: UserCodes.LOGIN.EMPTY,
      password: UserCodes.PASSWORD.MAX_LENGTH.CODE,
      displayName: UserCodes.DISPLAY_NAME.EMPTY,
    }),
  );

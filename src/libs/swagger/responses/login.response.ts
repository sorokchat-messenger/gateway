import { ApiOkResponse, type SchemaObject } from "@nestjs/swagger";
import { AuthorizedOpenapiSchema } from "../../zod-openapi/authorized.schema.js";
import { applyDecorators } from "@nestjs/common";
import { AccessDeniedResponse } from "./access-denied.response.js";
import { BadRequestResponse } from "./bad-request.response.js";
import { UserCodes } from "@sorokchat-messenger/contracts";

export const LoginResponse = () =>
  applyDecorators(
    ApiOkResponse({
      description: "Користувач успішно увішов",
      schema: AuthorizedOpenapiSchema.schema as SchemaObject,
    }),
    AccessDeniedResponse(),
    BadRequestResponse({
      login: UserCodes.LOGIN.EMPTY,
      password: UserCodes.PASSWORD.MAX_LENGTH.CODE,
    }),
  );

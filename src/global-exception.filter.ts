import { type ServiceError } from "@grpc/grpc-js";
import {
  type ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import {
  BAD_REQUEST_ERROR_CODE,
  ErrorSchema,
  type ErrorPayload,
} from "@sorokchat-messenger/contracts";
import {
  GrpcStatus,
  GrpcToHttpStatus,
} from "@sorokchat-messenger/microservices";
import { type Response } from "express";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  public catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    let error: ErrorPayload;
    if (exception instanceof BadRequestException) {
      const parsed = ErrorSchema.safeParse(exception.getResponse());
      if (parsed.success) {
        error = parsed.data;
      } else {
        error = {
          message: BAD_REQUEST_ERROR_CODE,
          status: HttpStatus.BAD_REQUEST,
        };
      }
    } else if (exception instanceof HttpException) {
      error = {
        message: exception.message,
        status: exception.getStatus(),
      };
    } else if (this.isGrpcError(exception)) {
      error = {
        status: GrpcToHttpStatus[exception.code],
        message: exception.details,
      };
    } else if (exception instanceof Error) {
      error = {
        status: GrpcToHttpStatus[GrpcStatus.INTERNAL],
        message: exception.message,
      };
    } else {
      error = {
        message: "errors.unknown",
        status: GrpcToHttpStatus[GrpcStatus.UNKNOWN],
      };
    }
    return response.status(error.status).json(error);
  }

  private isGrpcError(
    error: unknown,
  ): error is { code: GrpcStatus; details: string } {
    return (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof error.code === "number" &&
      "details" in error &&
      typeof error.details === "string"
    );
  }
}

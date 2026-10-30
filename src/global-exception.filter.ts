import {
  type ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import {
  BAD_REQUEST_ERROR_CODE,
  ErrorSchema,
  HttpStatus,
  UNKNOWN,
  type ErrorPayload,
} from "@sorokchat-messenger/contracts";
import {
  GrpcStatus,
  GrpcToHttpStatus,
} from "@sorokchat-messenger/microservices";
import { type Response } from "express";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  public catch(exception: unknown, host: ArgumentsHost): Response {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    let error: ErrorPayload;
    const grpcError = this.extractGrpcError(exception);
    if (grpcError) {
      const httpStatus =
        GrpcToHttpStatus[grpcError.code] ?? GrpcToHttpStatus[GrpcStatus.INTERNAL];
      error = {
        status: httpStatus as HttpStatus,
        message: grpcError.details,
      };
    } else if (exception instanceof BadRequestException) {
      const parsed = ErrorSchema.safeParse(exception.getResponse());
      error = parsed.success
        ? parsed.data
        : {
          message: BAD_REQUEST_ERROR_CODE,
          status: HttpStatus.BAD_REQUEST,
        };
    } else if (exception instanceof HttpException) {
      error = {
        message: exception.message,
        status: exception.getStatus() as HttpStatus,
      };
    } else if (exception instanceof Error) {
      error = {
        status: GrpcToHttpStatus[GrpcStatus.INTERNAL] as HttpStatus,
        message: exception.message,
      };
    } else {
      error = {
        message: UNKNOWN,
        status: GrpcToHttpStatus[GrpcStatus.INTERNAL] as HttpStatus,
      };
    }
    return response.status(error.status ?? GrpcToHttpStatus[GrpcStatus.INTERNAL]).json(error);
  }

  private extractGrpcError(
    error: unknown,
  ): { code: GrpcStatus; details: string } | null {
    if (!this.isObject(error)) {
      return null;
    }
    const err = error as Record<string, unknown>;
    let target = err;
    if (typeof err.getError === "function") {
      const inner = err.getError();
      if (this.isObject(inner)) {
        target = inner as Record<string, unknown>;
      }
    }
    let rawCode = target.code ?? target.status ?? (target.error as Record<string, unknown>)?.code;
    let rawDetails = target.details ?? target.message ?? (target.error as Record<string, unknown>)?.details;

    const detailsStr = typeof rawDetails === "string" ? rawDetails : "";
    if ((rawCode === undefined || rawCode === null || rawCode === 2) && detailsStr) {
      const match = detailsStr.match(/^(\d+)\s+(?:[A-Z_]+:\s*)?(.+)$/);
      if (match) {
        rawCode = Number(match[1]);
        rawDetails = match[2];
      }
    }
    if (rawCode === undefined || rawCode === null) {
      return null;
    }
    const code = Number(rawCode);
    if (!isNaN(code) && code >= 0 && code <= 16) {
      const details =
        typeof rawDetails === "string" && rawDetails !== "Rpc Exception"
          ? rawDetails
          : UNKNOWN;
      return {
        code: code as GrpcStatus,
        details,
      };
    }

    return null;
  }

  private isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
  }
}
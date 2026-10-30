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

interface GrpcErrorShape {
  code?: unknown;
  status?: unknown;
  details?: unknown;
  message?: unknown;
  error?: {
    code?: unknown;
    details?: unknown;
    message?: unknown;
  };
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  public catch(exception: unknown, host: ArgumentsHost): Response {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    let error: ErrorPayload;
    const grpcError = this.extractGrpcError(exception);
    console.log(JSON.stringify(grpcError));
    if (grpcError) {
      const httpStatus =
        GrpcToHttpStatus[grpcError.code] ?? GrpcToHttpStatus[GrpcStatus.UNKNOWN];
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
        status: GrpcToHttpStatus[GrpcStatus.UNKNOWN] as HttpStatus,
      };
    }
    return response.status(error.status ?? 500).json(error);
  }

  private extractGrpcError(
    error: unknown,
  ): { code: GrpcStatus; details: string } | null {
    console.log(error);

    if (!this.isObject(error)) {
      return null;
    }
    const err = error as GrpcErrorShape;
    const rawCode = err.code ?? err.error?.code ?? err.status;
    const rawDetails = err.details;
    if (typeof rawCode !== "number" && typeof rawCode !== "string") {
      return null;
    }
    const code = Number(rawCode);
    if (!isNaN(code)) {
      return {
        code: code as GrpcStatus,
        details: typeof rawDetails === "string" ? rawDetails : UNKNOWN,
      };
    }
    return null;
  }

  private isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
  }
}
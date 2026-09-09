import { LoginSchema, RegisterSchema } from "@sorokchat-messenger/contracts";
import { createZodDto } from "nest-swagger-zod";

export class RegisterDto extends createZodDto(RegisterSchema) {}

export class LoginDto extends createZodDto(LoginSchema) {}

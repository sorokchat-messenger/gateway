import { UseGuards } from "@nestjs/common";
import { AnonymousGuard } from "./anonymous.guard.js";

export const Anonymous = () => UseGuards(AnonymousGuard);

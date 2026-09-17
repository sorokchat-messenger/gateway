import { UseGuards } from "@nestjs/common";
import { ProtectedGuard } from "./protected.guard.js";

export const Protected = () => UseGuards(ProtectedGuard);

import { type ProfileResponse } from "@sorokchat-messenger/microservices";

declare global {
  namespace Express {
    interface Request {
      user?: ProfileResponse;
    }
  }
}

import { Injectable } from "@nestjs/common";
import { CookieOptions, type Request, type Response } from "express";

const BASE_COOKIE_OPTIONS: CookieOptions = {
  domain: undefined,
  path: "/",
  secure: true,
  httpOnly: true,
  sameSite: "lax",
};

@Injectable()
export class CookiesService {
  public setCookie(
    name: string,
    value: string,
    maxAge: number,
    response: Response,
  ): Response {
    return response.cookie(name, value, {
      ...BASE_COOKIE_OPTIONS,
      maxAge: maxAge,
    });
  }

  public getCookie(name: string, request: Request): string | null {
    const value = request.cookies?.[name] ?? request.signedCookies?.[name];
    return typeof value === "string" ? value : null;
  }

  public clearCookie(name: string, response: Response): Response {
    return response.clearCookie(name, BASE_COOKIE_OPTIONS);
  }
}

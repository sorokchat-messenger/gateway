import z from "zod";

export const RefreshTokenSchema = z
  .object({
    REFRESH_TOKEN_MAX_AGE: z.coerce
      .number({ error: "Час життя токена відновлення має бути числом" })
      .int({ error: "Час життя токена відновлення має бути цілим числом" })
      .positive({
        error: "Час життя токена відновлення має позитивним числом",
      }),
    REFRESH_TOKEN_COOKIE_NAME: z
      .string({
        error: "Назва куки для токену відновлення має бути рядком",
      })
      .nonempty({ error: "Назва куки для токену відновлення має бути" }),
  })
  .transform(({ REFRESH_TOKEN_COOKIE_NAME, REFRESH_TOKEN_MAX_AGE }) => ({
    cookieName: REFRESH_TOKEN_COOKIE_NAME,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  }));

export type RefreshTokenConfig = z.infer<typeof RefreshTokenSchema>;

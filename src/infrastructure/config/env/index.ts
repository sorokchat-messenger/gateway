import { getBasicEnv } from "@sorokchat-messenger/config"

export function loadEnv() {
    return [getBasicEnv(process.env)]
}
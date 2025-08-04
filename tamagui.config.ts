import { defaultConfig } from "@tamagui/config/v4";
import { createTamagui } from "tamagui";
import { themes } from "./themes";
import { tokens } from "./tokens";

export const config = createTamagui({
    ...defaultConfig,
    themes,
    tokens
})
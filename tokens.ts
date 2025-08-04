import { defaultConfig } from "@tamagui/config/v4";
import { createTokens } from "tamagui";

export const tokens = createTokens({
    ...defaultConfig.tokens,
    size: {
        ...defaultConfig.tokens.size,
    },
    space: {
        ...defaultConfig.tokens.space,
    },
    radius: {
        ...defaultConfig.tokens.radius,
    },
    color: {
        1:"hsla(0, 0%, 100%, 1)",
        2:"hsla(0, 0%, 90%, 1)",
        3:"hsla(0, 0%, 80%, 1)",
        4:"hsla(0, 0%, 70%, 1)",
        5:"hsla(0, 0%, 60%, 1)",
        6:"hsla(0, 0%, 50%, 1)",
        7:"hsla(0, 0%, 40%, 1)",
        8:"hsla(0, 0%, 30%, 1)",
        9:"hsla(0, 0%, 20%, 1)",
        10:"hsla(0, 0%, 10%, 1)",
        11:"hsla(0, 0%, 5%, 1)",
        textPrimary: 'hsla(0, 0%, 100%, 1)',
        textSecondary: 'hsla(0, 0%, 80%, 1)',
        textOnPrimary: '#fff',
    },
})
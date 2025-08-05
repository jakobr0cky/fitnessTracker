import Color from 'color';
import React, { ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    Button,
    Text,
    useTheme,
    XStack
} from 'tamagui';

type BottomActionButtonProps = {
    text: string,
    onPress: () => void,
    icon?: ReactNode,
    disabled?: boolean
}

export default function BottomActionButton(props: BottomActionButtonProps) {
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    return (
        <Button
            backgroundColor={props.disabled ? Color(theme.color7?.val).alpha(0.5).toString(): Color(theme.color7?.val).darken(0.3).toString()}
            borderRadius="$4"
            height="$5"
            left="$4"
            right="$4"
            alignItems="center"
            justifyContent="center"
            borderWidth={0}
            pressStyle={{
                backgroundColor: "rgba(98, 239, 255, 0.8)",
                transform: [{ scale: 0.98 }]
            }}
            onPress={props.onPress}
            position="absolute"
            bottom={insets.bottom}
            disabled={props.disabled}
        >
            <XStack alignItems="center" gap="$2">
                {props.icon}
                <Text
                    color="$1"
                    fontFamily="$heading"
                    fontSize="$5"
                    fontWeight="500"
                >
                    {props.text}
                </Text>
            </XStack>
        </Button>
    );
}
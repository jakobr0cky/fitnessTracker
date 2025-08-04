import Color from "color";
import { useRouter } from "expo-router";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Image, Text, View, YStack } from "tamagui";

export default function SignInSignUp() {
    const windowDimensions = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const router = useRouter();

    return (
        <View insetBlockEnd={insets.bottom}>
            <Image zIndex={1}
                width={windowDimensions.width}
                height={windowDimensions.height}
                src={require("@/assets/images/weight.jpg")}></Image>
            <YStack zIndex={2} position="absolute" bottom={150} alignSelf="center" gap="$2">
                <Button
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor={Color("hsla(186, 70%, 80%, 1)").alpha(0.8).string()}
                    width={350}
                    height={55}
                    onPress={() => router.navigate("/signIn")}>
                    <Text color="$textPrimary" fontWeight="bold" fontSize="$7">Anmelden</Text>
                </Button>
                <Button
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor={Color("hsla(186, 70%, 60%, 1)").alpha(0.8).string()}
                    width={350}
                    height={55}
                    onPress={() => router.navigate("/signUp")}>
                    <Text color="$textPrimary" fontWeight="bold" fontSize="$7">Registrieren</Text>
                </Button>
            </YStack>
        </View>
    );
}
import { useSessionStore } from '@/stores/sessionStore';
import { supabase } from '@/supabase/supabase';
import Color from 'color';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from "expo-router";
import { useState } from 'react';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Image, Input, Text, useTheme, useWindowDimensions, View, XStack, YStack } from "tamagui";

export default function SignIn() {
    const windowDimensions = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const theme = useTheme();
    const setSession = useSessionStore((state) => state.setSession);

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signInWithEmail = async () => {
        setLoading(true);
        const res = await supabase.auth.signInWithPassword({ email: email, password: password });

        if (res.error) {
            console.log(`error signing in: ${JSON.stringify(res.error, null, 2)}`);
            return;
        }

        if (!res.data) {
            console.log(`no data from user found`);
            return;
        }

        if (!res.data.session) {
            console.log(`no session found from user`);
            return;
        }

        setSession(res.data.session);
        setLoading(false);
        console.log(`successfully signed in`);
    }

    return (
        <View insetBlockEnd={insets.bottom}>
            <Image zIndex={1}
                width={windowDimensions.width}
                height={windowDimensions.height}
                src={require("@/assets/images/weight.jpg")} />
            <View backgroundColor="hsla(60, 5%, 8%, 0.5)" />
            <LinearGradient
                style={{
                    width: windowDimensions.width,
                    height: windowDimensions.height,
                    position: "absolute",
                    zIndex: 2,
                }}
                end={{
                    x: 0.5, y: 0.8
                }}
                colors={["hsla(231, 5%, 19%, 0)", "hsla(0, 0%, 0%, 1)"]}>
            </LinearGradient>
            <YStack zIndex={3} position="absolute" top={100} alignSelf="center" gap="$2">
                {/* <Shadow
                    distance={5} // Blur / Intensität
                    startColor={theme.color1?.val} // Shadow-Farbe
                    offset={[0, 0]}
                    style={{
                        borderRadius: 8,
                    }}> */}
                    <Input
                        onChangeText={setEmail}
                        width={288}
                        height={55}
                        marginTop={130}
                        alignSelf='center'
                        borderRadius={8}
                        placeholderTextColor="hsla(47,4%,62%,1)"
                        backgroundColor="hsla(240,7%,86%,1)"
                        placeholder="Email"
                    />
                {/* </Shadow> */}
                <Input
                    onChangeText={(text) => setPassword(text)}
                    alignSelf="center"
                    marginTop={10}
                    width={288}
                    height={55}
                    placeholderTextColor="hsla(47,4%,62%,1)"
                    backgroundColor="hsla(240,7%,86%,1)"
                    placeholder="Passwort" />
                <XStack
                    alignSelf="center"
                    alignItems="center"
                    justifyContent="flex-end"
                    width={288}
                    height={55}>
                    <Link
                        style={{ borderBottomColor: "hsla(216,91%,43%,1)", borderBottomWidth: 1 }}
                        href={"/signInSignUp"}>
                        <Text color="hsla(216,91%,43%,1)"> Passwort vergessen</Text>
                    </Link>
                </XStack>
                <Button
                    onPress={() => signInWithEmail()}
                    marginTop={30}
                    alignSelf="center"
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor={Color("hsla(186, 100%, 60%, 0.7)").alpha(0.6).string()}
                    width={336}
                    height={55}>
                    <Text color="$textPrimary" fontWeight="bold" fontSize="$7">Anmelden</Text>
                </Button>
                <XStack marginTop={30} justifyContent="center" alignItems="center">
                    <View height={1} backgroundColor="$3" width={100} />
                    <Text marginLeft={16} marginRight={16} color="$3">Oder anmelden mit</Text>
                    <View height={1} backgroundColor="$3" width={100} />
                </XStack>
                <XStack marginTop={20} gap={10} alignSelf="center">
                    <Button backgroundColor="$1" width={95} height={55}>
                        <Icon size={30} name="facebook" color={theme.color5?.val} />
                    </Button>
                    <Button backgroundColor="$1" width={95} height={55}>
                        <Icon size={30} name="google" color={theme.color5?.val} />
                    </Button>
                    <Button backgroundColor="$1" width={95} height={55}>
                        <Icon size={30} name="apple" color={theme.color5?.val} />
                    </Button>
                </XStack>
            </YStack>
            <XStack zIndex={3} alignSelf="center" alignItems="center" position="absolute" bottom={20}>
                <Text color="$3">Noch keinen Account?</Text>
                <Pressable style={{ marginLeft: 5 }} onPress={() => router.replace("/signUp")}>
                    <Text color="hsla(216,91%,43%,1)" borderBottomColor="hsla(216,91%,43%,1)" borderBottomWidth={1}>Registrieren</Text>
                </Pressable>
            </XStack>
        </View>
    );
}
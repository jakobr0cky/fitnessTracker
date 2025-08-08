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

export default function SignUp() {
    const windowDimensions = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const theme = useTheme();
    const setSession = useSessionStore((state) => state.setSession);

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUpWithEmail = async () => {
        setLoading(true);
        const res = await supabase.auth.signUp({ email: email, password: password });

        if (res.error) {
            console.log(`error signing up: ${JSON.stringify(res.error, null, 2)}`);
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
        console.log(`successfully signed up`);

        if (!res.data.user) {
            console.log(`no user found`);
            return;
        }

        createProfile(res.data.user.id, res.data.user.email!);
    }

    const createProfile = async (user_id: string, email: string) => {
        setLoading(true);
        const res = await supabase.from("profiles").insert({ username: email, user_id: user_id }).select();

        if (res.error) {
            console.log(`error signing in: ${JSON.stringify(res.error, null, 2)}`);
            return;
        }

        console.log(`successfully created profile: ${JSON.stringify(res.data, null, 2)}`);
        setLoading(false);
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
                <Input
                    onChangeText={(text) => setEmail(text)}
                    alignSelf="center"
                    marginTop={130}
                    width={288}
                    height={55}
                    placeholderTextColor="hsla(47,4%,62%,1)"
                    backgroundColor="hsla(240,7%,86%,1)"
                    placeholder="Email" />
                <Input
                    secureTextEntry={true}
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
                        href={"/SignInSignUp"}>
                        <Text color="hsla(216,91%,43%,1)"> Passwort vergessen</Text>
                    </Link>
                </XStack>
                <Button
                    onPress={() => signUpWithEmail()}
                    marginTop={30}
                    alignSelf="center"
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor={Color("hsla(186, 100%, 60%, 0.7)").alpha(0.6).string()}
                    width={336}
                    height={55}>
                    <Text color="$textPrimary" fontWeight="bold" fontSize="$7">Registrieren</Text>
                </Button>
                <XStack marginTop={30} justifyContent="center" alignItems="center">
                    <View height={1} backgroundColor="$3" width={100} />
                    <Text marginLeft={16} marginRight={16} color="$3">Oder registrieren mit</Text>
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
                <Pressable style={{ marginLeft: 5 }} onPress={() => router.replace("/SignIn")}>
                    <Text color="hsla(216,91%,43%,1)" borderBottomColor="hsla(216,91%,43%,1)" borderBottomWidth={1}>Anmelden</Text>
                </Pressable>
            </XStack>
        </View>
    );
}
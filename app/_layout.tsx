import { useSessionStore } from "@/stores/sessionStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { TamaguiProvider } from "tamagui";
import { config } from "./../tamagui.config";

export default function RootLayout() {
    const queryClient = new QueryClient();
    const session = useSessionStore();

    const isUserLoggedIn = () => session.session ? true : false;

    return (
        <TamaguiProvider config={config} defaultTheme="dark">
            <QueryClientProvider client={queryClient}>
                <Stack initialRouteName={isUserLoggedIn() ? "(tabs)" : "signInSignUp"}>
                    <Stack.Protected guard={isUserLoggedIn()}>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="runningWorkoutSession/[workoutSessionId]" options={{ headerShown: false }} />
                    </Stack.Protected>
                    <Stack.Protected guard={!isUserLoggedIn()}>
                        <Stack.Screen name="signInSignUp" options={{ headerShown: false}}/>
                        <Stack.Screen name="signIn" options={{ headerShown: false, animation: "slide_from_right"}}/>
                        <Stack.Screen name="signUp" options={{ headerShown: false, animation: "slide_from_right"}}/>
                    </Stack.Protected>
                </Stack>
            </QueryClientProvider>
        </TamaguiProvider>
    );
}
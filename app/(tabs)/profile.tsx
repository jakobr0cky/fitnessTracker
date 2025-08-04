import { useSessionStore } from "@/stores/sessionStore";
import { supabase } from "@/supabase/supabase";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Input, Text, XStack, YStack } from "tamagui";

export default function Profile() {
    const session = useSessionStore((state) => state.session);
    const deleteSession = useSessionStore((state) => state.deleteSession);
    const insets = useSafeAreaInsets();

    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        console.log(`current session: ${JSON.stringify(session,null,2)}`);
    },[])

    if(session === null){
        return (
            <YStack flex={1} backgroundColor="#000" justifyContent="center" alignItems="center">
                <Text color="white" fontSize="$6">Not logged in!</Text>
            </YStack>
        );
    }

    const signOut = async () => {
        setLoading(true);
        
        const res = await supabase.auth.signOut();
        deleteSession();
        
        setLoading(false);
    }

    const getAll = async () => {
        setLoading(true);
        let { data: profiles, error } = await supabase
            .from('profiles')
            .select('*').single();

        console.log(`getAll result: ${JSON.stringify(profiles,null,2)}`);
        setLoading(false);
    }

    const updateUsername = async () => {
        setLoading(true);

        if(!session){
            console.log("session not available");
            return;
        }

        const res = await supabase.from("profiles").upsert({user_id:session.user.id,username:username},{onConflict: "user_id"}).select();
        console.log(`updateUsername result: ${JSON.stringify(res,null,2)}`);
        setLoading(false);
    }

    const getInitials = (email: string) => {
        if (!email) return "no initals";
        const parts = email.split('@')[0].split('.');
        if (parts.length >= 2) {
            return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
        }
        return email.substring(0, 2).toUpperCase();
    };

    const getDisplayName = (email: string) => {
        if (!email) return "no email";
        const parts = email.split('@')[0].split('.');
        if (parts.length >= 2) {
            const firstName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
            const lastName = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
            return `${firstName} ${lastName}`;
        }
        return email.split('@')[0];
    };

    return (
        <YStack flex={1} backgroundColor="#000" paddingTop={insets.top}>
            {/* Header */}
            <YStack 
                height={36} 
                justifyContent="center" 
                alignItems="center" 
                marginTop="$3"
                marginBottom="$5"
            >
                <Text 
                    color="white" 
                    fontSize="$9" 
                    fontWeight="800" 
                    letterSpacing={-0.3}
                >
                    Profil
                </Text>
            </YStack>

            {/* Profile Section */}
            <YStack 
                paddingHorizontal="$9" 
                paddingVertical="$3" 
                alignItems="center" 
                gap="$3.5"
                marginBottom="$6"
            >
                {/* Avatar */}
                <YStack 
                    width={96} 
                    height={96} 
                    borderRadius={48} 
                    backgroundColor="#E7ECFC" 
                    justifyContent="center" 
                    alignItems="center"
                >
                    <Text 
                        color="#1849D6" 
                        fontSize="$8" 
                        fontWeight="800" 
                        letterSpacing={-0.3}
                    >
                        {getInitials(session?.user?.email!)}
                    </Text>
                </YStack>

                {/* User Info */}
                <YStack gap="$1" alignItems="center">
                    <Text 
                        color="white" 
                        fontSize="$6" 
                        fontWeight="700" 
                        letterSpacing={-0.2} 
                        textAlign="center"
                    >
                        {getDisplayName(session?.user?.email!)}
                    </Text>
                    <Text 
                        color="white" 
                        fontSize="$4" 
                        fontWeight="400" 
                        textAlign="center"
                    >
                        {session?.user?.email}
                    </Text>
                </YStack>
            </YStack>

            <YStack paddingHorizontal="$6" gap="$3" flex={1}>
                <Button
                    backgroundColor="rgba(98, 239, 255, 0.1)"
                    borderColor="rgba(98, 239, 255, 0.3)"
                    borderWidth={1}
                    borderRadius="$3"
                    height="$5"
                    onPress={() => getAll()}
                    pressStyle={{ backgroundColor: "rgba(98, 239, 255, 0.2)" }}
                >
                    <Text color="white" fontSize="$4" fontWeight="500">
                        Get Profile Info
                    </Text>
                </Button>

                <XStack gap="$3">
                    <Input
                        flex={1}
                        backgroundColor="rgba(255,255,255,0.05)"
                        borderColor="rgba(98, 239, 255, 0.3)"
                        borderWidth={1}
                        borderRadius="$3"
                        color="white"
                        fontSize="$4"
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        onChangeText={(text) => setUsername(text)}
                        placeholder="Username"
                        value={username}
                    />
                    <Button
                        backgroundColor="#62EFFF"
                        borderRadius="$3"
                        paddingHorizontal="$4"
                        onPress={() => updateUsername()}
                        disabled={loading}
                        pressStyle={{ backgroundColor: "rgba(98, 239, 255, 0.8)" }}
                    >
                        <Text color="#000" fontSize="$4" fontWeight="500">
                            Update
                        </Text>
                    </Button>
                </XStack>

                <YStack marginTop="auto" paddingBottom={insets.bottom + 20}>
                    <Button
                        backgroundColor="rgba(255, 0, 0, 0.1)"
                        borderColor="rgba(255, 0, 0, 0.3)"
                        borderWidth={1}
                        borderRadius="$3"
                        height="$5"
                        onPress={() => signOut()}
                        disabled={loading}
                        pressStyle={{ backgroundColor: "rgba(255, 0, 0, 0.2)" }}
                    >
                        <Text color="rgba(255, 0, 0, 0.8)" fontSize="$4" fontWeight="500">
                            {loading ? "Signing out..." : "Sign Out"}
                        </Text>
                    </Button>
                </YStack>
            </YStack>
        </YStack>
    );
}

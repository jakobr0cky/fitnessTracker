import SplitList from "@/components/splitCollection/splitList";
import { useSplitStore } from "@/stores/splitStore";
import { useRouter } from "expo-router";
import { Button, View } from "tamagui";

export default function SplitCollection() {
    const router = useRouter();
    const splits = useSplitStore((state) => state.splits);

    const onCreateWorkoutsplit = () => {
        router.navigate("/(tabs)/creation/createSplit");
    }

    return (
        <View flex={1} backgroundColor="$color8">
            <SplitList splits={splits}></SplitList>
            <Button
                position="absolute"
                bottom={20}
                elevation={2}
                onPress={() => router.navigate("/(tabs)/creation/createSplit")}
                height={50}
                width={200}
                alignSelf="center"
            >Erstelle Split</Button>
        </View>
    )
}
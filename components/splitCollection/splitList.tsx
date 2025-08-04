import { WorkoutSplit } from "@/models/trainingModels";
import { FlatList } from "react-native";
import { Stack, Text, View, YStack } from "tamagui";

export default function SplitList(props: { splits: WorkoutSplit[] }) {

    const noSplits = () => {
          <Stack backgroundColor="$color3" height={40} justifyContent="center"
                alignItems="center" borderRadius={9}>
                <Text>Noch keine Splits vorhanden</Text>
            </Stack>
    }

    const renderItem = (split: WorkoutSplit) => {
        return (
            <Stack key={split.name} backgroundColor="$color3" height={40} justifyContent="center"
                alignItems="center" borderRadius={9}>
                <Text>{split.name}</Text>
            </Stack>
        );
    }

    const renderSeparator = () => {
        return (<View backgroundColor="$color8" height={1}></View>);
    }

    return (
        <YStack marginTop={40} backgroundColor="$color3" alignSelf="center" borderRadius={10} width={250}>
            {props.splits.length === 0 ? noSplits() :  <FlatList data={props.splits} ItemSeparatorComponent={renderSeparator} renderItem={({ item }) => renderItem(item)}></FlatList>}
        </YStack>
    );
}
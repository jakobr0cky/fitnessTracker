import { Workout } from "@/models/trainingModels";
import { FlatList } from "react-native";
import { Stack, Text, View, YStack } from "tamagui";

export default function WorkoutList(props: { workouts: Workout[] }) {

     const noWorkouts = () => {
          <Stack backgroundColor="$color3" height={40} justifyContent="center"
                alignItems="center" borderRadius={9}>
                <Text>Noch keine Workouts vorhanden</Text>
            </Stack>
    }

    const renderItem = (workout: Workout) => {
        return (
            <Stack key={workout.name} backgroundColor="$color3" height={40} justifyContent="center"
                alignItems="center" borderRadius={9}>
                <Text>{workout.name}</Text>
            </Stack>
        );
    }

    const renderSeparator = () => {
        return (<View backgroundColor="$color8" height={1}></View>);
    }

    return (
        <YStack marginTop={40} backgroundColor="$color3" alignSelf="center" borderRadius={10} width={250}>
            {props.workouts.length === 0 ? noWorkouts() :  <FlatList data={props.workouts} ItemSeparatorComponent={renderSeparator} renderItem={({ item }) => renderItem(item)}></FlatList>}
        </YStack>
    );
}
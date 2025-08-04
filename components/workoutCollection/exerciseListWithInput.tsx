import { Exercise } from "@/models/trainingModels";
import { FlatList } from "react-native";
import { Input, Text, View, XStack } from "tamagui";

export default function ExerciseListWithInput(props: { errorMessage: string, exercises: Exercise[], updateExerciseData: (exerciseId: string, numberOfSets?: number, restTimeInSeconds?: number) => void }) {

    const renderItem = (exercise: Exercise) => {
        return (
            <XStack gap="$2" flex={1} paddingLeft={30} paddingRight={30} alignItems="center">
                <Text marginRight="auto">{exercise.name}</Text>
                <XStack marginLeft="auto" gap="$1">
                    <Input keyboardType="numeric" width={60} size="$3" padding={8} borderWidth={2} onChangeText={(numberOfSets) => props.updateExerciseData(exercise.id, parseInt(numberOfSets), undefined)} placeholder="Sets"></Input>
                    <Input keyboardType="numeric" width={60} size="$3" padding={8} borderWidth={2} onChangeText={(restTimesInSeconds) => props.updateExerciseData(exercise.id, undefined, parseInt(restTimesInSeconds))} placeholder="Pause"></Input>
                </XStack>
            </XStack>
        );
    }

    const renderSeperator = () => {
        return <View alignSelf="center" marginTop={12} marginBottom={12} width={320} height={2} backgroundColor="$color6"></View>
    }

    return (
        <>
            <XStack marginTop={5} gap="$3" alignSelf="flex-end" marginRight={10}>
                <Text>Anzahl an Sets</Text>
                <Text>Pausenzeit in Sekunden</Text>
            </XStack>
            <View marginTop={5} maxHeight={props.errorMessage === "" ? 450 : 410}>
                <FlatList ItemSeparatorComponent={renderSeperator} keyExtractor={(item) => item.name} data={props.exercises} renderItem={(listItem) => renderItem(listItem.item)} />
            </View>
        </>
    );
}
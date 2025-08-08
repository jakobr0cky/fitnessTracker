import { NO_VALUE } from "@/app/runningWorkoutSession/[workoutSessionId]";
import { SessionExercise, WorkingSet } from "@/models/trainingModels";
import { useRef, useState } from "react";
import { TextInput } from "react-native";
import { Input, Text, XStack, YStack } from "tamagui";

export type WorkingSetViewProps = {
    sessionExercise: SessionExercise,
    set: WorkingSet,
    index: number,
    updateExerciseData: (
        exerciseName: string,
        setIndex: number,
        key: keyof WorkingSet,
        value: number
    ) => void,
    startTimer: (restTime: number) => void,
}

export default function WorkingSetView(props: WorkingSetViewProps) {
    const refInputWeight = useRef<TextInput>(null);
    const [hasUserFinishedInput, setHasUserFinishedInput] = useState(false);

    const handleOnEndInputReps = () => {
        if(hasUserFinishedInput) return;

        props.startTimer(props.sessionExercise.rest_time_in_seconds);

        if (refInputWeight && refInputWeight.current) {
            refInputWeight.current.focus();
        }

        setHasUserFinishedInput(true);
    }

    const handleOnEndEditingInputReps = () => {
        if(hasUserFinishedInput) return;

        props.startTimer(props.sessionExercise.rest_time_in_seconds);

        setHasUserFinishedInput(true);
    }

    const handleOnChangeText = (inputLabel: "reps" | "weight", text: string) => {
        const value = text === "" ? NO_VALUE : parseInt(text) || 0;
        props.updateExerciseData(props.sessionExercise.exercise_name, props.index, inputLabel, value);

        if(value === NO_VALUE) setHasUserFinishedInput(false);
    }

    return (
        <XStack
            key={props.index}
            paddingHorizontal="$4"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="$2"
        >
            <Text
                color="white"
                fontSize="$6"
                fontWeight="400"
                textAlign="center"
            >
                #{props.index + 1}
            </Text>

            <XStack gap="$4">
                <YStack
                    width={60}
                    height={40}
                    borderRadius="$2"
                    borderWidth={1}
                    borderColor="#62EFFF"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Input
                        color="white"
                        fontSize="$6"
                        fontWeight="400"
                        textAlign="center"
                        textAlignVertical="center"
                        width="100%"
                        height="100%"
                        borderWidth={0}
                        backgroundColor="transparent"
                        keyboardType="numeric"
                        placeholder=""
                        paddingVertical={0}
                        paddingHorizontal={0}
                        value={props.set.reps === NO_VALUE ? "" : props.set.reps.toString()}
                        onChangeText={(text) => handleOnChangeText("reps", text)}
                        onEndEditing={() => handleOnEndEditingInputReps()}
                        onSubmitEditing={() => handleOnEndInputReps()}
                    />
                </YStack>

                <YStack
                    width={60}
                    height={40}
                    borderRadius="$2"
                    borderWidth={1}
                    borderColor="#62EFFF"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Input
                        ref={refInputWeight}
                        color="white"
                        fontSize="$6"
                        fontWeight="400"
                        textAlign="center"
                        textAlignVertical="center"
                        width="100%"
                        height="100%"
                        borderWidth={0}
                        backgroundColor="transparent"
                        keyboardType="numeric"
                        placeholder=""
                        paddingVertical={0}
                        paddingHorizontal={0}
                        value={props.set.weight === NO_VALUE ? "" : props.set.weight.toString()}
                        onChangeText={(text) => handleOnChangeText("weight", text)}
                    />
                </YStack>
            </XStack>
        </XStack>
    );
}
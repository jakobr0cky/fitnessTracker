import { WorkoutExercise } from "@/app/runningWorkoutSession/[workoutSessionId]";
import React, { ReactNode } from "react";
import { H6, Input, Text, XStack, YStack } from "tamagui";

export default function ExerciseView(props: { exercise: WorkoutExercise, updateExerciseData: Function, startTimer: Function }) {

    const onRepsUpdate = (exerciseName: string, index: number, text: string) => {
        props.updateExerciseData(props.exercise.exercise_name, index, "reps", text)
        props.startTimer(props.exercise.rest_time_in_seconds);
    }

    const generateSet = (index: number) => {
        return (
            <XStack key={index} alignSelf="center" gap="$3">
                <Text fontWeight="bold" fontSize="$7" color="white" marginLeft={18} alignSelf="center">#{index + 1}</Text>
                <Input fontWeight="bold" fontSize="$6" color="white" width={50} padding={8} textAlign="center" marginLeft={15} keyboardType="numeric" onChangeText={(text) => onRepsUpdate(props.exercise.exercise_name, index, text)} placeholder="Reps"></Input>
                <Input fontWeight="bold" fontSize="$6" color="white" width={80} padding={8} textAlign="center" marginLeft={15} keyboardType="numeric" onChangeText={(text) => props.updateExerciseData(props.exercise.exercise_name, index, "weight", text)} placeholder="Weight"></Input>
            </XStack>
        );
    }

    const generateSets = (exercise: WorkoutExercise) => {
        if (!exercise.number_of_sets) return;

        let sets: ReactNode[] = [];
        for (let i = 0; i < exercise.number_of_sets; i++) {
            sets.push(generateSet(i));
        }
        return sets;
    }

    return (
        <YStack gap="$2">
            <H6 marginLeft={5} alignSelf="center">{props.exercise.exercise_name}</H6>
            <XStack alignSelf="center" gap="$6">
                <Text fontSize="$5">Set</Text>
                <Text fontSize="$5">Reps</Text>
                <Text fontSize="$5" marginLeft={12}>Weight</Text>
            </XStack>
            {generateSets(props.exercise)}
        </YStack>
    );
}

import WorkoutCreation from "@/components/workoutCollection/WorkoutCreation";
import { useWorkoutExerciseStore } from "@/stores/exerciseStore";
import { useEffect } from "react";
import { View } from "tamagui";

export default function CreateWorkout() {
    const chosenExercisesFromStore = useWorkoutExerciseStore((state) => state.chosenExercises);
    const clearChosenExercises = useWorkoutExerciseStore((state) => state.clearChosenExercises);

    useEffect(() => {
        return () => {
            clearChosenExercises();
        }
    }, []);

    return (
        <View flex={1} backgroundColor="black" paddingTop={10}>
            <WorkoutCreation selectedExercises={chosenExercisesFromStore}></WorkoutCreation>
        </View>
    );
}
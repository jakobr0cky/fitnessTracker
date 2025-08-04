import WorkoutCreation from "@/components/workoutCollection/WorkoutCreation";
import { useWorkoutExerciseStore } from "@/stores/exerciseStore";
import { useEffect } from "react";

export default function CreateWorkout() {
    const chosenExercisesFromStore = useWorkoutExerciseStore((state) => state.chosenExercises);
    const clearChosenExercises = useWorkoutExerciseStore((state) => state.clearChosenExercises);

    useEffect(() => {
        return () => {
            clearChosenExercises();
        }
    }, []);

    return (
        <WorkoutCreation selectedExercises={chosenExercisesFromStore}></WorkoutCreation>
    );
}
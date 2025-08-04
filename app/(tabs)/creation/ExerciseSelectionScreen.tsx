import ExerciseList from "@/components/workoutCollection/ExerciseList";
import { Exercise } from "@/models/trainingModels";
import { useWorkoutExerciseStore } from "@/stores/exerciseStore";
import { queryAllExercises } from "@/supabase/queries";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function ExerciseSelectionScreen() {
    
    const { data: allAvailableExercises } = useQuery({
        queryKey: ["allExercises"],
        queryFn: queryAllExercises
    });
    const router = useRouter();
    const setExercises = useWorkoutExerciseStore((state) => state.setChosenExercises);
    const clearChosenExercises = useWorkoutExerciseStore((state) => state.clearChosenExercises);
    const setChosenExercisesFromStore = useWorkoutExerciseStore((state) => state.setChosenExercises);

    useEffect(() => {
        return () => {
            clearChosenExercises();
        }
    }, []);

    const onAddExercises = (exercises: Exercise[]) => {
        setExercises(exercises);
        setChosenExercisesFromStore(exercises);
        router.navigate("/(tabs)/creation/createWorkout");
    }

    return (
        <ExerciseList onExercisesSelected={onAddExercises} exercises={allAvailableExercises}></ExerciseList>
    );
}
import { Exercise } from "@/models/trainingModels";
import { create } from "zustand";

type ExerciseStore = {
    chosenExercises: Exercise[],
    setChosenExercises: (exercises: Exercise[]) => void,
    clearChosenExercises: () => void,
}

export const useWorkoutExerciseStore = create<ExerciseStore>((set) => ({
    chosenExercises: [],
    clearChosenExercises: () => {
        set(() => ({
            chosenExercises: []
        }))
    },
    setChosenExercises(exercises){
        set(({
            chosenExercises: exercises
        }))
    }
}));
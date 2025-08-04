import { Workout } from "@/models/trainingModels";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface WorkoutStore{
    workouts: Workout[],
    addWorkout: (workout: Workout) => void,
    clearWorkouts: () => void,
}

export const useWorkoutStore = create<WorkoutStore>()(
    persist(
        (set) => ({
            workouts: [],
            addWorkout(workout){
                set((state) => ({
                    workouts: [...state.workouts, workout]
                }))
            },
            clearWorkouts() {
                set(() => ({
                    workouts: []
                }))
            },
        }),
        {
            name: "workout-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
)
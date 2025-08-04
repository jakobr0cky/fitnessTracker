import { WorkoutSplit } from "@/models/trainingModels";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SplitStore {
    splits: WorkoutSplit[],
    addSplit: (workoutSplit: WorkoutSplit) => void,
    clear: () => void,
}

export const useSplitStore = create<SplitStore>()(
    persist(
        (set) => ({
            selectedWorkouts: [],
            splits: [],
            addSplit(workoutSplit) {
                set((state) => ({
                    splits: [...state.splits, workoutSplit]
                }))
            },
            clear(){
                set((state) => ({
                    splits:[]
                }))
            }
        }), 
        ({
            name: "SplitStorage",
            storage: createJSONStorage(() => AsyncStorage),
        })
    ))
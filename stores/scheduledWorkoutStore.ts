import { ScheduledWorkout } from "@/models/trainingModels";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ScheduledWorkoutStore {
    currentScheduledWorkout: ScheduledWorkout | undefined,
    scheduledWorkoutsMap: { [key: string]: ScheduledWorkout[] },
    scheduledWorkouts: ScheduledWorkout[],
    addScheduledWorkout: (workout: ScheduledWorkout) => void,
    clear: () => void,
    setCurrentScheduledWorkout: (workout: ScheduledWorkout) => void,
    updateScheduledWorkout: (workout: ScheduledWorkout) => void,
    getWorkoutsFromDay: (year: number, day: number) => ScheduledWorkout[],
    getWorkoutsFromYearInMonth: (year: string, month: string) => ScheduledWorkout[],
}

export const useScheduledWorkoutStore = create<ScheduledWorkoutStore>()(
    persist(
        (set, get) => ({
            currentScheduledWorkout: undefined,
            scheduledWorkoutsMap: {},
            scheduledWorkouts: [],
            addScheduledWorkout(workout) {
                if (!workout.scheduledTime) return;

                const year = workout.scheduledTime.getFullYear();
                const month = workout.scheduledTime.getMonth() + 1;
                const key = year.toString() + month.toString();

                set((state) => {
                    const entries = Object.entries(state.scheduledWorkoutsMap);
                    const entry = entries.find(entry => entry[0] === key);
                    let map = { ...state.scheduledWorkoutsMap };

                    if (!entry) {
                        map[key] = [workout]
                    } else {
                        map[key] = [...map[key], workout]
                    }

                    return {
                        scheduledWorkoutsMap: map,
                        scheduledWorkouts: [...state.scheduledWorkouts, workout],
                    }
                })
            },
            getWorkoutsFromYearInMonth(year, month) {
                return get().scheduledWorkoutsMap[(year + month)];
            },
            setCurrentScheduledWorkout(workout) {
                set((state) => ({
                    currentScheduledWorkout: workout
                }))
            },
            updateScheduledWorkout(workout) {
                if (!workout.scheduledTime) return;

                const scheduledTime = new Date(workout.scheduledTime!);

                const year = scheduledTime.getFullYear();
                const month = scheduledTime.getMonth() + 1;
                const key = year.toString() + month.toString();
                set((state) => {
                    const newWorkouts = state.scheduledWorkouts.map((item) => item.scheduledTime === workout.scheduledTime ? workout : item)

                    const oldList = state.scheduledWorkoutsMap[key];
                    const newList = oldList.map((item) => item.scheduledTime === workout.scheduledTime ? workout : item);

                    return {
                        scheduledWorkouts: newWorkouts,
                        scheduledWorkoutsMap: {
                            ...state.scheduledWorkoutsMap,
                            [key]: newList,
                        }
                    }
                })
            },
            getWorkoutsFromDay(year, day) {
                const res = get().scheduledWorkouts.filter((item) => {
                    const date = new Date(item.scheduledTime!);
                    return date.getFullYear() == year && date.getDate() == day;
                });
                return res;
            },
            clear() {
                set((state) => ({
                    scheduledWorkouts: [],
                    scheduledWorkoutsMap: {}
                }))
            }
        }),
        {
            name: "scheduledworkout-storage",
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
)
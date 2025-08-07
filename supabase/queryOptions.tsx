import { queryOptions } from "@tanstack/react-query";
import { getAllExercises, getExerciseDataByName } from "./queries";


export function getExerciseDataByNameQueryOptions(exerciseName: string) {
    return queryOptions({
        queryKey: ["getExerciseDataByName",exerciseName],
        queryFn: () => getExerciseDataByName(exerciseName)
    })
}

export function getAllExercisesQueryOptions() {
    return queryOptions({
        queryKey: ["getAllExercises"],
        queryFn: () => getAllExercises()
    })
}
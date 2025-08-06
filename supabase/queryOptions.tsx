import { queryOptions } from "@tanstack/react-query";
import { getExerciseDataByName } from "./queries";


export function getExerciseDataByNameQueryOptions(exerciseName: string) {
    return queryOptions({
        queryKey: ["getExerciseDataByName"],
        queryFn: () => getExerciseDataByName(exerciseName)
    })
}
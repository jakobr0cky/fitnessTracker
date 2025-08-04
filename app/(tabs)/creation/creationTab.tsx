import WorkoutListScreen from "@/components/workoutCollection/WorkoutListScreen";
import { queryWorkoutsWithExerciseDetails } from "@/supabase/queries";
import { useQuery } from "@tanstack/react-query";

export default function creationTab() {
    const { data: workouts } = useQuery({
        queryKey: ["exerciseDetails"],
        queryFn: queryWorkoutsWithExerciseDetails
    })

    console.log(`data: ${JSON.stringify(workouts,null,2)}`)

    return (
        <WorkoutListScreen workouts={workouts ?? []}></WorkoutListScreen>
    );
}
import WorkoutListScreen from "@/components/workoutCollection/WorkoutListScreen";
import { queryAllWorkoutsFromCurrentUser } from "@/supabase/queries";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function WorkoutCollection() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const { data: workouts } = useQuery({
        queryKey: ["queryAllWorkouts"],
        queryFn: queryAllWorkoutsFromCurrentUser
    })

    return (
        <WorkoutListScreen workouts={workouts ?? []} />
    );
}

import WorkoutListScreen from "@/components/workoutCollection/WorkoutListScreen";
import { queryWorkoutsWithExerciseDetails } from "@/supabase/queries";
import { useQuery } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { View } from "tamagui";

export default function creationTab() {
    const { data: workouts } = useQuery({
        queryKey: ["exerciseDetails"],
        queryFn: queryWorkoutsWithExerciseDetails
    })
    console.log(`data: ${JSON.stringify(workouts, null, 2)}`)

     useFocusEffect(
        useCallback(() => {
            console.log('Creation Tab is focused');
            return () => {
                console.log('Creation Tab lost focus');
            };
        }, [])
    );

    return (
        <View flex={1} backgroundColor="black" paddingTop={20}>
            <WorkoutListScreen workouts={workouts ?? []}></WorkoutListScreen>
        </View>
    );
}
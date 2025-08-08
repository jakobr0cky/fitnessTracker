import CustomCalendar from "@/components/scheduleTab/customCalender";
import ExpandableButton from "@/components/scheduleTab/expandableButton";
import WorkoutCardList from "@/components/scheduleTab/workoutCardList";
import { ScheduledWorkout, Workout } from "@/models/trainingModels";
import { useScheduledWorkoutStore } from "@/stores/scheduledWorkoutStore";
import { insertWorkoutSession } from "@/supabase/mutations";
import { queryWorkoutsFromCurrentMonth, queryWorkoutsFromDate } from "@/supabase/queries";
import { supabase } from "@/supabase/supabase";
import { config } from "@/tamagui.config";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, YStack } from "tamagui";

export default function ScheduleScreen() {
    const lighAccent = config.themes.light_accent;
    const insets = useSafeAreaInsets();

    const [showButtonGroup, setShowButtonGroup] = useState(false);
    const [showWorkoutListModal, setShowWorkoutListModal] = useState(false);
    const [selectedDay, setSelectedDay] = useState<Date>(new Date());
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    const scheduledWorkouts = useScheduledWorkoutStore((state) => state.scheduledWorkouts);
    const addScheduledWorkout = useScheduledWorkoutStore((state) => state.addScheduledWorkout);
    const getWorkoutsFromYearInMonth = useScheduledWorkoutStore((state) => state.getWorkoutsFromYearInMonth);

    const { mutateAsync: insertWorkoutSessionMutationAsync, isSuccess } = useMutation({
        mutationKey: ["insertWorkoutSessionMutationAsync"],
        mutationFn: insertWorkoutSession
    })

    const { data: allWorkoutsFromSelectedDay } = useQuery({
        queryKey: ["queryWorkoutsFromDate", selectedDay, isSuccess],
        queryFn: async () => queryWorkoutsFromDate(new Date(selectedDay)),
        enabled: !!selectedDay
    })

    const { data: allWorkoutsFromCurrentMonth } = useQuery({
        queryKey: ["queryWorkoutsFromCurrentMonth", currentDate, isSuccess],
        queryFn: async () => queryWorkoutsFromCurrentMonth(new Date(currentDate)),
        enabled: !!currentDate
    })

    const onModalListItemPressed = async (workout: Workout) => {
        const selectedDayObject = new Date(selectedDay);

        const scheduledTime = new Date(Date.UTC(selectedDayObject.getUTCFullYear(),
            selectedDayObject.getUTCMonth(),
            selectedDayObject.getUTCDate())
        );

        console.log("schedule", JSON.stringify(scheduledTime.toISOString(), null, 2))
        console.log("selectedDayObject", JSON.stringify(selectedDayObject.toISOString(), null, 2))

        const scheduledWorkout: ScheduledWorkout = { workout: workout, status: "toBeDone", scheduledTime: scheduledTime };
        try {
            const res = await insertWorkoutSessionMutationAsync({ workoutId: workout.id, scheduled_at: scheduledTime });
            console.log(`res: ${JSON.stringify(res, null, 2)}`);

            const workoutExercises = await supabase.from("workout_exercises").select("id").eq("workout_id", workout.id);

            if (!workoutExercises.data) {
                console.log("es gibt keine workoutExercises");
                return;
            }

            for (let i = 0; i < workoutExercises.data.length; i++) {
                const sessionExerciseRes = await supabase.from("session_exercises").insert({
                    workout_session_id: res.id,
                    workout_exercise_id: workoutExercises.data[i].id
                }).select();

                console.log(`successfully inserted session_exerice: ${JSON.stringify(sessionExerciseRes, null, 2)}`);
            }
        }
        catch (error) {
            console.log(`error while insertWorkoutSessionMutationAsync: ${JSON.stringify(error, null, 2)}`);
        }

        addScheduledWorkout(scheduledWorkout);
        setShowWorkoutListModal(false);
        setShowButtonGroup(false);
    };

    const marked = useCallback(() => {
        const selectedDayObject = new Date(selectedDay);
        const selectedDayDateString = new Date(selectedDayObject.getTime() - selectedDayObject.getTimezoneOffset() * 60000).toISOString().split("T")[0];

        let markedDates: { [key: string]: any } = {};
        const selectedMarking = {
            customStyles: {
                container: {
                    backgroundColor: "#62EFFF",
                    borderRadius: 30,
                },
                text: {
                    color: 'black',
                    fontWeight: "bold"
                }
            }
        };
        markedDates[selectedDayDateString] = selectedMarking;

        if (!allWorkoutsFromCurrentMonth) return markedDates;

        for (let i = 0; i < allWorkoutsFromCurrentMonth.length; i++) {
            const scheduledTime = new Date(allWorkoutsFromCurrentMonth[i].scheduled_at);
            const scheduledTimeDateString = new Date(scheduledTime.getTime() - scheduledTime.getTimezoneOffset() * 60000).toISOString().split("T")[0];

            let marking = {
                marked: true,
                dotColor: allWorkoutsFromCurrentMonth[i].status === "completed" ? "#4bfa44ff" : "#62EFFF"
            };

            if (selectedDayDateString === scheduledTimeDateString) marking = { ...marking, ...selectedMarking };

            markedDates[scheduledTimeDateString] = marking;
        }

        return markedDates;
    }, [selectedDay, allWorkoutsFromCurrentMonth]);

    return (
        <View flex={1}>
            <YStack paddingHorizontal="$3" marginBottom="$3" paddingTop={40}>
                <CustomCalendar
                    currentDate={currentDate}
                    setCurrentDate={setCurrentDate}
                    markedDates={marked()}
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                />
            </YStack>

            <YStack flex={1} paddingHorizontal="$3">
                <WorkoutCardList
                    selectedDay={selectedDay}
                    updateWorkouts={() => { }}
                    workouts={allWorkoutsFromSelectedDay ?? []}
                />
            </YStack>

            <YStack paddingBottom={insets.bottom}>
                <ExpandableButton
                    onModalListItemPressed={onModalListItemPressed}
                    showButtonGroup={showButtonGroup}
                    setShowButtonGroup={setShowButtonGroup}
                    showWorkoutListModal={showWorkoutListModal}
                    setShowWorkoutListModal={setShowWorkoutListModal}
                />
            </YStack>
        </View>
    );
}

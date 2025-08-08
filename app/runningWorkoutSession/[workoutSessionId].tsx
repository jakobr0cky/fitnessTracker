import WorkingSetView from "@/components/startWorkout/WorkingSetView";
import { SessionExercise, WorkingSet } from "@/models/trainingModels";
import { updateWorkoutSession, upsertWorkingSets } from "@/supabase/mutations";
import { queryWorkoutSessionExercisesInfo } from "@/supabase/queries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Pressable, ScrollView } from "react-native";
import { CountdownCircleTimer, TimeProps } from 'react-native-countdown-circle-timer';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { Text, useTheme, XStack, YStack } from "tamagui";

export const NO_VALUE: number = 99999;

const BackIcon = (props: { color: string }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
            d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z"
            fill={props.color}
        />
    </Svg>
);

export default function RunningWorkoutSessionScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const theme = useTheme();
    const { workoutSessionId, workoutName } = useLocalSearchParams();

    const { data: queryWorkoutSessionExercisesInfoData } = useQuery({
        queryKey: ["queryWorkoutSessionExercisesInfo"],
        queryFn: async () => queryWorkoutSessionExercisesInfo(workoutSessionId as string),
        enabled: !!workoutSessionId
    });

    const { mutateAsync: updateWorkoutSessionMutationAsync } = useMutation({
        mutationKey: ["updateWorkoutSessionMutationAsync"],
        mutationFn: updateWorkoutSession
    })

    const { mutateAsync: upsertWorkingSetsMutationAsync } = useMutation({
        mutationKey: ["upsertWorkingSetsMutationAsync"],
        mutationFn: upsertWorkingSets
    })

    const [timerRunning, setTimerRunning] = useState(false);
    const [restTime, setRestTime] = useState(60);
    const [resetTimer, setResetTimer] = useState(0);
    const [exercisesData, setExercisesData] = useState<SessionExercise[]>();
    let startTime = useRef<Date>(new Date());

    useEffect(() => {
        setExercisesData(init())
        return () => setExercisesData([]);
    }, [workoutSessionId, queryWorkoutSessionExercisesInfoData]);

    if (!workoutSessionId || !queryWorkoutSessionExercisesInfoData || !exercisesData) {
        return (
            <YStack flex={1} backgroundColor="#000" justifyContent="center" alignItems="center">
                <Text color="white" fontSize="$6">Loading WorkoutSession</Text>
            </YStack>
        );
    }

    function init() {
        if (!queryWorkoutSessionExercisesInfoData) return [];

        let exerciseData = [];
        for (let i = 0; i < queryWorkoutSessionExercisesInfoData.length; i++) {
            let exerciseInfo: SessionExercise = {
                session_exercise_id: queryWorkoutSessionExercisesInfoData[i].session_exercise_id,
                exercise_name: queryWorkoutSessionExercisesInfoData[i].exercise_name,
                number_of_sets: queryWorkoutSessionExercisesInfoData[i].number_of_sets,
                rest_time_in_seconds: queryWorkoutSessionExercisesInfoData[i].rest_time_in_seconds,
                working_sets: []
            };

            for (let k = 0; k < queryWorkoutSessionExercisesInfoData[i].number_of_sets; k++) {
                exerciseInfo.working_sets.push({ index: k, reps: NO_VALUE, weight: NO_VALUE });
            }
            exerciseData.push(exerciseInfo);
        }
        return exerciseData;
    }

    const updateExerciseData = (
        exerciseName: string,
        setIndex: number,
        key: keyof WorkingSet,
        value: number
    ) => {
        if (value.toString() === "") value = NO_VALUE;

        const newExerciseData = [...exercisesData];
        const exerciseIndex = newExerciseData.findIndex((item) => item.exercise_name === exerciseName);

        newExerciseData[exerciseIndex] = {
            ...newExerciseData[exerciseIndex],
            working_sets: newExerciseData[exerciseIndex].working_sets.map((set, index) =>
                index === setIndex ? { ...set, [key]: value } : set
            )
        }
        setExercisesData(newExerciseData);
    };

    const startTimer = (restTime: number) => {
        setRestTime(restTime);
        setResetTimer(resetTimer + 1)
        setTimerRunning(true);
    }

    const asyncAlert = async (): Promise<boolean> => {
        return await new Promise((resolve) => Alert.alert(
            "Bist du wirklich fertig?",
            "Du hast nicht alle Übungen ausgefüllt! Möchtest du das Workout trotzdem beenden? Unvollständige Sets werden gelöscht!",
            [
                {
                    text: "Doch nicht fertig",
                    onPress: () => resolve(false)
                },
                {
                    text: "Fertig",
                    onPress: () => resolve(true)
                }
            ]
        ))
    }

    const validateInput = (): boolean => {
        if (!exercisesData) return false;

        for (let i = 0; i < exercisesData.length; i++) {
            for (let item of exercisesData[i].working_sets) {
                if (item.reps === NO_VALUE || item.weight === NO_VALUE) {
                    return false;
                }
            }
        }
        return true;
    }

    const onEndWorkout = async () => {
        const isValid = validateInput();
        let copiedExerciseData = exercisesData.map((item) => item);

        let continueAltoughWorkoutNotCompleted;
        if (!isValid) {
            continueAltoughWorkoutNotCompleted = await asyncAlert();
        }

        if (!continueAltoughWorkoutNotCompleted) return;

        copiedExerciseData = exercisesData.map((exercise) => ({
            ...exercise,
            working_sets: exercise.working_sets.filter((set) => set.reps !== NO_VALUE && set.weight !== NO_VALUE)
        }))


        try {
            await updateWorkoutSessionMutationAsync({
                workout_session_id: workoutSessionId as string,
                started_at: startTime.current,
                ended_at: new Date(),
                status: "completed"
            });
        } catch (error) {
            console.log(`error while updateWorkoutSessionMutationAsync: ${JSON.stringify(error, null, 2)}`)
        }

        let workingSetsWithExerciseId = [];
        for (let i = 0; i < copiedExerciseData.length; i++) {
            for (let k = 0; k < copiedExerciseData[i].working_sets.length; k++) {
                workingSetsWithExerciseId.push({
                    index: copiedExerciseData[i].working_sets[k].index,
                    reps: copiedExerciseData[i].working_sets[k].reps,
                    weight: copiedExerciseData[i].working_sets[k].weight,
                    session_exercise_id: copiedExerciseData[i].session_exercise_id
                })
            }
        }

        try {
            await upsertWorkingSetsMutationAsync({ workingSets: workingSetsWithExerciseId })
        } catch (error) {
            console.log(`error while upsertWorkingSetsMutationAsync: ${JSON.stringify(error, null, 2)}`);
        }

        router.back();
    }

    const timerView = (props: TimeProps) => {
        const minutes = Math.floor(props.remainingTime / 60);
        const seconds = props.remainingTime % 60;
        const time = `${minutes > 0 ? minutes.toString().padStart(2, "0") + ":" : ""}${seconds.toString().padStart(2, "0")}`
        return (
            <Text fontSize="$6" color="#00C2FF" fontWeight="300">{time}</Text>
        );
    }

    return (
        <YStack flex={1} backgroundColor="#000">
            <XStack
                width="100%"
                paddingHorizontal="$5"
                paddingVertical="$4"
                justifyContent="space-between"
                alignItems="center"
                marginTop={insets.top + 7}
            >
                <Pressable onPress={() => router.back()}>
                    <YStack
                        width={40}
                        height={40}
                        borderRadius={20}
                        backgroundColor="rgba(91, 91, 91, 0.50)"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <BackIcon color={theme.color1?.val} />
                    </YStack>
                </Pressable>

                <Text
                    color="white"
                    fontSize="$6"
                    fontWeight="400"
                    textAlign="center"
                    flex={1}
                    marginHorizontal="$3"
                >
                    {workoutName as string}
                </Text>

                <Pressable onPress={onEndWorkout}>
                    <YStack
                        width={40}
                        height={40}
                        borderRadius={20}
                        backgroundColor="rgba(91, 91, 91, 0.50)"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Text color="#62EFFF" fontSize="$6">✓</Text>
                    </YStack>
                </Pressable>
            </XStack>

            <ScrollView style={{ flex: 1 }}>
                <YStack paddingHorizontal="$3" gap="$3" marginTop="$3">
                    {exercisesData.map((exercise, exerciseIndex) => (
                        <YStack key={exercise.exercise_name} gap="$3">
                            <Text
                                color="white"
                                fontSize="$6"
                                fontWeight="400"
                                textAlign="center"
                                marginTop="$2"
                            >
                                {exercise.exercise_name}
                            </Text>

                            <XStack
                                paddingHorizontal="$4"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <YStack />

                                <XStack gap="$4">
                                    <Text
                                        color="rgba(255, 255, 255, 0.70)"
                                        fontSize="$3"
                                        fontWeight="400"
                                        width={60}
                                        textAlign="center"
                                    >
                                        Wdh.
                                    </Text>
                                    <Text
                                        color="rgba(255, 255, 255, 0.70)"
                                        fontSize="$3"
                                        fontWeight="400"
                                        width={60}
                                        textAlign="center"
                                    >
                                        Gewicht
                                    </Text>
                                </XStack>
                            </XStack>

                            {exercise.working_sets.map((set, setIndex) => <WorkingSetView 
                            sessionExercise={exercise}
                            set={set}
                            index={setIndex}
                            updateExerciseData={updateExerciseData}
                            startTimer={startTimer}
                            />)}
                        </YStack>
                    ))}
                </YStack>
            </ScrollView>

            {/* Timer at Bottom */}
            <YStack
                justifyContent="center"
                alignItems="center"
                paddingBottom={insets.bottom + 20}
                marginTop="$4"
            >
                <CountdownCircleTimer
                    key={resetTimer}
                    isPlaying={timerRunning}
                    duration={restTime}
                    colors={['#D3D3D3', '#D3D3D3', '#D3D3D3', '#D3D3D3']}
                    colorsTime={[restTime, restTime * 0.5, restTime * 0.25, 0]}
                    size={124}
                    strokeWidth={2}
                    trailColor="#3E3E3E"
                    onComplete={() => {
                        setTimerRunning(false);
                        return { shouldRepeat: false };
                    }}
                    isSmoothColorTransition={true}
                >
                    {(props) => timerView(props)}
                </CountdownCircleTimer>
            </YStack>
        </YStack>
    );
}

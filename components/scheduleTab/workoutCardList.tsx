import { useScheduledWorkoutStore } from "@/stores/scheduledWorkoutStore";
import { WorkoutSessionInfo } from "@/supabase/queries";
import { useRouter } from "expo-router";
import { FlatList, TouchableOpacity } from "react-native";
import { Card, H3, Text, View, XStack } from "tamagui";


export default function WorkoutCardList(props: { workouts: WorkoutSessionInfo[], selectedDay: Date, updateWorkouts: Function }) {

    const clear = useScheduledWorkoutStore((state) => state.clear);
    const setCurrentWorkout = useScheduledWorkoutStore((state) => state.setCurrentScheduledWorkout);
    const router = useRouter();

    const startWorkoutSession = (workoutSession: WorkoutSessionInfo) => {
        router.navigate({
            pathname:"/runningWorkoutSession/[workoutSessionId]",
            params: {
                workoutSessionId: workoutSession.workout_session_id,
                workoutId: workoutSession.workout_id,
                workoutName: workoutSession.workout_name,
            }
        });
    }

    const formateDate = (date: Date) => {
        const generatedDate = new Date(date);

        const day = generatedDate.getDate();
        const month = generatedDate.getMonth();
        const year = generatedDate.getFullYear();
        const hours = generatedDate.getHours().toString().padStart(2, "0");
        const minutes = generatedDate.getMinutes().toString().padStart(2, "0");
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }

    const isWorkoutDone = (workoutSession: WorkoutSessionInfo) => {
        return workoutSession.status === "completed";
    }

    const getDurationOfWorkout = (start: Date, end: Date) => {
        const startedAt = new Date(start);
        const endedAt = new Date(end);
        const durationHours = endedAt.getHours() - startedAt.getHours();
        const durationMinutes = endedAt.getMinutes() - startedAt.getMinutes();
        return `${durationHours.toString().padStart(2, "0")}:${durationMinutes.toString().padStart(2, "0")}`;
    }

    const startTimeEndTimePretty = (session: WorkoutSessionInfo) => {
        const startedAt = new Date(session.started_at);
        const endedAt = new Date(session.ended_at);

        return `${startedAt.getHours().toString().padStart(2,"0")}:${startedAt.getMinutes().toString().padStart(2,"0")}-${endedAt.getHours().toString().padStart(2,"0")}:${endedAt.getMinutes().toString().padStart(2,"0")}`;
    }

    const prettyTimeFormat = (start:Date,end:Date) => {
        return (
            <XStack gap="$3">
                {/* <Text>{startTimeEndTimePretty(start,end)}</Text> */}
                <Text>{getDurationOfWorkout(start,end)}</Text>
            </XStack>
        );
    }

    const renderWorkoutCard = (workoutSession: WorkoutSessionInfo) => {
        return (
            <TouchableOpacity onLongPress={() => console.log(JSON.stringify(workoutSession))} onPress={() => startWorkoutSession(workoutSession)}>
                <Card
                    backgroundColor="rgba(255,255,255,0.05)"
                    borderColor="rgba(98, 239, 255, 0.3)"
                    borderWidth={1}
                    borderRadius="$3"
                    margin="$2"
                    padding="$3"
                >
                    <Card.Header alignSelf="center" paddingBottom="$2">
                        <H3 color="white" fontSize="$6" fontWeight="400">{workoutSession.workout_name}</H3>
                    </Card.Header>
                    <Card.Footer padding="$0">
                        <View flex={1} flexDirection="row" justifyContent="space-between" alignItems="center">
                            <XStack borderRadius="$2" padding="$2">
                                {isWorkoutDone(workoutSession) ?
                                    <XStack gap="$3">
                                        <Text color="rgba(255,255,255,0.7)" fontSize="$4">{startTimeEndTimePretty(workoutSession)}</Text>
                                        <Text color="rgba(255,255,255,0.7)" fontSize="$4">{getDurationOfWorkout(new Date(workoutSession.started_at),new Date(workoutSession.ended_at))}</Text>
                                    </XStack>
                                    : <Text color="rgba(255,255,255,0.7)" fontSize="$4">Geplant am {formateDate(new Date(workoutSession.scheduled_at))}</Text>
                                }
                            </XStack>
                            <XStack
                                borderRadius="$2"
                                padding="$2"
                                paddingHorizontal="$3"
                                backgroundColor={isWorkoutDone(workoutSession) ? "#62EFFF" : "rgba(255,255,255,0.1)"}
                            >
                                <Text
                                    color={isWorkoutDone(workoutSession) ? "#000" : "rgba(255,255,255,0.7)"}
                                    fontSize="$3"
                                    fontWeight="500"
                                >
                                    {isWorkoutDone(workoutSession) ? "erledigt" : "geplant"}
                                </Text>
                            </XStack>
                        </View>
                    </Card.Footer>
                </Card>
            </TouchableOpacity>
        );
    }

    const renderSeperator = () => {
        return <View style={{ height: 5 }}></View>
    }

    return (
        <View style={{ flex: 1 }}>
            <View marginBottom={10}>
                <FlatList ItemSeparatorComponent={() => renderSeperator()} data={props.workouts} renderItem={(item) => renderWorkoutCard(item.item)}></FlatList>
            </View>
        </View>
    );
}

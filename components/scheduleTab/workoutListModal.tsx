import { Workout } from "@/models/trainingModels";
import { useWorkoutStore } from "@/stores/workoutStore";
import { queryAllWorkoutsFromCurrentUser } from "@/supabase/queries";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FlatList, Modal, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Text, View } from "tamagui";

export default function WorkoutListModal(props: { show: boolean, setShow: Function, addWorkoutToSelectedDay: Function }) {
    const { data: workouts } = useQuery({
        queryKey: ["queryAllWorkouts"],
        queryFn: queryAllWorkoutsFromCurrentUser
    })
    const workoutsToSelectFrom = useWorkoutStore((state) => state.workouts);
    const [showList, setShowList] = useState(false);

    const renderItem = (index: number, workout: Workout) => {
        // return (
        //     <Pressable onPress={() => {props.addWorkoutToSelectedDay(workout);console.log("hallo")}}>
        //         <View
        //             height={60}
        //             justifyContent="center"
        //             alignItems="center"
        //             paddingHorizontal="$4"
        //             backgroundColor="transparent"
        //             pressStyle={{ backgroundColor: "rgba(98, 239, 255, 0.1)" }}
        //         >
        //             <Text color="white" fontSize="$5" fontWeight="400">{workout.name}</Text>
        //         </View>
        //     </Pressable>
        // );
        return (
            <TouchableOpacity
                onPress={() => {
                    props.addWorkoutToSelectedDay(workout);
                }}
                activeOpacity={0.7}
            >
                <View
                    height={60}
                    justifyContent="center"
                    alignItems="center"
                    paddingHorizontal="$4"
                    backgroundColor="transparent"
                >
                    <Text color="white" fontSize="$5" fontWeight="400">{workout.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    const renderSeperator = () => {
        return <View height={1} borderBottomWidth={1} borderBottomColor="rgba(98, 239, 255, 0.3)"></View>
    }

    return (
        <View marginTop={5} alignSelf="center" width={200} maxHeight={400}>
            <Modal visible={props.show} transparent={true}>
                <TouchableWithoutFeedback onPress={() => props.setShow(false)}>
                    <View backgroundColor="rgba(0, 0, 0, 0.7)" flex={1}>
                        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                            <View
                                backgroundColor="rgba(0, 0, 0, 0.95)"
                                marginTop={100}
                                marginHorizontal="$6"
                                maxHeight={520}
                                borderRadius="$4"
                                borderWidth={1}
                                borderColor="rgba(98, 239, 255, 0.3)"
                            >
                                {props.show ? <FlatList
                                    ItemSeparatorComponent={renderSeperator}
                                    data={workouts}
                                    nestedScrollEnabled={true}
                                    renderItem={({ index, item }) => renderItem(index, item)}
                                    style={{
                                        borderRadius: 12,
                                    }}></FlatList> : <></>}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}

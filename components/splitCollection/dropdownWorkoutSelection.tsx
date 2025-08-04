import { Workout } from "@/models/trainingModels";
import { useWorkoutStore } from "@/stores/workoutStore";
import { useState } from "react";
import { FlatList, Modal, TouchableWithoutFeedback } from "react-native";
import { Select, Text, View } from "tamagui";

export default function DropdownWorkoutSelection(props: { selectedWorkout: Workout | null, addWorkoutToSelection: Function, index: number }) {
    const workoutsToSelectFrom = useWorkoutStore((state) => state.workouts);
    const [showList, setShowList] = useState(false);

    const renderItem = (index: number, workout: Workout) => {
        return (
            <Select.Item justifyContent="center"
                key={index}
                index={index}
                value={workout.name}>
                <Select.ItemText>
                    <Text>{workout.name}</Text>
                </Select.ItemText>
            </Select.Item>
        );
    }

    const renderSeperator = () => {
        return <View height={1} borderBottomWidth={2} borderBottomColor="$color5"></View>
    }

    const update = (text: string) => {
        props.addWorkoutToSelection(props.index, workoutsToSelectFrom.find((w) => w.name === text));
    }

    return (
        <View marginTop={5} alignSelf="center" width={200} maxHeight={400}>
            <Select value={props.selectedWorkout ? props.selectedWorkout.name : ""} onValueChange={(text) => update(text)} open={showList} onOpenChange={setShowList}>
                <Select.Trigger justifyContent="center">
                    <Select.Value placeholder="<Wähle ein Workout>" />
                </Select.Trigger>

                <Select.Content>
                    <Modal visible={showList} transparent={true}>
                        <TouchableWithoutFeedback onPress={() => setShowList(false)}>
                            <View backgroundColor="rgba(0, 0, 0, 0.3)" flex={1}>
                                <TouchableWithoutFeedback>
                                    <View backgroundColor="$color8" marginTop={100} marginRight={100} marginLeft={100} maxHeight={520} borderRadius={9}>
                                        {showList ? <FlatList
                                            ItemSeparatorComponent={renderSeperator}
                                            data={workoutsToSelectFrom}
                                            nestedScrollEnabled={true}
                                            renderItem={({ index, item }) => renderItem(index, item)}
                                            style={{
                                                borderRadius: 9,
                                            }}></FlatList> : <></>}
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </Select.Content>
            </Select>
        </View>
    );
}
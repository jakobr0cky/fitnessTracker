import WorkoutListModal from "@/components/scheduleTab/workoutListModal";
import { Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { YStack, Button } from "tamagui";

export default function ExpandableButton(props: {onModalListItemPressed: Function, showButtonGroup: boolean, setShowButtonGroup: Function, showWorkoutListModal: boolean, setShowWorkoutListModal: Function }) {

    const onAddWorkoutButtonPressed = () => {
        props.setShowWorkoutListModal(true);
    }

    const size = 55;
    const subSize = size - 8;

    const subButtons = () => {
        return (
            <YStack gap="$3" alignItems="center">
                <Button
                    width={subSize}
                    height={subSize}
                    backgroundColor="#62EFFF"
                    borderRadius={subSize / 2}
                    alignItems="center"
                    justifyContent="center"
                    borderWidth={0}
                    padding={0}
                    pressStyle={{ backgroundColor: "rgba(98, 239, 255, 0.8)" }}
                >
                    <MaterialCommunityIcons size={24} name="clock-edit-outline" color="#000" />
                </Button>
                <Button
                    onPress={() => onAddWorkoutButtonPressed()}
                    width={subSize}
                    height={subSize}
                    backgroundColor="#62EFFF"
                    borderRadius={subSize / 2}
                    alignItems="center"
                    justifyContent="center"
                    borderWidth={0}
                    padding={0}
                    pressStyle={{ backgroundColor: "rgba(98, 239, 255, 0.8)" }}
                >
                    <MaterialCommunityIcons size={24} name="arm-flex" color="#000" />
                </Button>
            </YStack>
        );
    }

    return (
        <YStack>
            <YStack
                position="absolute"
                right="$3"
                bottom="$3"
                alignItems="center"
                gap="$3"
            >
                {props.showButtonGroup ? subButtons() : null}
                <Button
                    onPress={() => props.setShowButtonGroup(!props.showButtonGroup)}
                    width={size}
                    height={size}
                    backgroundColor="#62EFFF"
                    borderRadius={props.showButtonGroup ? size / 2 : 18}
                    alignItems="center"
                    justifyContent="center"
                    borderWidth={0}
                    padding={0}
                    pressStyle={{ backgroundColor: "rgba(98, 239, 255, 0.8)" }}
                >
                    <MaterialCommunityIcons
                        size={28}
                        name={props.showButtonGroup ? "close" : "plus"}
                        color="#000"
                    />
                </Button>
            </YStack>
            <WorkoutListModal
                show={props.showWorkoutListModal}
                setShow={props.setShowWorkoutListModal}
                addWorkoutToSelectedDay={props.onModalListItemPressed}
            />
        </YStack>
    );
}

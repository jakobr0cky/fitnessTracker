import { WorkoutSelection } from "@/app/(tabs)/creation/createSplit";
import DropdownWorkoutSelection from "@/components/splitCollection/dropdownWorkoutSelection";
import { YStack } from "tamagui";

export default function WorkoutSelectionList(props: { selectedWorkouts: WorkoutSelection, numberOfWorkouts: number, addWorkoutToSelection: Function }) {

    const renderWorkoutInputs = () => {
        let items = [];
        for (let i = 0; i < props.numberOfWorkouts; i++) {
            items.push(
                <DropdownWorkoutSelection key={i} selectedWorkout={props.selectedWorkouts[i]} addWorkoutToSelection={props.addWorkoutToSelection} index={i}></DropdownWorkoutSelection>
            )
        }
        return items;
    }

    return (
        <YStack>
            {renderWorkoutInputs()}
        </YStack>
    );
}
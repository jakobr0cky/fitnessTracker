import DropdownSplitSelection from "@/components/splitCollection/dropdownSplitSelection";
import WorkoutSelectionList from "@/components/splitCollection/workoutSelectionList";
import { SplitType, Workout } from "@/models/trainingModels";
import { useSplitStore } from "@/stores/splitStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Input, Text, View, YStack } from "tamagui";

type SplitTypeWrapper = {
    value: SplitType | undefined,
    label: string
}

export type WorkoutSelection = {
    [key: number]: Workout | null
};

export default function CreateSplit() {
    const addSplit = useSplitStore((state) => state.addSplit);
    const splits = useSplitStore((state) => state.splits);
    const router = useRouter();

    const [splitName, setSplitName] = useState("");
    const [selectedSplit, setSelectedSplit] = useState("");
    const [selectedWorkouts, setSelectedWorkouts] = useState<WorkoutSelection>({});
    const [errorMessage, setErrorMessage] = useState("");

    const validateInput = (): boolean => {
        if (splitName === "" || splitName.length < 5 || splitName.length > 20 || splitName.match("/^[a-zA-Z0-9]+$/")) {
            setErrorMessage("Gib einen Workoutnamen ein. Mind. 5 Zeichen und Max. 20. Keine Sonderzeichen.");
            return false;
        }

        if(splits.findIndex((split) => split.name === splitName) !== -1){
            setErrorMessage("Split mit diesem Namen existiert bereits");
            return false;
        }

        if (selectedSplit === "") {
            setErrorMessage("Wähle einen Split.");
            return false;
        }

        for(const [,workout] of Object.entries(selectedWorkouts)){
            if (workout === null) {
                setErrorMessage("Füll alle Workouts aus.")
                return false;
            }
        }

        setErrorMessage("");

        return true;
    }

    const createSplit = () => {
        if (!validateInput()) return;

        const workouts = Object.values(selectedWorkouts);

        addSplit({
            name: splitName,
            splitType: AVAILABLE_SPLITS.find((split) => split.name === selectedSplit)?.type!,
            workouts: workouts.map((workout) => workout!)
        })
        router.navigate("/(tabs)/creation/(creationTabs)/splitCollection");
    }

    const addWorkoutToSelection = (index: number, workout: Workout) => {
        setSelectedWorkouts((state) => {
            let next = {
                ...state, [index]: workout
            };
            return next;
        });
    }

    const initSelectedWorkouts = (splitName: string) => {
        let selectedWorkoutsWithInitValues: WorkoutSelection = {};
        for (let i = 0; i < getNumberOfWorkouts(splitName); i++) {
            selectedWorkoutsWithInitValues[i] = null;
        }
        setSelectedWorkouts(selectedWorkoutsWithInitValues);
    }

    const getNumberOfWorkouts = (splitName: string) => {
        const foundSplit = AVAILABLE_SPLITS.find((item) => item.name === splitName);
        return foundSplit ? foundSplit.numberOfWorkouts : 0;
    }

    return (
        <View flex={1} backgroundColor="$color8">
            <YStack flex={1} marginTop={30} gap="$5">
                <Input size="$4" minWidth={110} alignSelf="center" textAlign="center" maxWidth={200} onChangeText={(text) => setSplitName(text)} padding={8} borderWidth={2} placeholder="Splitname"></Input>
                <DropdownSplitSelection selectedSplit={selectedSplit} setSelectedSplit={setSelectedSplit} initWorkoutSelection={initSelectedWorkouts} splits={AVAILABLE_SPLITS} />
                <WorkoutSelectionList selectedWorkouts={selectedWorkouts} addWorkoutToSelection={addWorkoutToSelection} numberOfWorkouts={getNumberOfWorkouts(selectedSplit)}></WorkoutSelectionList>
            </YStack>
            <YStack gap="$1" bottom={22}>
                {errorMessage !== "" ? <Text marginBottom={2} padding={10} alignSelf="center" color="red">{errorMessage}</Text> : <></>}
                <Button elevation={2} onPress={() => createSplit()} height={50} width={200} alignSelf="center">Erstelle Split</Button>
            </YStack>
        </View>
    );
}

const AVAILABLE_SPLITS = [
    {
        name: "Fullbody",
        type: SplitType.Fullbody,
        numberOfWorkouts: 1,
    },
    {
        name: "Upper Lower",
        type: SplitType.UpperLower,
        numberOfWorkouts: 2,
    },
    {
        name: "Push Pull Legs",
        type: SplitType.PushPullLegs,
        numberOfWorkouts: 3,
    },
]
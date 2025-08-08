import ExerciseChart from "@/components/statistic/ExerciseChart";
import { Exercise } from "@/models/trainingModels";
import { getAllExercisesQueryOptions } from "@/supabase/queryOptions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import { Modal, PaperProvider, Portal } from 'react-native-paper';
import { Text, View, YStack, useTheme } from "tamagui";

export default function StatisticTab() {
    const dimensions = useWindowDimensions();
    const { data: allExercises } = useQuery(getAllExercisesQueryOptions());
    const theme = useTheme();
    const queryClient = useQueryClient();

    const [selectedExercise, setSelectedExercise] = useState("");
    const [showModal, setShowModal] = useState(false);

    const onExercisePressed = (exerciseName: string) => {
        setSelectedExercise(exerciseName);
        setShowModal(false);
        queryClient.invalidateQueries({ queryKey: ["getExerciseDataByName"] });
    }

    const renderExerciseItem = (exercise: Exercise) => {
        return (
            <TouchableOpacity onPress={() => onExercisePressed(exercise.name)}>
                <Text color="$1" fontSize="$5">{exercise.name}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <PaperProvider>
            <View flex={1} backgroundColor="black" paddingTop={80}>
                <YStack flex={1} gap="$2">
                    <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => setShowModal(!showModal)}>
                        <Text color="$1" >{selectedExercise === "" ? "<Übung wählen>" : selectedExercise}</Text>
                    </TouchableOpacity>
                    <ExerciseChart exerciseName={selectedExercise} height={300} width={dimensions.width * 0.9}></ExerciseChart>
                </YStack>
            </View>
            <Portal>
                <Modal visible={showModal} onDismiss={() => setShowModal(false)} contentContainerStyle={{
                    backgroundColor: "hsla(0, 0%, 0%, 1)",
                    padding: 20,
                    width: dimensions.width * 0.8,
                    minHeight: 200,
                    maxHeight: 500,
                    alignSelf: "center",
                    borderRadius: 20,
                    borderColor: theme.color1?.val,
                    borderWidth: 1
                }}>
                    <FlatList data={allExercises} renderItem={({ item }) => renderExerciseItem(item)} contentContainerStyle={styles.flatlist} />
                </Modal>
            </Portal>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    flatlist: {
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
    }
})
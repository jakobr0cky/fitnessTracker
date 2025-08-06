import ExerciseChart from "@/components/statistic/ExerciseChart";
import { View } from "tamagui";

export default function StatisticTab(){
    return(
        <View flex={1}>
            <ExerciseChart></ExerciseChart>
        </View>
    );
}
import { getExerciseDataByNameQueryOptions } from '@/supabase/queryOptions';
import { useQuery } from '@tanstack/react-query';
import { LineChart } from 'react-native-chart-kit';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';
import { ScrollView, Text, useTheme, View } from "tamagui";

export type ExerciseChartProps = {
    exerciseName: string,
    width: number,
    height: number
}

export default function ExerciseChart(props: ExerciseChartProps) {
    const { data: exercisesData } = useQuery(getExerciseDataByNameQueryOptions(props.exerciseName));
    const theme = useTheme();

    if (!exercisesData) return <Text>Loading Exercise Data</Text>;
    
    if (props.exerciseName === "") {
        return (
            <Text marginTop={20} alignSelf="center" width={props.width} color="$1">Wähle eine Übung um die Statistiken dieser Übung zu sehen</Text>
        );
    }

    if (exercisesData.length <= 0) {
        return (
            <Text marginTop={20} alignSelf="center" width={props.width} color="$1">Du hast noch keine Statistiken zu dieser Übung!</Text>
        );
    }

    const getLabels = () => {
        return exercisesData.map((exerciseData) =>
            exerciseData.executed_at.split("-").filter((value, index) => index !== 0).join("-"));
    }

    const data = {
        labels: getLabels(),
        datasets: [{
            data: exercisesData.map((data) => data.total_volume),
            color: (opacity = 1) => theme.color1?.val,
            strokeWidth: 1,
        }]
    };

    const chartConfig: AbstractChartConfig | undefined = {
        backgroundColor: "transparent",
        backgroundGradientFrom: "transparent",
        backgroundGradientTo: "transparent",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "8",
            strokeWidth: "2",
            stroke: "#7e6033ff"
        },
        barPercentage: 0.12
    };

    return (
        <View style={{ height: props.height, width: props.width, paddingHorizontal: 5 }}>
            <ScrollView horizontal>
                <LineChart
                    data={data}
                    width={400}
                    height={props.height}
                    chartConfig={chartConfig}
                    onDataPointClick={({ value, dataset, index }) => console.log(`onData:
                     value: ${JSON.stringify(value, null, 2)}
                     dataset: ${JSON.stringify(dataset, null, 2)}`)}
                    yAxisInterval={0.5}
                />
            </ScrollView>
        </View>
    );
} 
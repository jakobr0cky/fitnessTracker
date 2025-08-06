import { getExerciseDataByNameQueryOptions } from '@/supabase/queryOptions';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Text, View } from "tamagui";

export default function ExerciseChart() {
    const { data: exercisesData } = useQuery(getExerciseDataByNameQueryOptions("Bankdrücken"));
    const screenWidth = Dimensions.get('window').width;
    
    const DATA = Array.from({ length: 7 }, (_, i) => 40 + 30 * Math.random());

    if(!exercisesData) return <Text>Loading Exercise Data</Text>;

    console.log(exercisesData)
    
    const data = {
        labels: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
        datasets: [{
            //data: DATA,
            data: exercisesData.map((data) => data.total_volume),
            color: (opacity = 1) => "red",
            strokeWidth: 1
        }]
    };

    const chartConfig = {
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
            r: "4",
            strokeWidth: "2",
            stroke: "#7e6033ff"
        }
    };

    return (
        <View style={{ height: 300, paddingHorizontal: 16 }}>
            <LineChart
                data={data}
                width={screenWidth - 32}
                height={250}
                chartConfig={chartConfig}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        </View>
    );
}
import { WorkoutDetails } from '@/supabase/queries';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
import {
    Button,
    Text,
    View,
    XStack,
    YStack
} from 'tamagui';

interface WorkoutCardProps {
    workout: WorkoutDetails;
    onEdit: () => void;
}

export default function WorkoutCard(props: WorkoutCardProps) {
    const estimatedDuration = calculateWorkoutDuration();
    const exerciseCount = props.workout.exercises.length; // Placeholder
    const totalSets = props.workout.exercises.reduce((totalSets,current) => totalSets+current.number_of_sets,0);

    function calculateWorkoutDuration() { // returns duration in seconds 
        let duration = 0;
        duration += 5*60; // 5 minute warm-up

        for (let exercise of props.workout.exercises) {
            duration += (exercise.number_of_sets - 1) * exercise.rest_time_in_seconds;
            duration += exercise.number_of_sets * 30; // 1 Set = 15 seconds
        }
        duration += (props.workout.exercises.length - 1) * 90 // 90 seconds to switch to next exercise

        return duration;
    }

    return (
        <View marginBottom="$4">
            <View
                borderRadius="$3"
                borderWidth={1}
                borderColor="#505962"
                overflow="hidden"
            >
                <LinearGradient
                    colors={['#62EFFF', '#161512']}
                    start={{ x: 1.5466, y: -1.1583 }}
                    end={{ x: 0, y: 1 }}
                    style={{ flex: 1 }}
                >
                    <YStack padding="$3" gap="$2">
                        <XStack justifyContent="space-between" alignItems="flex-start">
                            <Text
                                color="white"
                                fontSize="$7"
                                fontFamily="$heading"
                                fontWeight="400"
                            >
                                {props.workout.workout_name}
                            </Text>
                            <Button
                                size="$2"
                                chromeless
                                padding="$1"
                                onPress={props.onEdit}
                            >
                                <Svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                    <G clipPath="url(#clip0_10_212)">
                                        <Path
                                            d="M9.1275 3.55461L0 12.6815V15.0002H2.31875L11.4456 5.87274L9.1275 3.55461Z"
                                            fill="#69F0FF"
                                            fillOpacity="0.69"
                                        />
                                        <Path
                                            d="M14.52 0.479836C14.2124 0.172448 13.7954 -0.000228882 13.3606 -0.000228882C12.9258 -0.000228882 12.5087 0.172448 12.2012 0.479836L10.0137 2.67046L12.3318 4.98859L14.5193 2.80109C14.6719 2.6488 14.793 2.46792 14.8757 2.26879C14.9583 2.06966 15.0009 1.85619 15.001 1.64059C15.001 1.42499 14.9586 1.2115 14.876 1.01232C14.7935 0.813147 14.6725 0.632201 14.52 0.479836V0.479836Z"
                                            fill="#62EFFF"
                                        />
                                    </G>
                                    <Defs>
                                        <ClipPath id="clip0_10_212">
                                            <Rect width="15" height="15" fill="white" />
                                        </ClipPath>
                                    </Defs>
                                </Svg>
                            </Button>
                        </XStack>

                        <XStack justifyContent="space-between" alignItems="flex-start">
                            <YStack flex={1} marginRight="$4">
                                <Text color="#A1A1AA" fontSize="$3" marginBottom="$1">
                                    Dauer (geschätzt)
                                </Text>
                                <Text color="white" fontSize="$3">
                                    {Math.round(estimatedDuration / 60)} minutes
                                </Text>
                            </YStack>

                            <YStack flex={1} marginRight="$4">
                                <Text color="#A1A1AA" fontSize="$3" marginBottom="$1">
                                    Übungen
                                </Text>
                                <Text color="white" fontSize="$3">
                                    {exerciseCount}
                                </Text>
                            </YStack>

                            <YStack flex={1} marginRight="$4">
                                <Text color="#A1A1AA" fontSize="$3" marginBottom="$1">
                                    Sets
                                </Text>
                                <Text color="white" fontSize="$3">
                                    {totalSets}
                                </Text>
                            </YStack>
                        </XStack>
                    </YStack>
                </LinearGradient>
            </View>
        </View>
    );
};
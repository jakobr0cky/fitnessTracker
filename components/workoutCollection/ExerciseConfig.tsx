import { Exercise } from '@/models/trainingModels';
import React from 'react';
import {
    Input,
    Text,
    View,
    XStack
} from 'tamagui';

type ExerciseConfigProps = {
  exercise: Exercise;
  sets: number;
  restTime: number;
  onSetsChange: (sets: number) => void;
  onRestTimeChange: (restTime: number) => void;
}

export default function ExerciseConfig (props: ExerciseConfigProps) {
  return (
    <View
      borderRadius="$3"
      borderWidth={1}
      borderColor="#62EFFF"
      backgroundColor="black"
      padding="$2.5"
      marginBottom="$6"
    >
      <XStack alignItems="center" justifyContent="space-between">
        {/* Exercise Name */}
        <View flex={1} paddingRight="$2">
          <Text
            color="white"
            fontFamily="$heading"
            fontSize="$5"
            fontWeight="400"
            numberOfLines={1}
          >
            {props.exercise.name}
          </Text>
        </View>

        {/* Sets Input */}
        <View
          borderRadius="$2"
          borderWidth={1}
          borderColor="rgba(105, 240, 255, 0.40)"
          paddingHorizontal="$1.5"
          paddingVertical="$1"
          minWidth={51}
          marginRight="$2"
        >
          <Input
            color="rgba(255, 255, 255, 0.60)"
            backgroundColor="transparent"
            borderWidth={0}
            fontSize="$5"
            fontFamily="$heading"
            textAlign="center"
            placeholder="Sätze"
            placeholderTextColor="rgba(255, 255, 255, 0.60)"
            value={props.sets > 0 ? props.sets.toString() : ''}
            onChangeText={(text) => {
              const num = parseInt(text) || 0;
              props.onSetsChange(num);
            }}
            keyboardType="numeric"
            unstyled
          />
        </View>

        <View
          borderRadius="$2"
          borderWidth={1}
          borderColor="rgba(105, 240, 255, 0.40)"
          paddingHorizontal="$1.5"
          paddingVertical="$1"
          minWidth={55}
        >
          <Input
            color="rgba(255, 255, 255, 0.60)"
            backgroundColor="transparent"
            borderWidth={0}
            fontSize="$5"
            fontFamily="$heading"
            textAlign="center"
            placeholder="Pause"
            placeholderTextColor="rgba(255, 255, 255, 0.60)"
            value={props.restTime > 0 ? props.restTime.toString() : ''}
            onChangeText={(text) => {
              const num = parseInt(text) || 0;
              props.onRestTimeChange(num);
            }}
            keyboardType="numeric"
            unstyled
          />
        </View>
      </XStack>
    </View>
  );
};
import { Exercise } from '@/models/trainingModels';
import Color from 'color';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import {
    Button,
    Text,
    useTheme,
    XStack
} from 'tamagui';

type ExerciseItemProps = {
  exercise: Exercise;
  isSelected: boolean;
  onPress: (exercise: Exercise) => void;
  onDetailsPress: (exercise: Exercise) => void;
}

export default function ExerciseItem(props: ExerciseItemProps) {
  const theme = useTheme();

  return (
    <Button
      height="$6"
      paddingVertical="$2"
      paddingHorizontal="$3"
      borderRadius="$3"
      borderWidth={1}
      borderColor={props.isSelected ? theme.color1?.val : Color(theme.color1?.val).alpha(0.3).toString()}
      backgroundColor="black"
      onPress={() => props.onPress(props.exercise)}
      pressStyle={{
        opacity: 0.8,
      }}
    >
      <XStack justifyContent="space-between" alignItems="center" width="100%">
        <Text
          color="$1"
          fontFamily="$heading"
          fontSize="$5"
        >
          {props.exercise.name}
        </Text>

        <Button
          size="$3"
          circular
          backgroundColor="rgba(91, 91, 91, 0.50)"
          chromeless
          onPress={(e) => {
            e.stopPropagation();
            props.onDetailsPress(props.exercise);
          }}
        >
          <ArrowForwardIcon color={theme.color1?.val} />
        </Button>
      </XStack>
    </Button>
  );
};

const ArrowForwardIcon = (props: { color: string }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M16.175 13H4V11H16.175L10.575 5.4L12 4L20 12L12 20L10.575 18.6L16.175 13Z"
      fill={props.color}
    />
  </Svg>
);
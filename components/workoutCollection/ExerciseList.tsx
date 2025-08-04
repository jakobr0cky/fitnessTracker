import { Exercise } from '@/models/trainingModels';
import Color from 'color';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
import {
  Button,
  getTokens,
  getVariableValue,
  Input,
  ScrollView,
  Text,
  useTheme,
  View,
  XStack,
  YStack,
} from 'tamagui';
import ExerciseCard from './ExerciseCard';


const BackIcon = (props: { color: string }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z"
      fill={props.color}
    />
  </Svg>
);

const SearchIcon = () => (
  <Svg width="16" height="17" viewBox="0 0 16 17" fill="none">
    <G clipPath="url(#clip0_20_319)">
      <Path
        d="M16.0001 15.5574L11.8287 11.3854C12.911 10.0611 13.4429 8.37148 13.3145 6.66601C13.1861 4.96054 12.4071 3.36966 11.1387 2.2224C9.87024 1.07513 8.20941 0.459231 6.49965 0.502079C4.78989 0.544928 3.16199 1.24324 1.95262 2.45261C0.74326 3.66197 0.0449432 5.28987 0.00209473 6.99963C-0.0407537 8.70939 0.575144 10.3702 1.72241 11.6387C2.86968 12.9071 4.46056 13.6861 6.16602 13.8145C7.87149 13.9429 9.56109 13.411 10.8854 12.3287L15.0574 16.5L16.0001 15.5574Z"
        fill="white"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_20_319">
        <Rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
      </ClipPath>
    </Defs>
  </Svg>
);

const PlusIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 21 20" fill="none">
    <G clipPath="url(#clip0_20_633)">
      <Path
        d="M20.5 9.16667H11.3333V0H9.66667V9.16667H0.5V10.8333H9.66667V20H11.3333V10.8333H20.5V9.16667Z"
        fill="white"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_20_633">
        <Rect width="20" height="20" fill="white" transform="translate(0.5)" />
      </ClipPath>
    </Defs>
  </Svg>
);

export type ChooseExercisesProps = {
  exercises?: Exercise[];
  selectedExercises?: Exercise[];
  onExercisesSelected?: (exercises: Exercise[]) => void;
}

export default function ExerciseList({
  exercises = [], 
  selectedExercises = [], 
  onExercisesSelected,
}: ChooseExercisesProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const [searchText, setSearchText] = useState('');
  const [selected, setSelected] = useState<Exercise[]>(selectedExercises);
  const router = useRouter();

  const filteredExercises = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleExercisePress = (exercise: Exercise) => {
    const isCurrentlySelected = selected.some(e => e.id === exercise.id);
    let newSelected: Exercise[];

    if (isCurrentlySelected) {
      newSelected = selected.filter(e => e.id !== exercise.id);
    } else {
      newSelected = [...selected, exercise];
    }

    setSelected(newSelected);
  };

  const handleDetailsPress = (exercise: Exercise) => {
    console.log('Show details for:', exercise.name);
  };

  const handleAddExercises = () => {
    if (onExercisesSelected) {
      onExercisesSelected(selected);
    }
  };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View flex={1} backgroundColor="black" paddingTop={insets.top}>
      <XStack
        alignItems="center"
        paddingHorizontal="$4"
        paddingVertical="$4"
        gap="$6"
      >
        <Button
          size="$3"
          circular
          backgroundColor="rgba(91, 91, 91, 0.50)"
          onPress={handleBackPress}
        >
          <BackIcon color={theme.color1?.val} />
        </Button>

        <Text
          color="$1"
          fontFamily="$heading"
          fontSize="$4"
          flex={1}
          textAlign="center"
        >
          Wähle deine Übungen
        </Text>
        <View width={40} />
      </XStack>

      <View paddingHorizontal="$4" marginBottom="$4">
        <XStack
          alignItems="center"
          backgroundColor="#161512"
          borderRadius="$10"
          paddingHorizontal="$4"
          paddingVertical="$2"
        >
          <Input
            flex={1}
            color="$1"
            backgroundColor="transparent"
            borderWidth={0}
            fontSize="$3"
            placeholder="Suche nach Übungen"
            placeholderTextColor="$2"
            value={searchText}
            onChangeText={setSearchText}
            unstyled
          />
          <SearchIcon />
        </XStack>
      </View>
      <YStack flex={1} paddingHorizontal="$5">
        <ScrollView
          flex={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <YStack gap="$3.5">
            {filteredExercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                isSelected={selected.some(e => e.id === exercise.id)}
                onPress={handleExercisePress}
                onDetailsPress={handleDetailsPress}
              />
            ))}
          </YStack>
        </ScrollView>
      </YStack>

      <YStack paddingHorizontal="$4" paddingBottom="$4">
        <Button
          backgroundColor={selected.length > 0 ? "#62EFFF" : "rgba(98, 239, 255, 0.3)"}
          borderRadius="$4"
          height="$5"
          width="100%"
          alignItems="center"
          justifyContent="center"
          borderWidth={0}
          marginBottom={insets.bottom}
          disabled={selected.length === 0}
          pressStyle={{
            backgroundColor: selected.length > 0 ? "rgba(98, 239, 255, 0.8)" : "rgba(98, 239, 255, 0.2)",
            transform: [{ scale: 0.98 }]
          }}
          onPress={handleAddExercises}
        >
          <XStack alignItems="center" gap="$2">
            <PlusIcon />
            <Text
              color={selected.length > 0 ? "$1" : Color(getVariableValue(getTokens().color["$1"])).alpha(0.4).toString()}
              fontFamily="$heading"
              fontSize="$5"
              fontWeight="500"
            >
              Füge Übungen hinzu
            </Text>
          </XStack>
        </Button>
      </YStack>
    </View>
  );
}

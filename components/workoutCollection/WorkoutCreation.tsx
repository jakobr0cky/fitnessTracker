import { Exercise } from '@/models/trainingModels';
import { useSessionStore } from '@/stores/sessionStore';
import { insertWorkoutExercise, upsertWorkout } from '@/supabase/mutations';
import { queryAllWorkoutsFromCurrentUser } from '@/supabase/queries';
import { useMutation, useQuery } from '@tanstack/react-query';
import Color from 'color';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StatusBar } from 'react-native';
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
import ExerciseConfig from './ExerciseConfig';

const BackIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z"
      fill="#62EFFF"
    />
  </Svg>
);

const PlusIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 21 20" fill="none">
    <G clipPath="url(#clip0_20_626)">
      <Path
        d="M20.5 9.16667H11.3333V0H9.66667V9.16667H0.5V10.8333H9.66667V20H11.3333V10.8333H20.5V9.16667Z"
        fill="white"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_20_626">
        <Rect width="20" height="20" fill="white" transform="translate(0.5)" />
      </ClipPath>
    </Defs>
  </Svg>
);



interface WorkoutCreationProps {
  selectedExercises?: Exercise[];
  onWorkoutCreated?: (workoutData: any) => void;
}

export default function WorkoutCreation({
  selectedExercises = [],
  onWorkoutCreated,
}: WorkoutCreationProps) {
  const [workoutName, setWorkoutName] = useState('');
  const [exerciseConfigs, setExerciseConfigs] = useState<{ [key: string]: { sets: number, restTime: number } }>({});

  const session = useSessionStore((state) => state.session);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  if (session === null) {
    router.navigate("/signInSignUp");
  }

  const { data: allWorkoutsFromUser } = useQuery({
    queryKey: ["queryAllWorkoutsFromCurrentUser"],
    queryFn: queryAllWorkoutsFromCurrentUser
  })
  const { mutateAsync: upsertWorkoutMutationAsync, data: workoutData, error: workoutError } = useMutation({
    mutationKey: ["upsertWorkout"],
    mutationFn: upsertWorkout,
  });
  const { mutateAsync: insertWorkoutExerciseMutationAsync } = useMutation({
    mutationKey: ["insertWorkoutExercise"],
    mutationFn: insertWorkoutExercise,
  });

  const handleSetsChange = (exerciseId: string, sets: number) => {
    setExerciseConfigs(prev => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        sets,
      }
    }));
  };

  const handleRestTimeChange = (exerciseId: string, restTime: number) => {
    setExerciseConfigs(prev => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        restTime,
      }
    }));
  };

  const handleCreateWorkout = async () => {
    let isValid = validateInput();
    if(!isValid) return;

    try {
      const modifiedRowWorkout = await upsertWorkoutMutationAsync({ workoutName, userId: session!.user.id });


      for (let exercise of Object.entries(exerciseConfigs)) {
        await insertWorkoutExerciseMutationAsync({
          numberOfSets: exercise[1].sets,
          restTimeInSeconds: exercise[1].restTime,
          exerciseId: exercise[0],
          workoutId: modifiedRowWorkout.id,
        });
      }
    } catch (error) {
      console.log(`caught error while upserting Workout and inserting WorkoutExercise: ${JSON.stringify(error)}`);
      return;
    }
    finally{
      console.log("finished");
    }

    router.navigate("/(tabs)/creation/creationTab");
  };

  const handleBackPress = () => {
    router.back();
  };

  const validateInput = (): boolean => {
    if (workoutName === "" || workoutName.length < 5 || workoutName.length > 20 || workoutName.match("/^[a-zA-Z0-9]+$/")) {
      return false;
    }

    if (allWorkoutsFromUser?.findIndex((workout) => workout.name === workoutName) !== -1) {
      return false;
    }

    if(Object.entries(exerciseConfigs).length < selectedExercises.length){
      return false;
    }

    for (let exerciseConfig of Object.values(exerciseConfigs)) {
      if (!exerciseConfig.sets || !exerciseConfig.restTime|| exerciseConfig.sets <= 0 || exerciseConfig.restTime <= 0) {
        return false;
      }
    }

    return true;
  }

  const isValid = workoutName.trim().length > 0 &&
    selectedExercises.some(ex => exerciseConfigs[ex.id]?.sets > 0);

  return (
    <View flex={1} backgroundColor="black" paddingTop={insets.top}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

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
          chromeless
          onPress={handleBackPress}
        >
          <BackIcon />
        </Button>

        <Text
          color="$1"
          fontFamily="$heading"
          fontSize="$4"
          fontWeight="400"
          flex={1}
          textAlign="center"
        >
          Erstelle dein Workout
        </Text>

        <View width={40} />
      </XStack>

      <YStack flex={1} marginTop={15} paddingHorizontal="$6" gap="$6">
        <View
          borderRadius="$3"
          borderWidth={1}
          borderColor="$color1"
          paddingHorizontal="$1"
          paddingVertical="$1"
          alignSelf="stretch"
        >
          <Input
            color="$1"
            backgroundColor="transparent"
            fontSize="$5"
            textAlign="center"
            placeholder="Workoutname"
            placeholderTextColor="$3"
            value={workoutName}
            onChangeText={setWorkoutName}
            unstyled
          />
        </View>

        <XStack justifyContent="flex-end" alignItems="center" paddingLeft="$30">
          <Text
            color="rgba(255, 255, 255, 0.59)"
            fontFamily="$heading"
            fontSize="$3"
            width={50}
            textAlign="center"
            marginRight="$1"
          >
            Sätze
          </Text>
          <Text
            color="rgba(255, 255, 255, 0.59)"
            fontFamily="$heading"
            fontSize="$3"
            fontWeight="400"
            width={140}
            textAlign="center"
          >
            Pause (Sekunden)
          </Text>
        </XStack>

        <ScrollView
          flex={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <YStack>
            {selectedExercises.map((exercise) => (
              <ExerciseConfig
                key={exercise.id}
                exercise={exercise}
                sets={exerciseConfigs[exercise.id]?.sets || 0}
                restTime={exerciseConfigs[exercise.id]?.restTime || 0}
                onSetsChange={(sets) => handleSetsChange(exercise.id, sets)}
                onRestTimeChange={(restTime) => handleRestTimeChange(exercise.id, restTime)}
              />
            ))}
          </YStack>
        </ScrollView>
      </YStack>

      <YStack paddingHorizontal="$4" paddingBottom="$4">
        <Button
          backgroundColor={isValid ? "#62EFFF" : "rgba(98, 239, 255, 0.3)"}
          borderRadius="$4"
          height="$5"
          width="100%"
          alignItems="center"
          justifyContent="center"
          borderWidth={0}
          marginBottom={insets.bottom}
          disabled={!isValid}
          pressStyle={{
            backgroundColor: isValid ? "rgba(98, 239, 255, 0.8)" : "rgba(98, 239, 255, 0.2)",
            transform: [{ scale: 0.98 }]
          }}
          onPress={handleCreateWorkout}
        >
          <XStack alignItems="center" gap="$2">
            <PlusIcon />
            <Text
              color={isValid ? "$1" : Color(getVariableValue(getTokens().color["$1"])).alpha(0.4).toString()}
              fontFamily="$heading"
              fontSize="$5"
              fontWeight="500"
            >
              Erstelle Workout
            </Text>
          </XStack>
        </Button>
      </YStack>
    </View>
  );
}

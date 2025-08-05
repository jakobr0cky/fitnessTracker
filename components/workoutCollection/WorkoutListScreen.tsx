import { WorkoutDetails } from '@/supabase/queries';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
import {
  Button,
  Input,
  ScrollView,
  Text,
  useTheme,
  View,
  XStack,
  YStack
} from 'tamagui';
import BottomActionButton from '../buttons/BottomActionButton';
import WorkoutCard from './WorkoutCard';

const SearchIcon = () => (
  <Svg width="16" height="17" viewBox="0 0 16 17" fill="none">
    <G clipPath="url(#clip0_9_190)">
      <Path
        d="M16.0001 15.5574L11.8287 11.3854C12.911 10.0611 13.4429 8.37148 13.3145 6.66601C13.1861 4.96054 12.4071 3.36966 11.1387 2.2224C9.87024 1.07513 8.20941 0.459231 6.49965 0.502079C4.78989 0.544928 3.16199 1.24324 1.95262 2.45261C0.74326 3.66197 0.0449432 5.28987 0.00209473 6.99963C-0.0407537 8.70939 0.575144 10.3702 1.72241 11.6387C2.86968 12.9071 4.46056 13.6861 6.16602 13.8145C7.87149 13.9429 9.56109 13.411 10.8854 12.3287L15.0574 16.5L16.0001 15.5574Z"
        fill="white"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_9_190">
        <Rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
      </ClipPath>
    </Defs>
  </Svg>
);

const PlusIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 21 20" fill="none">
    <G clipPath="url(#clip0_9_185)">
      <Path
        d="M20.5 9.16667H11.3333V0H9.66667V9.16667H0.5V10.8333H9.66667V20H11.3333V10.8333H20.5V9.16667Z"
        fill="white"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_9_185">
        <Rect width="20" height="20" fill="white" transform="translate(0.5)" />
      </ClipPath>
    </Defs>
  </Svg>
);

const GlockIcon = () => (
  <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <Path
      d="M0 18.8571H22V22H0V18.8571ZM13.024 4.38429C13.134 4.00714 13.2 3.58286 13.2 3.14286C13.2 1.41429 12.21 0 11 0C9.79 0 8.8 1.41429 8.8 3.14286C8.8 3.58286 8.866 4.00714 8.976 4.38429C4.675 5.65714 1.397 10.89 1.1 17.2857H20.9C20.603 10.89 17.325 5.65714 13.024 4.38429Z"
      fill="#62EFFF"
    />
  </Svg>
);

const UserIcon = () => (
  <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <Path
      d="M11 11C13.7614 11 16 8.76142 16 6C16 3.23858 13.7614 1 11 1C8.23858 1 6 3.23858 6 6C6 8.76142 8.23858 11 11 11Z"
      fill="white"
      opacity="0.7"
    />
    <Path
      d="M21 21C21 16.0294 16.9706 12 12 12H10C5.02944 12 1 16.0294 1 21"
      stroke="white"
      strokeWidth="2"
      opacity="0.7"
    />
  </Svg>
);

const PeopleIcon = () => (
  <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <Path
      d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
      fill="white"
      opacity="0.7"
    />
    <Path
      d="M6 7C6 8.10457 5.10457 9 4 9C2.89543 9 2 8.10457 2 7C2 5.89543 2.89543 5 4 5C5.10457 5 6 5.89543 6 7Z"
      fill="white"
      opacity="0.7"
    />
    <Path
      d="M20 7C20 8.10457 19.1046 9 18 9C16.8954 9 16 8.10457 16 7C16 5.89543 16.8954 5 18 5C19.1046 5 20 5.89543 20 7Z"
      fill="white"
      opacity="0.7"
    />
    <Path
      d="M18 19C18 16.2386 15.7614 14 13 14H11C8.23858 14 6 16.2386 6 19"
      stroke="white"
      strokeWidth="2"
      opacity="0.7"
    />
    <Path
      d="M6 19C6 17.3431 4.65685 16 3 16H1"
      stroke="white"
      strokeWidth="2"
      opacity="0.7"
    />
    <Path
      d="M16 19C16 17.3431 17.3431 16 19 16H21"
      stroke="white"
      strokeWidth="2"
      opacity="0.7"
    />
  </Svg>
);

type WorkoutListScreenProps = {
  workouts: WorkoutDetails[];
}

export default function WorkoutListScreen({ workouts = [] }: WorkoutListScreenProps) {
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('workouts');
  
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  // Filter workouts based on search text
  const filteredWorkouts = workouts.filter(workout =>
    workout.workout_name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEditWorkout = (workout: WorkoutDetails) => {
    // Navigate to edit workout screen
    console.log('Edit workout:', workout.workout_name);
  };

  const handleCreateWorkout = () => {
    router.navigate('/(tabs)/creation/ExerciseSelectionScreen');
  };

  return (
    <View flex={1} backgroundColor="black" paddingTop={insets.top}>
      <XStack
        justifyContent="center"
        alignItems="center"
        paddingHorizontal="$4"
        paddingVertical="$4"
      >
        <Button
          flex={1}
          paddingVertical="$2"
          paddingHorizontal="$4"
          chromeless
          borderBottomWidth={1}
          borderBottomColor={activeTab === 'workouts' ? '#62EFFF' : 'rgba(98, 239, 255, 0.35)'}
          borderRadius={0}
          onPress={() => setActiveTab('workouts')}
        >
          <Text
            color={activeTab === "workouts" ? "$1" : "$3"}
            fontFamily="$heading"
            fontSize="$6"
            fontWeight="400"
          >
            Workouts
          </Text>
        </Button>
        <Button
          flex={1}
          paddingVertical="$2"
          paddingHorizontal="$4"
          chromeless
          borderBottomWidth={1}
          borderBottomColor={activeTab === 'plans' ? '#62EFFF' : 'rgba(98, 239, 255, 0.35)'}
          borderRadius={0}
          onPress={() => setActiveTab('plans')}
        >
          <Text
            color={activeTab === "plans" ? "$1" : "$3"}
            fontFamily="$heading"
            fontSize="$6"
          >
            Pläne
          </Text>
        </Button>
      </XStack>
      <YStack flex={1} paddingHorizontal="$4">
        <XStack
          alignItems="center"
          backgroundColor="#161512"
          borderRadius="$10"
          paddingHorizontal="$4"
          paddingVertical="$2"
          marginBottom="$4"
        >
          <Input
            flex={1}
            color="white"
            backgroundColor="transparent"
            borderWidth={0}
            fontSize="$3"
            placeholder="Suche nach Workouts"
            placeholderTextColor="#fff"
            value={searchText}
            onChangeText={setSearchText}
            unstyled
          />
          <SearchIcon />
        </XStack>
        <ScrollView
          flex={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {filteredWorkouts.length === 0 ? (
            <YStack
              flex={1}
              alignItems="center"
              justifyContent="center"
              paddingVertical="$8"
            >
              <Text
                color="#A1A1AA"
                fontFamily="$body"
                fontSize="$4"
                textAlign="center"
              >
                {searchText ? 'Keine Workouts gefunden' : 'Noch keine Workouts vorhanden'}
              </Text>
            </YStack>
          ) : (
            <YStack>
              {filteredWorkouts.map((workout) => (
                <WorkoutCard
                  key={workout.workout_id}
                  workout={workout}
                  onEdit={() => handleEditWorkout(workout)}
                />
              ))}
            </YStack>
          )}
        </ScrollView>
        {/* <YStack
          position="absolute"
          bottom={insets.bottom + 10}
          left="$4"
          right="$4"
        > */}
          <BottomActionButton 
          text="Erstelle neues Workout" 
          onPress={handleCreateWorkout}
          icon={<PlusIcon/>}
          />
        </YStack>
      {/* </YStack> */}
    </View>
  );
}

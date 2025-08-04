import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'tamagui';

const Tab = createMaterialTopTabNavigator();
const BotTab = createBottomTabNavigator();

export default function CreationLayout() {
    const insets = useSafeAreaInsets();

    return (
        <View flex={1} insetBlockStart={insets.top} insetBlockEnd={insets.bottom}>
            <Stack initialRouteName="creationTab">
                <Stack.Screen name="creationTab" options={{ headerShown: false }} />
                <Stack.Screen name="ExerciseSelectionScreen" options={{ headerShown: false }} />
                <Stack.Screen name="createWorkout" options={{ headerShown: false }} />
                <Stack.Screen name="createSplit" options={{ headerShown: false }} />
            </Stack>
        </View>
    );
}
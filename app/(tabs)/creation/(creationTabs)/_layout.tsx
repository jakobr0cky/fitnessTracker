import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, View } from 'tamagui';
import SplitCollection from '../../../../components/creationTab/splitCollection';
import WorkoutCollection from '../../../../components/creationTab/workoutCollection';

const Tab = createMaterialTopTabNavigator();

export default function CreationLayout() {
    const insets = useSafeAreaInsets();
    const theme = useTheme();

    return (
        <View flex={1} insetBlockStart={insets.top} backgroundColor="$color12">
            <Tab.Navigator screenOptions={{
                tabBarStyle: {
                    marginTop: 30
                }
            }}>
                <Tab.Screen name="workoutCollection" component={WorkoutCollection}
                    options={{
                        title: "Workouts",
                        tabBarStyle: {
                            backgroundColor: "green",
                            
                        },
                        tabBarItemStyle: {
                            backgroundColor: theme.color12?.val,
                            
                        },
                        sceneStyle: {
                            backgroundColor: "blue"
                        },
                        
                    }} />
                <Tab.Screen name="splitCollection" component={SplitCollection}
                    options={{
                        title: "Splits"
                    }} />
            </Tab.Navigator>
        </View>
    );
}
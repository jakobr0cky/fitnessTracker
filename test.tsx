import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationIndependentTree } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootTabParamList = {
    Home: undefined;
    Training: undefined;
    Profile: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootTabParamList>;

function HomeScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
        </View>
    );
}

function TrainingScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Training Screen</Text>
        </View>
    );
}

function ProfileScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Profile Screen</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TestApp() {
    return (
        <NavigationIndependentTree>
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen 
                        name="Home" 
                        component={HomeScreen}
                        options={{ title: "Home" }}
                    />
                    <Tab.Screen 
                        name="Training" 
                        component={TrainingScreen}
                        options={{ title: "Training" }}
                    />
                    <Tab.Screen 
                        name="Profile" 
                        component={ProfileScreen}
                        options={{ title: "Profile" }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </NavigationIndependentTree>
    );
} 
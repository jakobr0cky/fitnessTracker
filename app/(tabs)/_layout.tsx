import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Color from 'color';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from "expo-router";
import React from 'react';
import { StyleProp, useWindowDimensions, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getVariableValue, useTheme, View } from "tamagui";

export default function TabLayout() {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const { width: windowWidth } = useWindowDimensions();

    const tabBarButtonColorFocused = getVariableValue(theme.color1);
    const tabBarBackGroundColor = theme.color12?.val;
    const tabBarHeight = 100;

    const tabBarItemStyle: StyleProp<ViewStyle> = {
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
    };

    const tabBarIcon = (props: { focused: boolean, color: string, size: number }, iconName: string) => {
        const iconSize = props.size + 5;

        return (

            <View
                width={iconSize + 10}
                height={iconSize + 10}
                justifyContent="center"
                alignItems="center"
                backgroundColor={props.focused ? "hsla(0, 0%, 36%, 0.76)" : tabBarBackGroundColor}
                borderRadius={13}>
                <MaterialCommunityIcons
                    color={props.color}
                    size={iconSize}
                    name={iconName as any} />
            </View>
        );
    }

    const tabBarBackground = () => {

        console.log(`tabBarHeight: ${tabBarHeight}`);

        return (
            <View flex={1} backgroundColor="black">
                <LinearGradient
                    style={{
                        width: windowWidth,
                        height: 5,
                        position: "absolute",
                        zIndex: 2,
                        flex: 1
                    }}
                    start={{
                        x: 0.5, y: 0
                    }}
                    end={{
                        x: 0.5, y: 1
                    }}
                    colors={[Color(theme.color1?.val).alpha(0.2).toString(), theme.color1?.val, "black"]}>
                </LinearGradient>
            </View>
        );
    }

    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarStyle: {
                borderTopWidth: 0,
                height: tabBarHeight,
                paddingTop: 5
            },
            tabBarActiveTintColor: tabBarButtonColorFocused,
            tabBarBackground: () => tabBarBackground(),
            sceneStyle: {
                paddingTop: insets.top,
                backgroundColor: "black"
            }
        }}>
            <Tabs.Screen name="creation"
                options={{
                    title: "Creation Tab",
                    tabBarShowLabel: false,
                    tabBarHideOnKeyboard: true,
                    tabBarItemStyle,
                    tabBarIcon: (props) => tabBarIcon(props, "dumbbell"),
                }} />
            <Tabs.Screen name="index"
                options={{
                    title: "Schedule Tab",
                    tabBarShowLabel: false,
                    tabBarHideOnKeyboard: true,
                    tabBarItemStyle,
                    tabBarIcon: (props) => tabBarIcon(props, "calendar-month-outline"),
                }} />
            <Tabs.Screen name="Statistic"
                options={{
                    title: "Statistic Tab",
                    tabBarShowLabel: false,
                    tabBarHideOnKeyboard: true,
                    tabBarItemStyle,
                    tabBarIcon: (props) => tabBarIcon(props, "chart-line"),
                }} />
            <Tabs.Screen name="profile"
                options={{
                    title: "Profile Tab",
                    tabBarShowLabel: false,
                    tabBarHideOnKeyboard: true,
                    tabBarItemStyle,
                    tabBarIcon: (props) => tabBarIcon(props, "account-box"),
                }} />
        </Tabs>
    );
}

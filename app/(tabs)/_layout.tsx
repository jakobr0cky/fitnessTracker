import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import Color from 'color';
import { Tabs } from "expo-router";
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import { getVariableValue, useTheme, View } from "tamagui";

export default function TabLayout() {
    const theme = useTheme();

    const tabBarButtonColorFocused = getVariableValue(theme.color1);
    const tabBarBackGroundColor = theme.color12?.val;

    const tabBarItemStyle: StyleProp<ViewStyle> = {
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
    };

    const tabBarButton = (props: BottomTabBarButtonProps) => {
        console.log(`props: ${JSON.stringify(props.href, null, 2)}`)

        return (
            <Pressable onPress={props.onPress}>
                {props.children}
            </Pressable>);
    }

    const tabBarIcon = (props: { focused: boolean, color: string, size: number }, iconName: string) => {
        const iconSize = props.size+5;

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

    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarStyle: {
                backgroundColor: tabBarBackGroundColor,
                borderColor: Color(theme.color3?.val).alpha(0.4).toString(),
                borderTopWidth: 1,
            },
            tabBarActiveTintColor: tabBarButtonColorFocused,
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

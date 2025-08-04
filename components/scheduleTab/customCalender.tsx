import { config } from "@/tamagui.config";
import { Pressable } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import Svg, { Path } from "react-native-svg";
import { Text, useTheme, XStack, YStack } from "tamagui";

LocaleConfig.locales['de'] = {
    monthNames: [
        'Jänner',
        'Februar',
        'März',
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'Oktober',
        'November',
        'Dezember'
    ],
    monthNamesShort: ['Jan', 'Feb', 'März', 'April', 'Mai', 'Juni', 'Juli', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    dayNames: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
    dayNamesShort: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    today: "Heute"
};

LocaleConfig.defaultLocale = "de";

export default function CustomCalendar(props: { currentDate: Date, setCurrentDate: Function, markedDates: MarkedDates, selectedDay: Date, setSelectedDay: Function }) {
    const lighAccent = config.themes.light_accent;
    const dark = config.themes.dark_accent;
    const theme = useTheme();

    // Back icon component (copied from ExerciseList)
    const BackIcon = (props: { color: string }) => (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
                d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z"
                fill={props.color}
            />
        </Svg>
    );

    const ForwardIcon = (props: { color: string }) => (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
                d="M16.175 13L10.575 18.6L12 20L20 12L12 4L10.575 5.4L16.175 11H4V13H16.175Z"
                fill={props.color}
            />
        </Svg>
    );

    const monthNames = LocaleConfig.locales['de'].monthNames;
    const month = monthNames[props.currentDate.getMonth()];
    const year = props.currentDate.getFullYear();

    const handlePreviousMonth = () => {
        // const newDate = new Date(props.currentDate);
        // newDate.setMonth(props.currentDate.getMonth() - 1);
        // props.setCurrentDate(newDate);
    };

    const handleNextMonth = () => {
        // const newDate = new Date(props.currentDate);
        // newDate.setMonth(props.currentDate.getMonth() + 1);
        // props.setCurrentDate(newDate);
    };

    return (
        <YStack gap="$2">
            {/* Custom Header */}
            <XStack
                justifyContent="center"
                alignItems="center"
                paddingHorizontal="$4"
                paddingVertical="$3"
                width="100%"
                position="relative"
            >
                {/* Previous Month Button */}
                <YStack position="absolute" left="$4">
                    <Pressable onPress={handlePreviousMonth}>
                        <YStack
                            width={40}
                            height={40}
                            borderRadius={20}
                            backgroundColor="rgba(91, 91, 91, 0.50)"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <BackIcon color="white" />
                        </YStack>
                    </Pressable>
                </YStack>

                {/* Month and Year - Centered */}
                <Text
                    color="white"
                    // fontSize="$6"
                    textAlign="center"
                >
                    {month} {year}
                </Text>

                {/* Next Month Button */}
                <YStack position="absolute" right="$4">
                    <Pressable onPress={handleNextMonth}>
                        <YStack
                            width={40}
                            height={40}
                            borderRadius={20}
                            backgroundColor="rgba(91, 91, 91, 0.50)"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <ForwardIcon color="white" />
                        </YStack>
                    </Pressable>
                </YStack>
            </XStack>

            {/* Calendar without header */}
            <Calendar
                style={{
                    backgroundColor: "#000",
                    borderRadius: 12,
                    paddingHorizontal: 8,
                    paddingVertical: 8
                }}
                theme={{
                    backgroundColor: "#000",
                    calendarBackground: "#000",
                    textSectionTitleColor: "rgba(255,255,255,0.7)",
                    selectedDayBackgroundColor: "#62EFFF",
                    selectedDayTextColor: "#000",
                    todayTextColor: "#62EFFF",
                    dayTextColor: "#FFFFFF",
                    textDisabledColor: "rgba(255,255,255,0.3)",
                    dotColor: "#62EFFF",
                    selectedDotColor: "#000",
                    arrowColor: "transparent",
                    monthTextColor: "transparent",
                    indicatorColor: "#62EFFF",
                    textDayFontWeight: "400",
                    textMonthFontWeight: "500",
                    textDayHeaderFontWeight: "400",
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 13
                }}
                markingType="custom"
                current={props.currentDate.toISOString().split('T')[0]}
                onMonthChange={(date) => props.setCurrentDate(new Date(date.timestamp))}
                markedDates={props.markedDates}
                onDayPress={(date) => { props.setSelectedDay(date.dateString) }}
                hideArrows={true}
                disableMonthChange={false}
                enableSwipeMonths={true}
            />
        </YStack>
    );
}

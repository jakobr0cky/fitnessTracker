import React from "react";
import { Vibration } from "react-native";
import { CountdownCircleTimer, TimeProps } from 'react-native-countdown-circle-timer';
import { Text } from "tamagui";

export default function CountDownTimer(props: { timerRunning: boolean, restTime: number, resetTimer: number, size: number }) {

    const timerView = (props: TimeProps) => {
        const minutes = Math.floor(props.remainingTime / 60);
        const seconds = props.remainingTime % 60;

        const time = `${minutes > 0 ? minutes.toString().padStart(2, "0") + ":" : ""}${seconds.toString().padStart(2, "0")}`

        return (
            <Text fontSize="$8" color="white">{time}</Text>
        );
    }

    const vibrate = () => {
        let i = 0;
        const rounds = 3;
        const id = setInterval(() => {
            Vibration.vibrate(800); i++;
            if (i >= rounds) clearInterval(id);
        }, 1100);
    }

    return (
        <CountdownCircleTimer
            key={props.resetTimer}
            isPlaying={props.timerRunning}
            duration={props.restTime}
            colors={['#701e51', '#b311d4', '#7d3ac9', '#f03030']}
            colorsTime={[20, 10, 4, 0]}
            size={props.size}
            onComplete={() => vibrate()}
            isSmoothColorTransition={true}
        >
            {(props) => timerView(props)}

        </CountdownCircleTimer>
    );
}
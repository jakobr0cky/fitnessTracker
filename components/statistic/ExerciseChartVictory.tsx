import { Circle, useFont } from "@shopify/react-native-skia";
import { View } from "tamagui";
import { CartesianChart, Line, useChartPressState } from "victory-native";

const a = require("@/assets/fonts/Inter_18pt-Black.ttf");

import type { SharedValue } from "react-native-reanimated";
// ...

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
    const font = useFont(a, 15);

    console.log(`x: ${JSON.stringify(x, null, 2)}`)
    console.log(`y: ${JSON.stringify(y, null, 2)}`)

    return (
        <>
            <Circle cx={x} cy={y} r={8} color="black" />

        </>
    );
}

export default function ExerciseChartVictory() {
    const font = useFont(a, 15);
    const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } });
    const DATA = Array.from({ length: 31 }, (_, i) => ({
        day: i,
        highTmp: 40 + 30 * Math.random(),
    }));

    return (
        <View style={{ height: 300, width: 300, marginLeft: 10 }}>
            <CartesianChart
                data={DATA}
                xKey="day"
                yKeys={["highTmp"]}
                padding={{ left: 50, right: 20, top: 20, bottom: 50 }}
                axisOptions={{
                    labelColor: "black",
                    lineColor: "black",
                    tickCount: {
                        x: 5,
                        y: 5
                    },
                    lineWidth: 1,
                    font: font,
                }}
                chartPressState={state}
            >
                {({ points }) => (
                    <>
                        <Line
                            points={points.highTmp}
                            color="red"
                            strokeWidth={3}
                        />
                        {isActive ? (
                            <ToolTip x={state.x.position} y={state.y.highTmp.position} />
                        ) : null}
                    </>
                )}

            </CartesianChart>
        </View>
    );
}

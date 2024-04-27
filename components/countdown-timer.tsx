import { Text } from "./text";
import {
	interpolate,
	useDerivedValue,
	useSharedValue,
	withRepeat,
	withTiming,
} from "react-native-reanimated";
import { useEffect, useState } from "react";
import { Extrapolate, Group } from "@shopify/react-native-skia";
import { useGameEngine } from "../hooks/use-game-engine";
import { DEFAULT_TIMER } from "../constants/values";

export const CountdownTimer = () => {
	const { screenWidth, onTimeOut } = useGameEngine();
	const [timer, setTimer] = useState(DEFAULT_TIMER);

	useEffect(() => {
		const interval = setInterval(() => {
			setTimer((prevState) => {
				if (prevState > 0) {
					return prevState - 1;
				}

				clearInterval(interval);
				return prevState;
			});
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	const min = Math.floor(timer / 60);
	const sec = timer % 60;
	const time = `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;

	const scale = useSharedValue(1);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (min === 0 && sec <= 5) {
			scale.value = withRepeat(withTiming(1.1, { duration: 500 }), -1, true);
		}

		if (min === 0 && sec === 0) {
			onTimeOut();
		}
	}, [min, sec, scale]);

	const transform = useDerivedValue(() => {
		const translateX = interpolate(
			scale.value,
			[1, 1.1],
			[0, -17],
			Extrapolate.CLAMP,
		);

		return [{ scale: scale.value }, { translateX }];
	});

	return (
		<Group transform={transform}>
			<Text
				text={time}
				x={screenWidth / 2 - 41}
				y={0}
				size={30}
				width={screenWidth}
			/>
		</Group>
	);
};

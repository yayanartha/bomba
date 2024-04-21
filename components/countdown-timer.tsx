import { useWindowDimensions } from "react-native";
import { Text } from "./text";
import {
	interpolate,
	useDerivedValue,
	useSharedValue,
	withRepeat,
	withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { Extrapolate, Group } from "@shopify/react-native-skia";

interface Props {
	seconds: number;
}

export const CountdownTimer = ({ seconds }: Props) => {
	const { width: screenWidth } = useWindowDimensions();

	const min = Math.floor(seconds / 60);
	const sec = seconds % 60;
	const time = `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;

	const scale = useSharedValue(1);

	useEffect(() => {
		if (min === 0 && sec <= 5) {
			scale.value = withRepeat(withTiming(1.1, { duration: 500 }), -1, true);
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

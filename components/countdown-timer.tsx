import { useWindowDimensions } from "react-native";
import { Text } from "./text";
import { useMemo, useState } from "react";

interface Props {
	seconds: number;
}

const formatTimer = (time: number) => {
	if (time < 10) {
		return `0${time}`;
	}

	return time;
};

export const CountdownTimer = ({ seconds }: Props) => {
	const { width: screenWidth } = useWindowDimensions();

	const time = useMemo(() => {
		if (!seconds) {
			return "00:00";
		}

		return `${formatTimer(Math.floor(seconds / 60))}:${formatTimer(
			seconds % 60,
		)}`;
	}, [seconds]);

	return <Text text={time} x={screenWidth / 2 - 39} y={24} size={30} />;
};

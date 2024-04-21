import React from "react";
import { Ship } from "./ship";
import { useWindowDimensions } from "react-native";
import {
	GRID_NUM,
	SHIP_HEIGHT_RATIO,
	SHIP_POSITION_Y_RATIO,
} from "../constants/values";
import {
	type SharedValue,
	useAnimatedReaction,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

interface Props {
	lanePos: SharedValue<number>;
}

export const MarineShip = ({ lanePos }: Props) => {
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();
	const shipHeight = screenHeight * SHIP_HEIGHT_RATIO;

	const xPos = useDerivedValue(() => {
		return (screenWidth / GRID_NUM) * lanePos.value;
	});

	return (
		<Ship
			xPos={xPos.value}
			yPos={screenHeight - screenHeight * SHIP_POSITION_Y_RATIO - shipHeight}
		/>
	);
};

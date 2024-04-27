import React from "react";
import { Ship } from "./ship";
import { GRID_NUM, SHIP_HEIGHT_RATIO } from "../constants/values";
import Reanimated, {
	LinearTransition,
	useAnimatedStyle,
	Easing,
} from "react-native-reanimated";
import { Canvas } from "@shopify/react-native-skia";
import { useGameEngine } from "../hooks/use-game-engine";

export const MarineShip = () => {
	const { screenWidth, screenHeight, laneIndex } = useGameEngine();
	const shipHeight = screenHeight * SHIP_HEIGHT_RATIO;
	const laneWidth = screenWidth / GRID_NUM;

	const animatedStyle = useAnimatedStyle(() => {
		return {
			left: laneWidth * laneIndex.value,
		};
	});

	return (
		<Reanimated.View
			layout={LinearTransition.easing(Easing.linear)}
			style={[
				animatedStyle,
				{
					position: "absolute",
					bottom: 50,
				},
			]}
		>
			<Canvas style={{ width: laneWidth, height: shipHeight }}>
				<Ship xPos={0} yPos={0} />
			</Canvas>
		</Reanimated.View>
	);
};

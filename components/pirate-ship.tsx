import React from "react";
import { Ship } from "./ship";
import { useWindowDimensions } from "react-native";
import { GRID_NUM, SHIP_HEIGHT_RATIO } from "../constants/values";
import Reanimated, {
	type SharedValue,
	useAnimatedStyle,
	LinearTransition,
	Easing,
} from "react-native-reanimated";
import { Canvas } from "@shopify/react-native-skia";

interface Props {
	lanePos: SharedValue<number>;
}

export const PirateShip = ({ lanePos }: Props) => {
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();
	const shipHeight = screenHeight * SHIP_HEIGHT_RATIO;
	const laneWidth = screenWidth / GRID_NUM;

	const animatedStyle = useAnimatedStyle(() => {
		return {
			left: laneWidth * lanePos.value,
		};
	});

	return (
		<Reanimated.View
			layout={LinearTransition.easing(Easing.linear)}
			style={[
				animatedStyle,
				{
					position: "absolute",
					top: 240,
				},
			]}
		>
			<Canvas style={{ width: laneWidth, height: shipHeight }}>
				<Ship xPos={0} yPos={0} />
			</Canvas>
		</Reanimated.View>
	);
};

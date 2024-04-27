import React from "react";
import { Ship } from "./ship";
import Reanimated, {
	LinearTransition,
	useAnimatedStyle,
	Easing,
} from "react-native-reanimated";
import { useGameEngine } from "../hooks/use-game-engine";

export const MarineShip = () => {
	const { shipHeight, laneWidth, laneIndex, marinePosY } = useGameEngine();

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
					top: marinePosY,
				},
			]}
		>
			<Ship />
		</Reanimated.View>
	);
};

import React from "react";
import { Ship } from "./ship";
import Reanimated, {
	useAnimatedStyle,
	LinearTransition,
	Easing,
} from "react-native-reanimated";
import { useGameEngine } from "../hooks/use-game-engine";

export const PirateShip = () => {
	const { laneWidth, laneIndex, shipHeight, piratePosY } = useGameEngine();

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
					top: piratePosY,
				},
			]}
		>
			<Ship />
		</Reanimated.View>
	);
};

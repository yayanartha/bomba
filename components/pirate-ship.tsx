import React, { useEffect } from "react";
import { Ship } from "./ship";
import Reanimated, {
	useAnimatedStyle,
	LinearTransition,
	Easing,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { useGameEngine } from "../hooks/use-game-engine";
import { Role } from "../constants/types";

export const PirateShip = () => {
	const { screenHeight, laneWidth, laneIndex, role, piratePosY } =
		useGameEngine();
	const contentHeight = 50 + 30 + laneWidth + 30 + laneWidth + 30 + 50;

	const posX = useSharedValue(laneWidth * 2);
	const posY = useSharedValue(
		screenHeight / 2 - contentHeight / 2 + 50 + 30 - 2,
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (role === Role.Pirate) {
			posX.value = withTiming(laneWidth * laneIndex.value, {
				duration: 2000,
				easing: Easing.in(Easing.ease),
			});
		}

		posY.value = withTiming(role === Role.Pirate ? piratePosY : -laneWidth, {
			duration: 2000,
			easing: Easing.in(Easing.ease),
		});
	}, []);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			left: posX.value,
			top: posY.value,
		};
	});

	return (
		<Reanimated.View
			layout={LinearTransition.easing(Easing.linear)}
			style={[animatedStyle, { position: "absolute" }]}
		>
			<Ship />
		</Reanimated.View>
	);
};

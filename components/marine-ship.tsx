import React, { useEffect } from "react";
import { Ship } from "./ship";
import Reanimated, {
	LinearTransition,
	useAnimatedStyle,
	Easing,
	withTiming,
	useSharedValue,
} from "react-native-reanimated";
import { useGameEngine } from "../hooks/use-game-engine";
import { Role } from "../constants/types";

export const MarineShip = () => {
	const { screenHeight, laneWidth, laneIndex, role, marinePosY } =
		useGameEngine();
	const contentHeight = 50 + 30 + laneWidth + 30 + laneWidth + 30 + 50;

	const posX = useSharedValue(laneWidth * 2);
	const posY = useSharedValue(
		screenHeight / 2 - contentHeight / 2 + 50 + 30 + laneWidth + 30 - 2,
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (role === Role.Marine) {
			posX.value = withTiming(laneWidth * laneIndex.value, {
				duration: 2000,
				easing: Easing.in(Easing.ease),
			});
		}

		posY.value = withTiming(role === Role.Marine ? marinePosY : screenHeight, {
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

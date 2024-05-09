import React, { useEffect } from "react";
import { Ship } from "./ship";
import Reanimated, {
	LinearTransition,
	useAnimatedStyle,
	Easing,
	withTiming,
	useSharedValue,
	interpolate,
	useDerivedValue,
} from "react-native-reanimated";
import { useGameEngine } from "../hooks/use-game-engine";
import { Role } from "../constants/types";
import { Extrapolate } from "@shopify/react-native-skia";

export const MarineShip = () => {
	const { screenHeight, laneWidth, laneIndex, role, marinePosY } =
		useGameEngine();
	const contentHeight = 50 + 30 + laneWidth + 30 + laneWidth + 30 + 50;
	const defaultPosY =
		screenHeight / 2 - contentHeight / 2 + 50 + 30 + laneWidth + 30 - 2;

	const posX = useSharedValue(laneWidth * 2);
	const posY = useSharedValue(defaultPosY);
	const isTransitioning = useSharedValue(true);
	const actualPosX = useDerivedValue(() => laneWidth * laneIndex.value);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (role === Role.Marine) {
			posX.value = withTiming(
				actualPosX.value,
				{
					duration: 2000,
					easing: Easing.in(Easing.ease),
				},
				() => {
					isTransitioning.value = false;
				},
			);
		}

		posY.value = withTiming(role === Role.Marine ? marinePosY : screenHeight, {
			duration: 2000,
			easing: Easing.in(Easing.ease),
		});
	}, []);

	const animatedStyle = useAnimatedStyle(() => {
		const scale = interpolate(
			posY.value,
			[defaultPosY, marinePosY],
			[1, 0.5],
			Extrapolate.CLAMP,
		);

		return {
			left: isTransitioning.value ? posX.value : actualPosX.value,
			top: posY.value,
			transform: [{ scale }],
		};
	});

	return (
		<Reanimated.View
			layout={LinearTransition.springify()}
			style={[animatedStyle, { position: "absolute" }]}
		>
			<Ship />
		</Reanimated.View>
	);
};

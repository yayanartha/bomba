import React, { useEffect } from "react";
import { Ship } from "./ship";
import Reanimated, {
	useAnimatedStyle,
	LinearTransition,
	Easing,
	useSharedValue,
	withTiming,
	interpolate,
	useDerivedValue,
} from "react-native-reanimated";
import { useGameEngine } from "../hooks/use-game-engine";
import { Role } from "../constants/types";
import { Extrapolate } from "@shopify/react-native-skia";

export const PirateShip = () => {
	const { screenHeight, laneWidth, laneIndex, role, piratePosY, shipHeight } =
		useGameEngine();
	const contentHeight = 50 + 30 + laneWidth + 30 + laneWidth + 30 + 50;
	const defaultPosY = screenHeight / 2 - contentHeight / 2 + 50 + 30 - 2;

	const posX = useSharedValue(laneWidth * 2);
	const posY = useSharedValue(defaultPosY);
	const isTransitioning = useSharedValue(true);
	const actualPosX = useDerivedValue(() => laneWidth * laneIndex.value);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (role === Role.Pirate) {
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

		const nextPosY = role === Role.Pirate ? piratePosY : -shipHeight;
		// const nextPosY = piratePosY;
		posY.value = withTiming(nextPosY, {
			duration: 2000,
			easing: Easing.in(Easing.ease),
		});
	}, []);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			left: isTransitioning.value ? posX.value : actualPosX.value,
			top: posY.value,
		};
	});

	const flagScale = useDerivedValue(() => {
		return interpolate(
			posY.value,
			[defaultPosY, piratePosY],
			[1, 0.3],
			Extrapolate.CLAMP,
		);
	});

	return (
		<Reanimated.View
			layout={LinearTransition.springify()}
			style={[animatedStyle, { position: "absolute" }]}
		>
			<Ship image={require("../assets/pirate.png")} flagScale={flagScale} />
		</Reanimated.View>
	);
};

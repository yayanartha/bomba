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

		const nextPosY = role === Role.Marine ? marinePosY : screenHeight;
		// const nextPosY = marinePosY;
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
			[defaultPosY, marinePosY],
			[1, 0.3],
			Extrapolate.CLAMP,
		);
	});

	return (
		<Reanimated.View
			layout={LinearTransition.springify()}
			style={[animatedStyle, { position: "absolute" }]}
		>
			<Ship image={require("../assets/marine.png")} flagScale={flagScale} />
		</Reanimated.View>
	);
};

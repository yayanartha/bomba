import { Rect } from "@shopify/react-native-skia";
import { MINE_SPEED } from "../constants/values";
import {
	useSharedValue,
	withTiming,
	cancelAnimation,
	Easing,
	runOnJS,
} from "react-native-reanimated";
import { useEffect, useState } from "react";
import { useGameEngine } from "../hooks/use-game-engine";
import { Role } from "../constants/types";

interface Props {
	laneIndex: number;
}

export const Mine = ({ laneIndex }: Props) => {
	const { laneWidth, pirateCollisionY, screenHeight, role } = useGameEngine();
	const [isActive, setIsActive] = useState(true);

	const mineSize = laneWidth * 0.3;
	const posX = laneIndex * laneWidth + laneWidth / 2 - mineSize / 2;
	const posY = useSharedValue(
		role === Role.Pirate ? pirateCollisionY - mineSize : -mineSize,
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		posY.value = withTiming(
			screenHeight,
			{ duration: MINE_SPEED, easing: Easing.in(Easing.ease) },
			() => {
				runOnJS(setIsActive)(false);
			},
		);

		return () => {
			cancelAnimation(posY);
		};
	}, [mineSize]);

	if (!isActive) {
		return null;
	}

	return (
		<Rect x={posX} y={posY} height={mineSize} width={mineSize} color="red" />
	);
};

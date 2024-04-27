import { Rect } from "@shopify/react-native-skia";
import { MISSILE_SPEED } from "../constants/values";
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

export const Missile = ({ laneIndex }: Props) => {
	const { screenHeight, laneWidth, marineCollisionY, role } = useGameEngine();
	const [isActive, setIsActive] = useState(true);

	const missileWidth = laneWidth * 0.3;
	const missileHeight = missileWidth * 1.7;
	const posX = laneIndex * laneWidth + laneWidth / 2 - missileWidth / 2;
	const posY = useSharedValue(
		role === Role.Marine ? marineCollisionY - missileHeight : screenHeight,
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		posY.value = withTiming(
			-missileHeight,
			{ duration: MISSILE_SPEED, easing: Easing.out(Easing.ease) },
			() => {
				runOnJS(setIsActive)(false);
			},
		);

		return () => {
			cancelAnimation(posY);
		};
	}, [missileHeight]);

	if (!isActive) {
		return null;
	}

	return (
		<Rect
			x={posX}
			y={posY}
			width={missileWidth}
			height={missileHeight}
			color="red"
		/>
	);
};

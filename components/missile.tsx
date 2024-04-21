import { Rect } from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";
import {
	GRID_NUM,
	MISSILE_SPEED,
	SHIP_HEIGHT_RATIO,
	SHIP_POSITION_Y_RATIO,
} from "../constants/values";
import {
	useSharedValue,
	type SharedValue,
	withTiming,
	cancelAnimation,
} from "react-native-reanimated";
import { useEffect } from "react";

interface Props {
	lanePos: SharedValue<number>;
	isActive: SharedValue<boolean>;
}

export const Missile = ({ lanePos, isActive }: Props) => {
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();
	const shipHeight = screenHeight * SHIP_HEIGHT_RATIO;
	const laneWidth = screenWidth / GRID_NUM;
	const lane = laneWidth * lanePos.value;

	const missileWidth = laneWidth * 0.3;
	const missileHeight = missileWidth * 1.7;

	const posX = lane + laneWidth / 2 - missileWidth / 2;

	const defaultPosY =
		screenHeight - screenHeight * SHIP_POSITION_Y_RATIO - shipHeight;
	const posY = useSharedValue(defaultPosY);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		posY.value = withTiming(-missileHeight, { duration: MISSILE_SPEED }, () => {
			posY.value = defaultPosY;
			isActive.value = false;
		});

		return () => {
			cancelAnimation(posY);
		};
	}, []);

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

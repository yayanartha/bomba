import { Image, useImage } from "@shopify/react-native-skia";
import { useSharedValue, useFrameCallback } from "react-native-reanimated";
import { useGameEngine } from "../hooks/use-game-engine";
import { Role } from "../constants/types";
import { MINE_SPEED } from "../constants/values";

interface Props {
	laneIndex: number;
}

export const Mine = ({ laneIndex }: Props) => {
	const { screenHeight, laneWidth, pirateCollisionY, role } = useGameEngine();
	const mine = useImage(require("../assets/mine.png"));

	const posX = laneIndex * laneWidth;
	const posY = useSharedValue(
		role === Role.Pirate ? pirateCollisionY - laneWidth : -laneWidth,
	);
	const isActive = useSharedValue(true);

	useFrameCallback(() => {
		if (posY.value >= screenHeight && isActive.value) {
			isActive.value = false;
			// Send mine to WS.
		} else {
			posY.value += MINE_SPEED;
		}
	});

	if (!isActive.value) {
		return null;
	}

	return (
		<Image
			image={mine}
			x={posX}
			y={posY}
			width={laneWidth}
			height={laneWidth}
		/>
	);
};

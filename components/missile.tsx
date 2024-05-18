import { Image, useImage } from "@shopify/react-native-skia";
import { useSharedValue, useFrameCallback } from "react-native-reanimated";
import { useGameEngine } from "../hooks/use-game-engine";
import { Role } from "../constants/types";
import { MISSILE_SPEED } from "../constants/values";

interface Props {
	laneIndex: number;
}

export const Missile = ({ laneIndex }: Props) => {
	const { screenHeight, laneWidth, marineCollisionY, role } = useGameEngine();
	const missile = useImage(require("../assets/missile.png"));

	const posX = laneIndex * laneWidth;
	const posY = useSharedValue(
		role === Role.Marine ? marineCollisionY - laneWidth : screenHeight,
	);
	const isActive = useSharedValue(true);

	useFrameCallback(() => {
		if (posY.value <= -laneWidth && isActive.value) {
			isActive.value = false;
			// TODO: Send missile to WS.
		} else {
			posY.value -= MISSILE_SPEED;
		}
	});

	if (!isActive.value) {
		return null;
	}

	return (
		<Image
			image={missile}
			x={posX}
			y={posY}
			width={laneWidth}
			height={laneWidth}
		/>
	);
};

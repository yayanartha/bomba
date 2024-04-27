import { Image, useImage } from "@shopify/react-native-skia";
import { useGameEngine } from "../hooks/use-game-engine";

interface Props {
	xPos: number;
	yPos: number;
}

export const Ship = ({ xPos, yPos }: Props) => {
	const { laneWidth, shipHeight } = useGameEngine();

	const image = useImage(require("../assets/battleship.png"));

	return (
		<Image
			image={image}
			fit="cover"
			x={xPos}
			y={yPos}
			width={laneWidth}
			height={shipHeight}
			opacity={0.5}
		/>
	);
};

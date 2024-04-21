import { Image, useImage } from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";
import { GRID_NUM, SHIP_HEIGHT_RATIO } from "../constants/values";

interface Props {
	xPos: number;
	yPos: number;
}

export const Ship = ({ xPos, yPos }: Props) => {
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();
	const shipHeight = screenHeight * SHIP_HEIGHT_RATIO;

	const image = useImage(require("../assets/battleship.png"));

	return (
		<Image
			image={image}
			fit="cover"
			x={xPos}
			y={yPos}
			width={screenWidth / GRID_NUM}
			height={shipHeight}
		/>
	);
};

import { Image, useImage, Group } from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";
import { GRID_NUM } from "../constants/values";

export const Ship = () => {
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();

	const image = useImage(require("../assets/battleship.png"));

	return (
		<Image
			image={image}
			fit="contain"
			x={screenWidth / GRID_NUM}
			y={screenHeight - 256}
			width={screenWidth / GRID_NUM}
			height={256}
		/>
	);
};

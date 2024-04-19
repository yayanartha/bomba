import { Canvas, Fill } from "@shopify/react-native-skia";

import { useWindowDimensions } from "react-native";
import { colors } from "../constants/colors";
import { Text } from "../components/text";
import { Board } from "../components/board";
import { Ship } from "../components/ship";

export default function App() {
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();

	return (
		<Canvas style={{ flex: 1 }}>
			<Fill color={colors.aero} />

			<Board />

			<Ship />

			<Text text={"Score: 17"} x={24} y={100} />
		</Canvas>
	);
}

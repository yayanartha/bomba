import { Canvas, RoundedRect, Shadow } from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";
import { Text } from "../components/text";
import { colors } from "../constants/colors";

export default function ResultModal() {
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();

	const modalSize = screenWidth - 48;
	const modalMaxWidth = 480;

	return (
		<Canvas
			style={{
				flex: 1,
				backgroundColor: "transparent",
			}}
		>
			<RoundedRect
				x={24}
				y={screenHeight / 2 - modalSize / 2}
				width={modalSize}
				height={modalSize}
				r={16}
				color={colors.white}
			>
				<Shadow dx={0} dy={0} blur={100} color={colors.oxfordBlue} />
			</RoundedRect>

			<Text
				x={24}
				y={screenHeight / 2 - modalSize / 2 - 32 - 16}
				text="Time's Up"
				size={32}
				width={modalSize}
				center
			/>
		</Canvas>
	);
}

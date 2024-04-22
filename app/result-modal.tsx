import { Canvas, Group, RoundedRect, Shadow } from "@shopify/react-native-skia";
import { Pressable, View, useWindowDimensions, StyleSheet } from "react-native";
import { Text } from "../components/text";
import { colors } from "../constants/colors";
import { router } from "expo-router";
import { Button } from "../components/button";
import Reanimated, {
	FadeIn,
	FadeInDown,
	ZoomIn,
} from "react-native-reanimated";

export default function ResultModal() {
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();

	const modalSize = screenWidth - 48;
	const modalMaxWidth = 480;

	const restartGame = () => {
		router.replace("/");
	};

	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "transparent",
				gap: 16,
			}}
		>
			<Reanimated.View
				entering={FadeIn.delay(400)}
				style={{
					...StyleSheet.absoluteFillObject,
					backgroundColor: `${colors.oxfordBlue}bb`,
				}}
			/>

			<Reanimated.View entering={ZoomIn.springify()}>
				<Canvas
					style={{
						width: modalSize,
						height: modalSize + 32 + 16,
						backgroundColor: "transparent",
					}}
				>
					<Text
						x={0}
						y={0}
						text="Time's Up"
						size={32}
						width={modalSize}
						center
					/>

					<RoundedRect
						x={0}
						y={48}
						width={modalSize}
						height={modalSize}
						r={16}
						color={colors.white}
					/>
				</Canvas>
			</Reanimated.View>

			<Reanimated.View entering={FadeInDown.delay(400).springify()}>
				<Button
					onPresss={restartGame}
					width={modalSize}
					text="Play Again"
					backgroundColor={colors.yellow}
					foregroundColor={colors.oxfordBlue}
				/>
			</Reanimated.View>

			<Reanimated.View entering={FadeInDown.delay(600).springify()}>
				<Button
					onPresss={restartGame}
					width={modalSize}
					text="Exit"
					backgroundColor={colors.red}
				/>
			</Reanimated.View>
		</View>
	);
}

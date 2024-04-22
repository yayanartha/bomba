import { Canvas } from "@shopify/react-native-skia";
import { Pressable } from "react-native";
import { Text } from "./text";
import { colors } from "../constants/colors";
import Reanimated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";

interface Props {
	width: number;
	text: string;
	backgroundColor: string;
	foregroundColor?: string;
	onPresss?(): void;
}

export const Button = ({
	width,
	text,
	backgroundColor,
	foregroundColor = colors.white,
	onPresss,
}: Props) => {
	const scale = useSharedValue(1);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }],
		};
	});

	return (
		<Reanimated.View
			style={[
				animatedStyle,
				{
					borderWidth: 1.5,
					borderColor: colors.oxfordBlue,
					borderRadius: 16,
					backgroundColor,
					overflow: "hidden",
				},
			]}
		>
			<Pressable
				onPress={onPresss}
				onPressIn={() => {
					scale.value = withSpring(0.95);
				}}
				onPressOut={() => {
					scale.value = withSpring(1);
				}}
				style={{
					width,
					height: 50,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Canvas
					style={{
						width,
						height: 50,
						alignItems: "center",
						justifyContent: "center",
						borderRadius: 16,
					}}
				>
					<Text
						text={text}
						width={width - 32}
						x={16}
						y={25 - 16}
						center
						enableStroke={false}
						color={foregroundColor}
					/>
				</Canvas>
			</Pressable>
		</Reanimated.View>
	);
};

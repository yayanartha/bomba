import { Canvas } from "@shopify/react-native-skia";
import { ActivityIndicator, Pressable } from "react-native";
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
	isLoading?: boolean;
	disabled?: boolean;
}

export const Button = ({
	width,
	text,
	backgroundColor,
	foregroundColor = colors.white,
	onPresss,
	isLoading = false,
	disabled = false,
}: Props) => {
	const scale = useSharedValue(1);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }],
		};
	});

	const isDisabled = isLoading || disabled;

	return (
		<Reanimated.View
			style={[
				animatedStyle,
				{
					borderWidth: 1.5,
					borderColor: colors.oxfordBlue,
					borderRadius: 16,
					backgroundColor: isDisabled
						? `${backgroundColor}B3`
						: backgroundColor,
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
				disabled={isDisabled}
				style={{
					width,
					height: 50,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{isLoading ? (
					<ActivityIndicator color={foregroundColor} />
				) : (
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
				)}
			</Pressable>
		</Reanimated.View>
	);
};

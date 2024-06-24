import {
	Group,
	Image,
	rect,
	useAnimatedImageValue,
} from "@shopify/react-native-skia";
import { useGameEngine } from "../hooks/use-game-engine";
import {
	interpolate,
	useDerivedValue,
	useFrameCallback,
	useSharedValue,
} from "react-native-reanimated";
import { randomNumberBetween } from "../utils/number";
import { Extrapolate } from "@shopify/react-native-skia";

interface Props {
	x: number;
	y: number;
	width?: number;
	height?: number;
}

export const Wave = ({ x, y, width, height }: Props) => {
	const { laneWidth, screenWidth, screenHeight } = useGameEngine();
	const wave = useAnimatedImageValue(require("../assets/wave.webp"));
	const waveGap = laneWidth * 0.2;

	const positionX = useSharedValue(x);
	const translationX = useSharedValue(randomNumberBetween(-waveGap, waveGap));
	const translateRight = useSharedValue(false);
	const positionY = useSharedValue(y);

	useFrameCallback(() => {
		if (translationX.value > waveGap) {
			translateRight.value = false;
		} else if (translationX.value < -waveGap) {
			translateRight.value = true;
		}

		if (translateRight.value) {
			translationX.value += 0.1;
		} else {
			translationX.value -= 0.1;
		}

		positionY.value += 0.5;

		if (positionY.value > screenHeight) {
			positionX.value = randomNumberBetween(
				-laneWidth / 2,
				screenWidth - laneWidth + waveGap,
			);
			translationX.value = randomNumberBetween(-waveGap, waveGap);
			positionY.value = randomNumberBetween(-30, -screenHeight / 2);
		}
	});

	const transform = useDerivedValue(() => {
		return [
			{ translateX: positionX.value + translationX.value },
			{ translateY: positionY.value },
		];
	});

	const opacity = useDerivedValue(() => {
		return interpolate(
			positionY.value,
			[0, screenHeight * 0.3],
			[0, 0.8],
			Extrapolate.CLAMP,
		);
	});

	return (
		<Group transform={transform} opacity={opacity}>
			<Image
				image={wave}
				width={width || laneWidth}
				height={height || laneWidth / 2}
			/>
		</Group>
	);
};

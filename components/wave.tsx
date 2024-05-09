import {
	Group,
	Image,
	rect,
	useAnimatedImageValue,
} from "@shopify/react-native-skia";
import { useGameEngine } from "../hooks/use-game-engine";
import {
	useDerivedValue,
	useFrameCallback,
	useSharedValue,
} from "react-native-reanimated";
import { randomNumberBetween } from "../utils/number";

interface Props {
	x: number;
	y: number;
}

export const Wave = ({ x, y }: Props) => {
	const { laneWidth, screenWidth, screenHeight } = useGameEngine();
	const wave = useAnimatedImageValue(require("../assets/wave.webp"));
	const waveWidth = laneWidth * 0.8;
	const waveGap = laneWidth * 0.2;
	const waveHeight = randomNumberBetween(30, 60);

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

	return (
		<Group transform={transform}>
			<Image
				image={wave}
				width={randomNumberBetween(laneWidth, laneWidth * 2)}
				height={waveHeight}
				rect={rect(
					0,
					0,
					randomNumberBetween(waveWidth, waveWidth * 2),
					waveHeight,
				)}
			/>
		</Group>
	);
};

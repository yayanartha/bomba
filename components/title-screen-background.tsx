import {
	Canvas,
	Fill,
	Group,
	Image,
	LinearGradient,
	interpolateColors,
	useAnimatedImageValue,
	useImage,
	vec,
} from "@shopify/react-native-skia";
import { StyleSheet, useWindowDimensions } from "react-native";
import { colors } from "../constants/colors";
import {
	Easing,
	useDerivedValue,
	useSharedValue,
	withRepeat,
	withSequence,
	withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { randomNumberBetween } from "../utils/number";

const startColors = [colors.oxfordBlue, colors.royalBlue];
const endColors = [colors.aero, colors.greenBlue];
const EASING = Easing.elastic(1.5);

export const TitleScreenBackground = () => {
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();
	const pirateShip = useImage(require("../assets/pirate.png"));
	const marineShip = useImage(require("../assets/marine.png"));
	const wave = useAnimatedImageValue(require("../assets/wave.webp"));

	const colorsIndex = useSharedValue(0);
	const pirateShipPosition = useSharedValue({
		x: -screenWidth / 2,
		y: -screenWidth / 2,
	});
	const marineShipPosition = useSharedValue({
		x: screenWidth / 3,
		y: screenHeight / 1.5,
	});

	useEffect(() => {
		colorsIndex.value = withRepeat(
			withTiming(startColors.length - 1, {
				duration: 4000,
			}),
			-1,
			true,
		);

		pirateShipPosition.value = withRepeat(
			withSequence(
				withTiming(
					{
						x: randomNumberBetween(-30, -80),
						y: randomNumberBetween(-50, -100),
					},
					{ duration: randomNumberBetween(2000, 4000), easing: EASING },
				),
				withTiming(
					{
						x: randomNumberBetween(-30, -80),
						y: randomNumberBetween(-50, -100),
					},
					{ duration: randomNumberBetween(2000, 4000), easing: EASING },
				),
				withTiming(
					{
						x: randomNumberBetween(-30, -80),
						y: randomNumberBetween(-50, -100),
					},
					{ duration: randomNumberBetween(2000, 4000), easing: EASING },
				),
				withTiming(
					{
						x: randomNumberBetween(-30, -80),
						y: randomNumberBetween(-50, -100),
					},
					{ duration: randomNumberBetween(2000, 4000), easing: EASING },
				),
			),
			-1,
			true,
		);

		marineShipPosition.value = withRepeat(
			withSequence(
				withTiming(
					{
						x: randomNumberBetween(-30, -80),
						y: randomNumberBetween(-50, -100),
					},
					{ duration: randomNumberBetween(3000, 5000), easing: EASING },
				),
				withTiming(
					{
						x: randomNumberBetween(-30, -80),
						y: randomNumberBetween(-50, -100),
					},
					{ duration: randomNumberBetween(3000, 5000), easing: EASING },
				),
				withTiming(
					{
						x: randomNumberBetween(-30, -80),
						y: randomNumberBetween(-50, -100),
					},
					{ duration: randomNumberBetween(3000, 5000), easing: EASING },
				),
				withTiming(
					{
						x: randomNumberBetween(-30, -80),
						y: randomNumberBetween(-50, -100),
					},
					{ duration: randomNumberBetween(3000, 5000), easing: EASING },
				),
			),
			-1,
			true,
		);
	}, [colorsIndex, pirateShipPosition, marineShipPosition]);

	const gradientColors = useDerivedValue(() => {
		return [
			interpolateColors(colorsIndex.value, [0, 1], startColors),
			interpolateColors(colorsIndex.value, [0, 1], endColors),
		];
	});

	const pirateShipTransform = useDerivedValue(() => [
		{ translateX: pirateShipPosition.value.x },
		{ translateY: pirateShipPosition.value.y },
	]);

	const marineShipTransform = useDerivedValue(() => [
		{ translateX: marineShipPosition.value.x },
		{ translateY: marineShipPosition.value.y },
	]);

	return (
		<Canvas style={StyleSheet.absoluteFillObject}>
			<Fill>
				<LinearGradient
					start={vec(0, 0)}
					end={vec(screenWidth, screenHeight)}
					colors={gradientColors}
				/>
			</Fill>

			<Group transform={pirateShipTransform}>
				<Image
					image={wave}
					width={screenWidth / 2}
					height={screenWidth / 2}
					opacity={0.5}
					x={screenWidth / 12}
					y={screenWidth / 3}
				/>
				<Image
					image={wave}
					width={screenWidth / 2.5}
					height={screenWidth / 2}
					opacity={0.5}
					x={screenWidth / 10}
					y={screenWidth / 2.3}
				/>
				<Image
					image={pirateShip}
					width={screenWidth}
					height={screenWidth}
					x={-screenWidth / 5}
					y={-screenWidth / 5}
				/>
			</Group>

			<Group transform={marineShipTransform}>
				<Image
					image={wave}
					width={screenWidth / 1.2}
					height={screenWidth / 2}
					opacity={0.5}
					x={screenWidth / 2.3}
					y={screenHeight - 100}
				/>
				<Image
					image={wave}
					width={screenWidth / 1.5}
					height={screenWidth / 2}
					opacity={0.5}
					x={screenWidth / 2}
					y={screenHeight - 50}
				/>
				<Image
					image={marineShip}
					width={screenWidth}
					height={screenWidth}
					x={screenWidth / 3}
					y={screenHeight / 1.5}
				/>
			</Group>
		</Canvas>
	);
};

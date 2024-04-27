import { useEffect, useState } from "react";
import { Text } from "./text";
import { Canvas } from "@shopify/react-native-skia";
import { useGameEngine } from "../hooks/use-game-engine";
import { View, StyleSheet } from "react-native";

export const StartCountdown = () => {
	const { screenWidth } = useGameEngine();
	const [timer, setTimer] = useState(3);

	useEffect(() => {
		const interval = setInterval(() => {
			setTimer((prevState) => {
				if (prevState > 0) {
					return prevState - 1;
				}

				clearInterval(interval);
				return prevState;
			});
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<View
			style={{
				...StyleSheet.absoluteFillObject,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Canvas style={{ width: screenWidth, height: 90 }}>
				<Text
					text={timer === 0 ? "START" : timer.toString()}
					x={0}
					y={0}
					size={90}
					width={screenWidth}
					center
				/>
			</Canvas>
		</View>
	);
};

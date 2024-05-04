import { Pressable, StyleSheet, View } from "react-native";
import { RandomAvatar } from "./random-avatar";
import { Canvas } from "@shopify/react-native-skia";
import { Text } from "./text";
import { useGameEngine } from "../hooks/use-game-engine";
import { useGameChannel } from "../hooks/use-game-channel";
import { colors } from "../constants/colors";

interface Props {
	roleName: string;
	playerNames: string[];
	onPress(): void;
}

export const RoleAvatar = ({ roleName, playerNames, onPress }: Props) => {
	const { screenWidth, laneWidth } = useGameEngine();
	const { username: myName } = useGameChannel();

	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => ({
				width: screenWidth,
				height: laneWidth,
				flexDirection: "row",
				alignItems: "center",
				gap: 8,
				opacity: pressed ? 0.6 : 1,
				// backgroundColor: "orange",
			})}
		>
			<View style={{ flex: 1, alignItems: "flex-end" }}>
				<Canvas style={{ width: 90, height: 24 }}>
					<Text x={0} y={0} size={20} text={roleName} width={100} center />
				</Canvas>
			</View>

			<View style={{ width: laneWidth }}>
				{!playerNames.length ? (
					<View
						style={{
							width: laneWidth,
							height: laneWidth,
							borderRadius: laneWidth / 2,
							backgroundColor: colors.royalBlue,
						}}
					>
						<Canvas style={{ width: laneWidth, height: laneWidth }}>
							<Text
								x={0}
								y={laneWidth * 0.2}
								text={roleName[0].toUpperCase()}
								width={laneWidth}
								center
								size={laneWidth * 0.5}
							/>
						</Canvas>
					</View>
				) : (
					<RandomAvatar name={playerNames[0]} size={laneWidth} />
				)}
			</View>

			<View style={{ flex: 1 }}>
				{playerNames.map((playerName) => {
					const isYou = playerName === myName;

					return (
						<View
							key={playerName}
							style={{
								flexDirection: "row",
								alignItems: "center",
								height: laneWidth / 2,
							}}
						>
							<View style={styles.triangle} />
							<View style={{ flex: 1 }}>
								<Canvas style={{ width: laneWidth * 2 - 8, height: 24 }}>
									<Text
										x={8}
										y={0}
										size={20}
										text={isYou ? "You" : playerName}
										color={isYou ? colors.yellow : colors.white}
										width={laneWidth * 2 - 8}
									/>
								</Canvas>
							</View>
						</View>
					);
				})}
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	triangle: {
		width: 0,
		height: 0,
		backgroundColor: "transparent",
		borderStyle: "solid",
		borderLeftWidth: 6,
		borderRightWidth: 6,
		borderBottomWidth: 12,
		borderLeftColor: "transparent",
		borderRightColor: "transparent",
		borderBottomColor: colors.oxfordBlue,
		transform: [{ rotate: "-90deg" }],
	},
});

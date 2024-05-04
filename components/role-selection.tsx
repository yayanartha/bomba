import { View, StyleSheet, Alert } from "react-native";
import { useGameEngine } from "../hooks/use-game-engine";
import { useGameChannel } from "../hooks/use-game-channel";
import { RoleAvatar } from "./role-avatar";
import { Canvas } from "@shopify/react-native-skia";
import { Text } from "./text";
import Reanimated, { FadeInDown, FadeOut } from "react-native-reanimated";
import { colors } from "../constants/colors";
import { Role } from "../constants/types";
import { useMemo } from "react";
import { Button } from "./button";
import { Redirect, router } from "expo-router";

export const RoleSelection = () => {
	const { screenWidth, screenHeight, startGame, laneWidth } = useGameEngine();
	const { username, players, selectRole } = useGameChannel();
	const contentHeight = 50 + 30 + laneWidth + 30 + laneWidth + 30 + 50;

	console.log("PLAYERS", players);

	const myRole = useMemo(() => {
		return players.find((o) => o.username === username)?.role;
	}, [players, username]);

	const piratePlayers = useMemo(() => {
		const p = players.filter((o) => o.role === Role.Pirate);
		return p.map((o) => o.username);
	}, [players]);

	const marinePlayers = useMemo(() => {
		const p = players.filter((o) => o.role === Role.Marine);
		return p.map((o) => o.username);
	}, [players]);

	const allRolesFilled = useMemo(() => {
		const hasPirate = players.findIndex((o) => o.role === Role.Pirate) > -1;
		const hasMarine = players.findIndex((o) => o.role === Role.Marine) > -1;
		return hasPirate && hasMarine;
	}, [players]);

	const handleStart = () => {
		console.log(typeof myRole === "undefined", !allRolesFilled);
		if (typeof myRole === "undefined" || !allRolesFilled) {
			return Alert.alert("Hold On", "Must fill in all roles first");
		}

		startGame(myRole);
	};

	if (players.length < 1) {
		return <Redirect href="/" />;
	}

	if (players.length < 2) {
		return (
			<Reanimated.View
				entering={FadeInDown.duration(400)}
				style={styles.container}
			>
				<Canvas
					style={{
						width: screenWidth,
						height: 50,
					}}
				>
					<Text
						x={0}
						y={0}
						text="Waiting for opponent"
						width={screenWidth}
						center
						size={30}
					/>
				</Canvas>
			</Reanimated.View>
		);
	}

	return (
		<Reanimated.View
			entering={FadeInDown.duration(400)}
			exiting={FadeOut.duration(200)}
			style={styles.container}
		>
			<Canvas
				style={{
					width: 260,
					height: 50,
					backgroundColor: colors.oxfordBlue,
				}}
			>
				<Text
					x={0}
					y={8}
					text="Tap to select role"
					size={30}
					width={260}
					center
				/>
			</Canvas>

			<RoleAvatar
				roleName="Pirate"
				playerNames={piratePlayers}
				onPress={() => selectRole(Role.Pirate)}
			/>

			<RoleAvatar
				roleName="Marine"
				playerNames={marinePlayers}
				onPress={() => selectRole(Role.Marine)}
			/>

			<Button
				text="Commence Battle"
				onPresss={handleStart}
				width={screenWidth - 48}
				backgroundColor={colors.red}
			/>

			{/* <View
				style={{
					position: "absolute",
					borderWidth: 2,
					borderColor: "green",
					width: screenWidth,
					height: contentHeight,
				}}
			/> */}

			{/* <View
				style={{
					position: "absolute",
					top: screenHeight / 2 - contentHeight / 2 + 50 + 30 - 2,
					left: laneWidth * 2,
					borderWidth: 2,
					borderColor: "red",
					width: laneWidth,
					height: laneWidth,
				}}
			/> */}
			{/* <View
				style={{
					position: "absolute",
					top:
						screenHeight / 2 - contentHeight / 2 + 50 + 30 + laneWidth + 30 - 2,
					left: laneWidth * 2,
					borderWidth: 2,
					borderColor: "green",
					width: laneWidth,
					height: laneWidth,
				}}
			/> */}
		</Reanimated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		gap: 30,
	},
});

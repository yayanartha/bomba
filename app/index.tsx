import { Canvas } from "@shopify/react-native-skia";
import { router } from "expo-router";
import {
	Alert,
	StyleSheet,
	View,
	useWindowDimensions,
	Text as RNText,
} from "react-native";
import { Button } from "../components/button";
import { colors } from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../components/text";
import { RandomAvatar } from "../components/random-avatar";
import { TextInput } from "../components/text-input";
import Reanimated, {
	BounceIn,
	LinearTransition,
	FadeOut,
	FadeInDown,
} from "react-native-reanimated";
import { useGameChannel } from "../hooks/use-game-channel";
import { useState } from "react";
import { useUser } from "../hooks/use-user";
import { TitleScreenBackground } from "../components/title-screen-background";

export default function Index() {
	const { width: screenWidth } = useWindowDimensions();
	const { userId, loading: userLoading } = useUser();
	const { enterChannel, loading: channelLoading } = useGameChannel();

	const [username, setUsername] = useState("");
	const [channelCode, setChannelCode] = useState("");

	const handleEnterChannel = async () => {
		if (!username.length) {
			return Alert.alert("Cannot Proceed", "Username must not be empty");
		}

		if (!channelCode.length) {
			return Alert.alert("Cannot Proceed", "Channel must not be empty");
		}

		try {
			await enterChannel(username, channelCode);
			router.navigate(`/channel/${channelCode}?username=${username}`);
		} catch (error) {
			console.error(error.message);
			Alert.alert("Failed", error.message);
		}
	};

	if (userLoading) {
		return (
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.oxfordBlue }]}
			>
				<Canvas style={{ width: screenWidth - 48, height: 50 }}>
					<Text
						x={0}
						y={0}
						size={24}
						text="Connecting user's data..."
						width={screenWidth - 48}
						center
					/>
				</Canvas>
			</SafeAreaView>
		);
	}

	return (
		<View style={{ flex: 1, backgroundColor: colors.aero }}>
			<TitleScreenBackground />

			<SafeAreaView style={styles.container}>
				<Reanimated.View
					entering={FadeInDown.duration(400)}
					layout={LinearTransition}
				>
					<Canvas style={{ width: screenWidth - 48, height: 60 }}>
						<Text
							x={0}
							y={0}
							size={60}
							text="Bomba!"
							width={screenWidth - 48}
							center
						/>
					</Canvas>
				</Reanimated.View>

				{username.length > 0 && (
					<Reanimated.View
						layout={LinearTransition}
						entering={BounceIn.springify()}
						exiting={FadeOut.duration(200)}
						style={{ alignSelf: "center" }}
					>
						<RandomAvatar name={username} size={80} />
					</Reanimated.View>
				)}

				<Reanimated.View
					style={{ gap: 8 }}
					entering={FadeInDown.duration(400).delay(200)}
					layout={LinearTransition}
				>
					<TextInput
						placeholder="Username"
						value={username}
						onChangeText={setUsername}
					/>

					<TextInput
						placeholder="Channel"
						value={channelCode}
						onChangeText={setChannelCode}
						keyboardType="number-pad"
					/>
				</Reanimated.View>

				<Reanimated.View
					entering={FadeInDown.duration(400).delay(400)}
					layout={LinearTransition}
				>
					<Button
						onPresss={handleEnterChannel}
						width={screenWidth - 48}
						foregroundColor={colors.oxfordBlue}
						backgroundColor={colors.yellow}
						text="Enter"
						isLoading={channelLoading}
					/>
				</Reanimated.View>

				<RNText style={{ textAlign: "center", color: colors.white }}>
					Player ID: {userId}
				</RNText>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		gap: 32,
		paddingHorizontal: 24,
	},
});

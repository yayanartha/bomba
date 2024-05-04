import { Canvas } from "@shopify/react-native-skia";
import { router } from "expo-router";
import { useWindowDimensions } from "react-native";
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

export default function Index() {
	const { width: screenWidth } = useWindowDimensions();
	const { username, setUsername, channelName, setChannelName, joinChannel } =
		useGameChannel();

	const startGame = () => {
		joinChannel(() =>
			router.navigate(`/channel/${channelName}?username=${username}`),
		);
	};

	return (
		<SafeAreaView
			style={{
				flex: 1,
				justifyContent: "center",
				backgroundColor: colors.aero,
				gap: 32,
				paddingHorizontal: 24,
			}}
		>
			<Reanimated.View
				entering={FadeInDown.duration(400)}
				layout={LinearTransition}
			>
				<Canvas style={{ width: screenWidth - 48, height: 60 }}>
					<Text
						x={0}
						y={0}
						size={60}
						text="BOMBA!"
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
					value={channelName}
					onChangeText={setChannelName}
					keyboardType="number-pad"
				/>
			</Reanimated.View>

			<Reanimated.View
				entering={FadeInDown.duration(400).delay(400)}
				layout={LinearTransition}
			>
				<Button
					onPresss={startGame}
					width={screenWidth - 48}
					backgroundColor={colors.persianBlue}
					text="Start Game"
				/>
			</Reanimated.View>
		</SafeAreaView>
	);
}

import { Stack } from "expo-router";
import { GameEngineProvider } from "../../providers/game-engine-provider";

export default function InGameLayout() {
	return (
		<GameEngineProvider>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="[channel]" />
				<Stack.Screen
					name="result-modal"
					options={{ presentation: "transparentModal" }}
				/>
			</Stack>
		</GameEngineProvider>
	);
}

import { Stack } from "expo-router";
import { GameEngineProvider } from "../../providers/game-engine-provider";
import { FiberProvider } from "its-fine";

export default function InGameLayout() {
	return (
		<FiberProvider>
			<GameEngineProvider>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name="index" />
					<Stack.Screen
						name="result-modal"
						options={{ presentation: "transparentModal" }}
					/>
				</Stack>
			</GameEngineProvider>
		</FiberProvider>
	);
}

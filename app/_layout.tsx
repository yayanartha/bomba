import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GameChannelProvider } from "../providers/game-channel-provider";
import { FiberProvider } from "its-fine";
import { UserProvider } from "../providers/user-provider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [fontsLoaded, fontError] = useFonts({
		"Gilroy-ExtraBold": require("../assets/fonts/Gilroy-ExtraBold.ttf"),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
			<FiberProvider>
				<UserProvider>
					<GameChannelProvider>
						<Stack screenOptions={{ headerShown: false }}>
							<Stack.Screen name="index" />
							<Stack.Screen name="channel" />
						</Stack>
					</GameChannelProvider>
				</UserProvider>
			</FiberProvider>
		</GestureHandlerRootView>
	);
}

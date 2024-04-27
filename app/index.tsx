import { Link } from "expo-router";
import { Button, View } from "react-native";

export default function Index() {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Link href="(in-game)" asChild>
				<Button title="Start Game" />
			</Link>
		</View>
	);
}

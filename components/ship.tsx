import { useGameEngine } from "../hooks/use-game-engine";
import { useGameChannel } from "../hooks/use-game-channel";
import { RandomAvatar } from "./random-avatar";
import Reanimated, {
	useAnimatedStyle,
	type SharedValue,
} from "react-native-reanimated";
import { SHIP_HEIGHT_RATIO } from "../constants/values";

interface Props {
	image: number;
	flagScale: SharedValue<number>;
}

export const Ship = ({ image, flagScale }: Props) => {
	const { laneWidth, shipHeight } = useGameEngine();
	const { username } = useGameChannel();

	const flagStyle = useAnimatedStyle(() => ({
		transform: [{ scale: flagScale.value }],
	}));

	return (
		<>
			<Reanimated.Image
				source={image}
				style={{
					width: laneWidth,
					height: shipHeight,
					resizeMode: "contain",
					position: "absolute",
				}}
			/>
			<Reanimated.View style={flagStyle}>
				<RandomAvatar name={username} size={laneWidth} />
			</Reanimated.View>
		</>
	);
};

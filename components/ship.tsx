import { useGameEngine } from "../hooks/use-game-engine";
import { useGameChannel } from "../hooks/use-game-channel";
import { RandomAvatar } from "./random-avatar";

export const Ship = () => {
	const { laneWidth } = useGameEngine();
	const { username } = useGameChannel();

	return <RandomAvatar name={username} size={laneWidth} />;
};

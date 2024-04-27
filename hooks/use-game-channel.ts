import { useContext } from "react";
import { GameChannelContext } from "../providers/game-channel-provider";

export const useGameChannel = () => {
	const context = useContext(GameChannelContext);

	if (!context) {
		throw new Error(
			"Component must be rendered as a child of GameChannelProvider",
		);
	}

	return context;
};

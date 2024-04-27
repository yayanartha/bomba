import { useContext } from "react";
import { GameEngineContext } from "../providers/game-engine-provider";

export const useGameEngine = () => {
	const context = useContext(GameEngineContext);

	if (!context) {
		throw new Error(
			"Component must be rendered as a child of GameEngineProvider",
		);
	}

	return context;
};

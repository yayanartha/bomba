import {
	type PropsWithChildren,
	createContext,
	useMemo,
	useState,
	useCallback,
} from "react";
import { useWindowDimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";

enum Role {
	Pirate = 0,
	Marine = 1,
}

interface GameEngineContext {
	screenWidth: number;
	screenHeight: number;
	role?: Role;
	startGame(role: Role): void;
}

export const GameEngineContext = createContext({} as GameEngineContext);

export const GameEngineProvider = ({ children }: PropsWithChildren) => {
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();

	const [role, setRole] = useState<Role>();
	const [showStartCountdown, setShowStartCountdown] = useState(false);
	const missiles = useSharedValue<number[]>([]);
	const mines = useSharedValue<number[]>([]);

	const startGame = useCallback((role: Role) => {
		setRole(role);
		setShowStartCountdown(true);
	}, []);

	const fireMissile = useCallback(
		(laneIndex: number) => {
			missiles.value.push(laneIndex);
			// Publish to channel
		},
		[missiles],
	);

	const dropMine = useCallback(
		(laneIndex: number) => {
			mines.value.push(laneIndex);
			// Publish to channel
		},
		[mines],
	);

	const onHitByMissile = useCallback(() => {
		// Reduce The Pirate's HP by 1
		// if HP == 0, game over -> The Marine wins
	}, []);

	const onHitByMine = useCallback(() => {
		// Reduce The Marine's ATB fill rate
	}, []);

	const onTimeout = useCallback(() => {
		// The Pirate wins
		// Show game stats
	}, []);

	const restartGame = useCallback(() => {
		// Reset the variables
		// Start the game
	}, []);

	const quitGame = useCallback(() => {
		// Leave from channel
	}, []);

	const contextValue = useMemo(
		() => ({
			screenWidth,
			screenHeight,
			role,
			startGame,
		}),
		[screenWidth, screenHeight, role, startGame],
	);

	return (
		<GameEngineContext.Provider value={contextValue}>
			{children}
		</GameEngineContext.Provider>
	);
};

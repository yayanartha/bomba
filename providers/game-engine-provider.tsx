import {
	createContext,
	useMemo,
	useState,
	useRef,
	useEffect,
	type PropsWithChildren,
} from "react";
import { useWindowDimensions } from "react-native";
import {
	Easing,
	type SharedValue,
	cancelAnimation,
	runOnJS,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import {
	ATB_ACTION_POINT,
	ATB_MOVE_POINT,
	DEFAULT_ATB_FILL_RATE,
	GRID_NUM,
	MINE_COOLDOWN,
	MISSILE_COOLDOWN,
	SHIP_MOVEMENT_SPEED,
} from "../constants/values";
import { randomNumberBetween } from "../utils/number";
import { router } from "expo-router";
import { Role } from "../constants/types";

interface GameEngineContext {
	screenWidth: number;
	screenHeight: number;
	role?: Role;
	missiles: number[];
	setMissiles: React.Dispatch<React.SetStateAction<number[]>>;
	mines: number[];
	setMines: React.Dispatch<React.SetStateAction<number[]>>;
	actionCooldown: SharedValue<number>;
	atbGauge: SharedValue<number>;
	laneIndex: SharedValue<number>;
	laneWidth: number;
	startGame(role: Role): void;
	showStartCountdown: boolean;
	fireMissile(): void;
	dropMine(): void;
	onMove(direction: "left" | "right"): void;
	onColideWithMissile(): void;
	onCollideWithMine(): void;
	restartGame(): void;
	quitGame(): void;
	onTimeOut(): void;
}

export const GameEngineContext = createContext({} as GameEngineContext);

export const GameEngineProvider = ({ children }: PropsWithChildren) => {
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();

	const [role, setRole] = useState<Role>();
	const [showStartCountdown, setShowStartCountdown] = useState(true);
	const [missiles, setMissiles] = useState<number[]>([]);
	const [mines, setMines] = useState<number[]>([]);
	const actionCooldown = useSharedValue<number>(0);

	const atbGauge = useSharedValue(0);
	const laneIndex = useSharedValue(randomNumberBetween(0, GRID_NUM - 1));
	const laneWidth = screenWidth / GRID_NUM;

	const timerTimeout = useRef<NodeJS.Timeout>();

	const runAtbGauge = () => {
		atbGauge.value = withTiming(100, {
			duration: DEFAULT_ATB_FILL_RATE,
			easing: Easing.linear,
		});
	};

	const startGame = (role: Role) => {
		setRole(role);

		timerTimeout.current = setTimeout(() => {
			setShowStartCountdown(false);
			runAtbGauge();
		}, 3000);
	};

	useEffect(() => {
		startGame(Role.Pirate);

		return () => {
			if (timerTimeout.current) clearTimeout(timerTimeout.current);
		};
	}, [startGame]);

	const reduceAtb = (type: "move" | "action") => {
		cancelAnimation(atbGauge);
		atbGauge.value =
			atbGauge.value - (type === "move" ? ATB_MOVE_POINT : ATB_ACTION_POINT);
		runOnJS(runAtbGauge)();
	};

	const fireMissile = () => {
		setMissiles((prevState) => [...prevState, laneIndex.value]);
		actionCooldown.value = 1;
		actionCooldown.value = withTiming(0, { duration: MISSILE_COOLDOWN });
		// Publish to channel
		reduceAtb("action");
	};

	const dropMine = () => {
		setMines((prevState) => [...prevState, laneIndex.value]);
		actionCooldown.value = 1;
		actionCooldown.value = withTiming(0, { duration: MINE_COOLDOWN });
		// Publish to channel
		reduceAtb("action");
	};

	const onMove = (direction: "left" | "right") => {
		const nextLane =
			direction === "left" ? laneIndex.value - 1 : laneIndex.value + 1;
		laneIndex.value = withTiming(nextLane, {
			duration: SHIP_MOVEMENT_SPEED,
		});
		reduceAtb("move");
	};

	const onColideWithMissile = () => {
		// Reduce The Pirate's HP by 1
		// if HP == 0, game over -> The Marine wins
	};

	const onCollideWithMine = () => {
		// Reduce The Marine's ATB fill rate
	};

	const restartGame = () => {
		// Reset the variables
		// Start the game
		router.back();
	};

	const quitGame = () => {
		// Leave from channel
		router.replace("/");
	};

	const onTimeOut = () => {
		// The pirate wins
		router.navigate("result-modal");
	};

	const contextValue = useMemo(
		() => ({
			screenWidth,
			screenHeight,
			role,
			atbGauge,
			laneIndex,
			laneWidth,
			missiles,
			setMissiles,
			mines,
			setMines,
			actionCooldown,
			startGame,
			showStartCountdown,
			fireMissile,
			dropMine,
			onMove,
			onColideWithMissile,
			onCollideWithMine,
			restartGame,
			quitGame,
			onTimeOut,
		}),
		[
			screenWidth,
			screenHeight,
			role,
			atbGauge,
			laneIndex,
			laneWidth,
			missiles,
			mines,
			actionCooldown,
			startGame,
			showStartCountdown,
			fireMissile,
			dropMine,
			onMove,
			onColideWithMissile,
			onCollideWithMine,
			restartGame,
			quitGame,
			onTimeOut,
		],
	);

	return (
		<GameEngineContext.Provider value={contextValue}>
			{children}
		</GameEngineContext.Provider>
	);
};

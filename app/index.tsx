import { Canvas, Fill, Group } from "@shopify/react-native-skia";

import { useWindowDimensions } from "react-native";
import { colors } from "../constants/colors";

import { Board } from "../components/board";
import { PirateShip } from "../components/pirate-ship";
import { MarineShip } from "../components/marine-ship";
import { SafeAreaView } from "react-native-safe-area-context";
import { ATBBar } from "../components/atb-bar";
import {
	ATB_ACTION_POINT,
	ATB_BAR_HEIGHT,
	ATB_MOVE_POINT,
	DEFAULT_ATB_FILL_RATE,
	DEFAULT_TIMER,
	FASTER_ATB_FILL_RATE,
	FASTEST_ATB_FILL_RATE,
	GRID_NUM,
	MISSILE_SPEED,
} from "../constants/values";
import { CountdownTimer } from "../components/countdown-timer";
import { useEffect, useMemo, useState } from "react";
import {
	Easing,
	useSharedValue,
	withTiming,
	cancelAnimation,
	runOnJS,
} from "react-native-reanimated";
import {
	Directions,
	Gesture,
	GestureDetector,
	GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Missile } from "../components/missile";

export default function App() {
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();

	const [timer, setTimer] = useState(DEFAULT_TIMER);
	const [showMissile, setShowMissile] = useState(false);

	const atbGauge = useSharedValue(0);
	const lanePos = useSharedValue(2);

	useEffect(() => {
		const interval = setInterval(() => {
			setTimer((prevState) => {
				if (prevState > 0) {
					return prevState - 1;
				}

				return prevState;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const atbDuration = useMemo(() => {
		if (timer < DEFAULT_TIMER / 3) {
			return FASTEST_ATB_FILL_RATE;
		}
		if (timer < DEFAULT_TIMER / 2) {
			return FASTER_ATB_FILL_RATE;
		}
		return DEFAULT_ATB_FILL_RATE;
	}, [timer]);

	const runAtbGauge = () => {
		atbGauge.value = withTiming(100, {
			duration: atbDuration,
			easing: Easing.linear,
		});
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		runAtbGauge();
	}, []);

	const flingLeftGesture = Gesture.Fling()
		.direction(Directions.LEFT)
		.onStart(() => {
			if (atbGauge.value >= ATB_MOVE_POINT && lanePos.value > 0) {
				lanePos.value = lanePos.value - 1;
				cancelAnimation(atbGauge);
				atbGauge.value = atbGauge.value - ATB_MOVE_POINT;
				runOnJS(runAtbGauge)();
			}
		});

	const flingRightGesture = Gesture.Fling()
		.direction(Directions.RIGHT)
		.onStart(() => {
			if (atbGauge.value >= ATB_MOVE_POINT && lanePos.value < GRID_NUM - 1) {
				lanePos.value = lanePos.value + 1;
				cancelAnimation(atbGauge);
				atbGauge.value = atbGauge.value - ATB_MOVE_POINT;
				runOnJS(runAtbGauge)();
			}
		});

	const tapGesture = Gesture.Tap().onStart(() => {
		if (atbGauge.value >= ATB_ACTION_POINT) {
			runOnJS(setShowMissile)(true);
			// setTimeout(() => {
			// 	runOnJS(setShowMissile)(false);
			// }, MISSILE_SPEED);
			cancelAnimation(atbGauge);
			atbGauge.value = atbGauge.value - ATB_ACTION_POINT;
			runOnJS(runAtbGauge)();
		}
	});

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaView style={{ flex: 1, backgroundColor: colors.aero }}>
				<GestureDetector
					gesture={Gesture.Race(
						tapGesture,
						Gesture.Race(flingLeftGesture, flingRightGesture),
					)}
				>
					<Canvas style={{ flex: 1 }}>
						<Board />

						{/* <PirateShip lanePos={3} /> */}

						{showMissile && <Missile lanePos={lanePos} />}

						<MarineShip lanePos={lanePos} />

						<ATBBar
							progress={atbGauge}
							movePoint={ATB_MOVE_POINT}
							actionPoint={ATB_ACTION_POINT}
						/>

						<CountdownTimer seconds={timer} />
					</Canvas>
				</GestureDetector>
			</SafeAreaView>
		</GestureHandlerRootView>
	);
}

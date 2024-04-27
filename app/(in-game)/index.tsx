import { Canvas } from "@shopify/react-native-skia";
import { colors } from "../../constants/colors";
import { Board } from "../../components/board";
import { PirateShip } from "../../components/pirate-ship";
import { MarineShip } from "../../components/marine-ship";
import { ATBBar } from "../../components/atb-bar";
import {
	ATB_ACTION_POINT,
	ATB_MOVE_POINT,
	GRID_NUM,
} from "../../constants/values";
import { CountdownTimer } from "../../components/countdown-timer";
import {
	Directions,
	Gesture,
	GestureDetector,
	GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Missile } from "../../components/missile";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGameEngine } from "../../hooks/use-game-engine";
import { Role } from "../../constants/types";
import { runOnJS } from "react-native-reanimated";
import { useContextBridge } from "its-fine";
import { View } from "react-native";
import { Mine } from "../../components/mine";

export default function Index() {
	const ContextBridge = useContextBridge();
	const {
		piratePosY,
		screenWidth,
		role,
		atbGauge,
		laneIndex,
		onMove,
		missiles,
		mines,
		pirateCollisionY,
		marineCollisionY,
		actionCooldown,
		fireMissile,
		dropMine,
	} = useGameEngine();

	const flingLeftGesture = Gesture.Fling()
		.direction(Directions.LEFT)
		.onStart(() => {
			if (atbGauge.value >= ATB_MOVE_POINT && laneIndex.value > 0) {
				runOnJS(onMove)("left");
			}
		});

	const flingRightGesture = Gesture.Fling()
		.direction(Directions.RIGHT)
		.onStart(() => {
			if (atbGauge.value >= ATB_MOVE_POINT && laneIndex.value < GRID_NUM - 1) {
				runOnJS(onMove)("right");
			}
		});

	const tapGesture = Gesture.Tap().onStart(() => {
		if (atbGauge.value >= ATB_ACTION_POINT && !actionCooldown.value) {
			if (role === Role.Pirate) {
				runOnJS(dropMine)();
			} else {
				runOnJS(fireMissile)();
			}
		}
	});

	return (
		<SafeAreaView
			edges={["top"]}
			style={{ flex: 1, backgroundColor: colors.aero }}
		>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<GestureDetector
					gesture={Gesture.Race(
						tapGesture,
						Gesture.Race(flingLeftGesture, flingRightGesture),
					)}
				>
					<Canvas style={{ flex: 1 }}>
						<ContextBridge>
							<Board />

							{missiles.map((laneIndex, idx) => (
								<Missile key={`${laneIndex}-${idx}`} laneIndex={laneIndex} />
							))}

							{mines.map((laneIndex, index) => (
								<Mine key={`${laneIndex}-${index}`} laneIndex={laneIndex} />
							))}

							<ATBBar
								progress={atbGauge}
								movePoint={ATB_MOVE_POINT}
								actionPoint={ATB_ACTION_POINT}
							/>

							<CountdownTimer />
						</ContextBridge>
					</Canvas>
				</GestureDetector>
			</GestureHandlerRootView>

			<View
				style={{
					width: screenWidth,
					height: 1,
					borderWidth: 1,
					borderStyle: "dashed",
					borderColor: "red",
					position: "absolute",
					top: pirateCollisionY,
				}}
			/>

			<View
				style={{
					width: screenWidth,
					height: 1,
					position: "absolute",
					top: marineCollisionY,
					borderWidth: 1,
					borderStyle: "dashed",
					borderColor: "red",
				}}
			/>

			<PirateShip />

			<MarineShip />
		</SafeAreaView>
	);
}

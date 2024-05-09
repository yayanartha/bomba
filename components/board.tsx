import { Line, vec, LinearGradient } from "@shopify/react-native-skia";
import { colors } from "../constants/colors";
import { ATB_BAR_HEIGHT, GRID_NUM, ATB_BAR_Y } from "../constants/values";
import { useGameEngine } from "../hooks/use-game-engine";
import { randomNumberBetween } from "../utils/number";
import { Wave } from "./wave";

interface Props {
	startPos: {
		x: number;
		y: number;
	};
	endPos: {
		x: number;
		y: number;
	};
}

const GridLine = ({ startPos, endPos }: Props) => {
	return (
		<Line
			p1={vec(startPos.x, startPos.y)}
			p2={vec(endPos.x, endPos.y)}
			color={colors.greenBlue}
			style="stroke"
			strokeWidth={1}
		>
			<LinearGradient
				start={vec(startPos.x, startPos.y)}
				end={vec(endPos.x, endPos.y)}
				colors={[`${colors.greenBlue}00`, colors.greenBlue]}
			/>
		</Line>
	);
};

export const Board = () => {
	const { screenWidth, screenHeight, laneWidth } = useGameEngine();
	const gridSize = screenWidth / GRID_NUM;

	return (
		<>
			{[...Array(GRID_NUM - 1).keys()].map((_, index) => {
				const x = (index + 1) * gridSize;
				return (
					<GridLine
						key={`vgrid-${index + 1}`}
						startPos={{ x, y: ATB_BAR_Y + ATB_BAR_HEIGHT }}
						endPos={{ x, y: screenHeight }}
					/>
				);
			})}

			{[...Array(10).keys()].map((_, index) => (
				<Wave
					key={`wave-${index}`}
					x={randomNumberBetween(
						(index % (GRID_NUM - 1)) * laneWidth,
						screenWidth - laneWidth,
					)}
					y={randomNumberBetween(-screenHeight / 2, screenHeight - 30)}
				/>
			))}
		</>
	);
};

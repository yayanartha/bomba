import {
	Line,
	vec,
	drawAsImage,
	Group,
	Rect,
	rect,
	Skia,
	LinearGradient,
} from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";
import { colors } from "../constants/colors";
import { GRID_NUM } from "../constants/values";

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
		<Group>
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
		</Group>
	);
};

export const Board = () => {
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();
	const gridSize = screenWidth / GRID_NUM;

	return (
		<Group>
			{[...Array(GRID_NUM - 1).keys()].map((_, index) => {
				const x = (index + 1) * gridSize;
				return (
					<GridLine
						key={`vgrid-${index + 1}`}
						startPos={{ x, y: 0 }}
						endPos={{ x, y: screenHeight }}
					/>
				);
			})}
		</Group>
	);
};

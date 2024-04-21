import {
	Group,
	Rect,
	Skia,
	Path,
	rrect,
	rect,
	Line,
} from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";
import { ATB_BAR_HEIGHT, ATB_BAR_X, ATB_BAR_Y } from "../constants/values";
import { colors } from "../constants/colors";
import { type SharedValue, useDerivedValue } from "react-native-reanimated";

interface Props {
	progress: SharedValue<number>;
	movePoint: number;
	actionPoint: number;
}

export const ATBBar = ({ progress, movePoint, actionPoint }: Props) => {
	const { width: screenWidth } = useWindowDimensions();
	const barWidth = screenWidth - ATB_BAR_X * 2;
	const moveX = ATB_BAR_X + (barWidth * movePoint) / 100;
	const actionX = ATB_BAR_X + (barWidth * actionPoint) / 100;

	const barStroke = Skia.Path.Make();
	barStroke.addRRect({
		rect: {
			x: ATB_BAR_X,
			y: ATB_BAR_Y,
			width: barWidth,
			height: ATB_BAR_HEIGHT,
		},
		rx: 16,
		ry: 16,
	});
	const barContainer = rrect(
		rect(ATB_BAR_X, ATB_BAR_Y, barWidth, ATB_BAR_HEIGHT),
		16,
		16,
	);

	const progressPath = useDerivedValue(() => {
		const path = Skia.Path.Make();
		path.addRect({
			x: ATB_BAR_X,
			y: ATB_BAR_Y,
			width: (barWidth * progress.value) / 100,
			height: ATB_BAR_HEIGHT,
		});
		return path;
	});

	return (
		<>
			<Path
				path={barStroke}
				style="stroke"
				color={colors.persianBlue}
				strokeWidth={3}
			/>

			<Group clip={barContainer}>
				<Rect
					x={ATB_BAR_X}
					y={ATB_BAR_Y}
					width={barWidth}
					height={ATB_BAR_HEIGHT}
					color={colors.royalBlue}
				/>

				<Path path={progressPath} color={colors.greenBlue} />
			</Group>

			<Line
				p1={{ x: moveX, y: ATB_BAR_Y }}
				p2={{ x: moveX, y: ATB_BAR_Y + ATB_BAR_HEIGHT }}
				color={"yellow"}
				style="stroke"
				strokeWidth={1}
			/>

			<Line
				p1={{ x: actionX, y: ATB_BAR_Y }}
				p2={{ x: actionX, y: ATB_BAR_Y + ATB_BAR_HEIGHT }}
				color={"orange"}
				style="stroke"
				strokeWidth={1.5}
			/>
		</>
	);
};

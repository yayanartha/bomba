import { Group, Text as SkiaText, useFont } from "@shopify/react-native-skia";
import { colors } from "../constants/colors";

interface Props {
	text: string;
	x: number;
	y: number;
}

export const Text = ({ text, x, y }: Props) => {
	const font = useFont(require("../assets/fonts/Gilroy-ExtraBold.ttf"), 24);

	return (
		<Group>
			<SkiaText
				x={x}
				y={y}
				text={text}
				font={font}
				style="stroke"
				color={colors.royalBlue}
				strokeWidth={3}
			/>
			<SkiaText x={x} y={y} text={text} font={font} color={colors.white} />
		</Group>
	);
};

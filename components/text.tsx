import { Text as SkiaText, useFont } from "@shopify/react-native-skia";
import { colors } from "../constants/colors";

interface Props {
	text: string;
	x: number;
	y: number;
	size?: number;
}

export const Text = ({ text, x, y, size = 24 }: Props) => {
	const font = useFont(require("../assets/fonts/Gilroy-ExtraBold.ttf"), size);

	return (
		<>
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
		</>
	);
};

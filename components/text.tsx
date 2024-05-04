import {
	useFonts,
	Skia,
	Paragraph,
	type ParagraphProps,
	TextAlign,
	PaintStyle,
	StrokeJoin,
} from "@shopify/react-native-skia";
import { colors } from "../constants/colors";
import { useMemo } from "react";
import { Dimensions } from "react-native";

interface Props extends Omit<ParagraphProps, "paragraph"> {
	text: string;
	size?: number;
	center?: boolean;
	enableStroke?: boolean;
}

export const Text = ({
	text,
	center,
	x,
	y,
	size = 24,
	width = Dimensions.get("window").width,
	enableStroke = true,
	color = colors.white,
	...props
}: Props) => {
	const fonts = useFonts({
		Gilroy: [require("../assets/fonts/Gilroy-ExtraBold.ttf")],
	});

	const paragraphStroke = useMemo(() => {
		if (!fonts) {
			return null;
		}

		const foregroundPaint = Skia.Paint();
		foregroundPaint.setStyle(PaintStyle.Stroke);
		foregroundPaint.setStrokeWidth(4);
		foregroundPaint.setStrokeJoin(StrokeJoin.Round);
		foregroundPaint.setColor(Skia.Color(colors.oxfordBlue));

		const para = Skia.ParagraphBuilder.Make(
			{
				textAlign: center ? TextAlign.Center : TextAlign.Left,
			},
			fonts,
		)
			.pushStyle(
				{
					fontFamilies: ["Gilroy"],
					fontSize: size,
					color: Skia.Color(colors.white),
				},
				foregroundPaint,
			)
			.addText(text)
			.build();

		return para;
	}, [center, text, size, fonts]);

	const paragraph = useMemo(() => {
		if (!fonts) {
			return null;
		}

		const para = Skia.ParagraphBuilder.Make(
			{
				textAlign: center ? TextAlign.Center : TextAlign.Left,
			},
			fonts,
		)
			.pushStyle({
				fontFamilies: ["Gilroy"],
				fontSize: size,
				color: Skia.Color(color),
			})
			.addText(text)
			.build();

		return para;
	}, [center, text, size, color, fonts]);

	return (
		<>
			{enableStroke && (
				<Paragraph
					x={x}
					y={y}
					color={colors.white}
					width={width}
					{...props}
					paragraph={paragraphStroke}
				/>
			)}

			<Paragraph
				x={x}
				y={y}
				color={colors.white}
				width={width}
				{...props}
				paragraph={paragraph}
			/>
		</>
	);
};

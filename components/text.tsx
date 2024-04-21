import {
	useFonts,
	Skia,
	Paragraph,
	type ParagraphProps,
	TextAlign,
} from "@shopify/react-native-skia";
import { colors } from "../constants/colors";
import { useMemo } from "react";

interface Props extends Omit<ParagraphProps, "paragraph"> {
	text: string;
	size?: number;
	center?: boolean;
}

export const Text = ({
	text,
	center,
	x,
	y,
	size = 24,
	width,
	...props
}: Props) => {
	const fonts = useFonts({
		Gilroy: [require("../assets/fonts/Gilroy-ExtraBold.ttf")],
	});

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
				color: Skia.Color(colors.white),
				shadows: [
					{
						color: Skia.Color(colors.royalBlue),
						offset: { x: 0, y: 0 },
						blurRadius: 4,
					},
				],
			})
			.addText(text)
			.build();

		return para;
	}, [center, text, size, fonts]);

	return (
		<Paragraph
			x={x}
			y={y}
			color={colors.white}
			width={width}
			{...props}
			paragraph={paragraph}
		/>
	);
};

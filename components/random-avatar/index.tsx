import React from "react";
import { generateData } from "./utils";
import Svg, { Mask, Rect, G, Path } from "react-native-svg";
import { colors } from "../../constants/colors";

export interface AvatarProps {
	name: string;
	size?: number;
	square?: boolean;
}

export const RandomAvatar = ({
	name,
	size = 40,
	square = false,
}: AvatarProps) => {
	const colorOptions = [colors.red, colors.yellow, colors.white];

	const data = generateData(name, colorOptions);

	return (
		<Svg
			viewBox={`0 0 ${size} ${size}`}
			fill="none"
			// xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
		>
			<Mask
				id="mask__beam"
				maskUnits="userSpaceOnUse"
				x={0}
				y={0}
				width={size}
				height={size}
			>
				<Rect
					width={size}
					height={size}
					rx={square ? undefined : size * 2}
					fill="white"
				/>
			</Mask>
			<G mask="url(#mask__beam)">
				<Rect width={size} height={size} fill={data.backgroundColor} />
				<Rect
					x="0"
					y="0"
					width={size}
					height={size}
					transform={`translate(${data.wrapperTranslateX} ${
						data.wrapperTranslateY
					}) rotate(${data.wrapperRotate} ${size / 2} ${size / 2}) scale(${
						data.wrapperScale
					})`}
					fill={data.wrapperColor}
					rx={data.isCircle ? size : size / 6}
				/>
				<G
					transform={`translate(${data.faceTranslateX} ${
						data.faceTranslateY
					}) rotate(${data.faceRotate} ${size / 2} ${size / 2})`}
				>
					{data.isMouthOpen ? (
						<Path
							d={`M15 ${19 + data.mouthSpread}c2 1 4 1 6 0`}
							stroke={data.faceColor}
							fill="none"
							strokeLinecap="round"
						/>
					) : (
						<Path
							d={`M13,${19 + data.mouthSpread} a1,0.75 0 0,0 10,0`}
							fill={data.faceColor}
						/>
					)}
					<Rect
						x={14 - data.eyeSpread}
						y={14}
						width={1.5}
						height={2}
						rx={1}
						stroke="none"
						fill={data.faceColor}
					/>
					<Rect
						x={20 + data.eyeSpread}
						y={14}
						width={1.5}
						height={2}
						rx={1}
						stroke="none"
						fill={data.faceColor}
					/>
				</G>
			</G>
		</Svg>
	);
};

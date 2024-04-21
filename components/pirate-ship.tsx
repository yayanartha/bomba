import React from "react";
import { Ship } from "./ship";
import { useWindowDimensions } from "react-native";
import { GRID_NUM, SHIP_POSITION_Y_RATIO } from "../constants/values";

interface Props {
	lanePos: number;
}

export const PirateShip = ({ lanePos }: Props) => {
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();

	return (
		<Ship
			xPos={(screenWidth / GRID_NUM) * lanePos}
			yPos={screenHeight * SHIP_POSITION_Y_RATIO}
		/>
	);
};

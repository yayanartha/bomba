import {
	TextInput as RNTextInput,
	View,
	type TextInputProps,
	StyleSheet,
} from "react-native";
import { colors } from "../constants/colors";
import { useState } from "react";

export const TextInput = ({ placeholder, ...props }: TextInputProps) => {
	const [isActive, setIsActive] = useState(false);

	return (
		<View
			style={{
				borderWidth: 1.5,
				borderColor: colors.oxfordBlue,
				borderRadius: 16,
				paddingHorizontal: 16,
				backgroundColor: colors.white,
			}}
		>
			<RNTextInput
				style={{
					height: 50,
					minWidth: 250,
					textAlign: "center",
					fontSize: 20,
					fontFamily: "Gilroy-ExtraBold",
				}}
				placeholder={!isActive ? placeholder : undefined}
				placeholderTextColor={`${colors.oxfordBlue}33`}
				editable={false}
				{...props}
			/>

			<RNTextInput
				style={{
					...StyleSheet.absoluteFillObject,
					minWidth: 250,
					height: 50,
					backgroundColor: "transparent",
					textAlign: "center",
					fontSize: 20,
					fontFamily: "Gilroy-ExtraBold",
					color: colors.oxfordBlue,
				}}
				cursorColor={colors.oxfordBlue}
				textAlignVertical="center"
				onFocus={() => setIsActive(true)}
				onBlur={() => setIsActive(false)}
				{...props}
			/>
		</View>
	);
};

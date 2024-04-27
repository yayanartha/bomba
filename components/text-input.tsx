import { TextInput as RNTextInput, type TextInputProps } from "react-native";
import { colors } from "../constants/colors";

export const TextInput = (props: TextInputProps) => {
	return (
		<RNTextInput
			{...props}
			style={{
				height: 50,
				backgroundColor: colors.white,
				borderWidth: 1.5,
				borderColor: colors.oxfordBlue,
				borderRadius: 16,
				minWidth: 250,
				paddingHorizontal: 16,
				textAlign: "center",
				fontSize: 20,
				fontFamily: "Gilroy-Extrabold",
				color: colors.oxfordBlue,
			}}
			cursorColor={colors.oxfordBlue}
			textAlignVertical="center"
		/>
	);
};

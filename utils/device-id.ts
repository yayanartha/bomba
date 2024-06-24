import * as Application from "expo-application";
import { Platform } from "react-native";

export const getUniqueDeviceId = async () => {
	if (Platform.OS === "android") {
		return Application.getAndroidId();
	}

	return Application.getIosIdForVendorAsync();
};

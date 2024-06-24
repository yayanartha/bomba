import {
	type PropsWithChildren,
	useEffect,
	createContext,
	useMemo,
	useState,
} from "react";
import { getUniqueDeviceId } from "../utils/device-id";
import { supabase } from "../utils/supabase";
import { Alert } from "react-native";

interface UserContext {
	userId?: number;
	loading: boolean;
	connectToUserDb(): Promise<void>;
}

export const UserContext = createContext({} as UserContext);

export const UserProvider = ({ children }: PropsWithChildren) => {
	const [loading, setLoading] = useState(true);
	const [userId, setUserId] = useState<number>();

	useEffect(() => {
		connectToUserDb();
	}, []);

	const connectToUserDb = async () => {
		try {
			setLoading(true);

			const deviceId = await getUniqueDeviceId();
			console.log("DEVICE ID", deviceId);

			if (!deviceId) {
				return Alert.alert("Failed to Connect", "Device ID cannot be found");
			}

			const users = await supabase
				.from("users")
				.select()
				.eq("device_id", deviceId);

			// If Device ID not exists in DB, insert.
			if (!users.data?.length) {
				const { data } = await supabase
					.from("users")
					.insert({ device_id: deviceId })
					.select();

				setUserId(data?.[0].id);
			}
			// Save user id.
			else {
				setUserId(users.data[0].id);
			}
		} catch (error) {
			Alert.alert("Error", JSON.stringify(error, undefined, 2));
		} finally {
			setLoading(false);
		}
	};

	const contextValue = useMemo(
		() => ({
			userId,
			loading,
			connectToUserDb,
		}),
		[userId, loading, connectToUserDb],
	);

	return (
		<UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
	);
};

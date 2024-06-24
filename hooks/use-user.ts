import { useContext } from "react";
import { UserContext } from "../providers/user-provider";

export const useUser = () => {
	const context = useContext(UserContext);

	if (!context) {
		throw new Error("Component must be rendered as a child of UserProvider");
	}

	return context;
};

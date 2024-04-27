import {
	type PropsWithChildren,
	createContext,
	useMemo,
	useState,
} from "react";

interface GameChannelContext {
	name: string;
	setName: React.Dispatch<React.SetStateAction<string>>;
	channel: string;
	setChannel: React.Dispatch<React.SetStateAction<string>>;
}

export const GameChannelContext = createContext({} as GameChannelContext);

export const GameChannelProvider = ({ children }: PropsWithChildren) => {
	const [name, setName] = useState("");
	const [channel, setChannel] = useState("");

	const contextValue = useMemo(
		() => ({
			name,
			setName,
			channel,
			setChannel,
		}),
		[name, channel],
	);

	return (
		<GameChannelContext.Provider value={contextValue}>
			{children}
		</GameChannelContext.Provider>
	);
};

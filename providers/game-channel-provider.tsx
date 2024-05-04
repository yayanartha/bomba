import {
	type PropsWithChildren,
	createContext,
	useMemo,
	useState,
	useEffect,
	useRef,
} from "react";
import { type RealtimeChannel, createClient } from "@supabase/supabase-js";
import type { Player, PresenceObj, Role } from "../constants/types";

const client = createClient(
	process.env.EXPO_PUBLIC_SUPABASE_URL!,
	process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
);

interface GameChannelContext {
	username: string;
	setUsername: React.Dispatch<React.SetStateAction<string>>;
	channelName: string;
	setChannelName: React.Dispatch<React.SetStateAction<string>>;
	joinChannel(callback: () => void): void;
	players: Player[];
	selectRole(role: Role): void;
	myRole?: Role;
	setMyRole: React.Dispatch<React.SetStateAction<Role | undefined>>;
}

export const GameChannelContext = createContext({} as GameChannelContext);

export const GameChannelProvider = ({ children }: PropsWithChildren) => {
	const [username, setUsername] = useState("");
	const [channelName, setChannelName] = useState("");
	const [players, setPlayers] = useState<Player[]>([]);
	const [myRole, setMyRole] = useState<Role>();

	const broadcastChannel = useRef<RealtimeChannel>();

	const joinChannel = (callback: () => void) => {
		if (!channelName) return;

		const channel = client.channel(`bomba-${channelName}`, {
			config: {
				presence: { key: `user-${username.trim()}` },
				broadcast: { self: true },
			},
		});
		broadcastChannel.current = channel;

		broadcastChannel.current
			.on("presence", { event: "sync" }, () => {
				const presenceState = channel.presenceState();
				setPlayers(
					Object.values(presenceState).map((o) => ({
						username: (o[0] as PresenceObj).username,
					})),
				);
			})
			.on("presence", { event: "join" }, ({ key, newPresences }) => {
				console.log("join", key, newPresences);
			})
			.on("presence", { event: "leave" }, ({ key, leftPresences }) => {
				console.log("leave", key, leftPresences);
			})
			.on("broadcast", { event: "select_role" }, ({ payload }) => {
				console.log("broadcast select_role", payload);
				setPlayers((prevState) => {
					return prevState.map((o) => {
						if (o.username === payload.username) {
							return payload;
						}
						return o;
					});
				});
			})
			.on("broadcast", { event: "game_started" }, ({ payload }) => {
				console.log("broadcast game_started", payload);
			})
			.subscribe((status) => {
				console.log("status", status);
				if (status === "SUBSCRIBED") {
					channel.track({ username });
					callback();
				}
			});
	};

	useEffect(() => {
		return () => {
			broadcastChannel.current?.untrack();
			broadcastChannel.current?.unsubscribe();
		};
	}, []);

	const selectRole = (role: Role) => {
		if (!broadcastChannel.current) {
			console.log("NO CHANNEL");
			return;
		}
		console.log("sini");

		broadcastChannel.current.send({
			type: "broadcast",
			event: "select_role",
			payload: {
				username,
				role,
			},
		});
	};

	const contextValue = useMemo(
		() => ({
			username,
			setUsername,
			channelName,
			setChannelName,
			joinChannel,
			players,
			selectRole,
			myRole,
			setMyRole,
		}),
		[username, channelName, players, joinChannel, selectRole, myRole],
	);

	return (
		<GameChannelContext.Provider value={contextValue}>
			{children}
		</GameChannelContext.Provider>
	);
};

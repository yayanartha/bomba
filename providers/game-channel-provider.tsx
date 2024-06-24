import {
	type PropsWithChildren,
	createContext,
	useMemo,
	useState,
	useEffect,
	useRef,
} from "react";
import type { RealtimeChannel } from "@supabase/supabase-js";
import type { Player, PresenceObj, Role } from "../constants/types";
import { supabase } from "../utils/supabase";
import { Alert } from "react-native";
import { useUser } from "../hooks/use-user";

interface GameChannelContext {
	enterChannel(username: string, channelCode: string): Promise<void>;
	loading: boolean;
	broadcastChannel: React.MutableRefObject<RealtimeChannel | undefined>;

	players: Player[];
	selectRole(role: Role): void;
	myRole?: Role;
	setMyRole: React.Dispatch<React.SetStateAction<Role | undefined>>;
	isStarted: boolean;
	commenceBattle(): void;
}

export const GameChannelContext = createContext({} as GameChannelContext);

const buildChannelName = (channelCode: string) => {
	return `bomba-${channelCode}`;
};

export const GameChannelProvider = ({ children }: PropsWithChildren) => {
	const [players, setPlayers] = useState<Player[]>([]);
	const [myRole, setMyRole] = useState<Role>();
	const [isStarted, setIsStarted] = useState(false);
	const [loading, setLoading] = useState(false);

	const broadcastChannel = useRef<RealtimeChannel>();

	const { userId } = useUser();

	const enterChannel = async (username: string, channelCode: string) => {
		try {
			setLoading(true);

			const channelName = buildChannelName(channelCode);

			const channels = await supabase
				.from("channels")
				.select()
				.eq("name", channelName);

			// If channel is not exists in DB, create one.
			if (!channels.data?.length) {
				console.log("Creating channel", channelName);
				await createChannel(channelName, username);
			}
			// Join existing channel.
			else {
				console.log("Joining channel", channelName, channels.data[0].id);
				await joinChannel(channelName, channels.data[0].id, username);
			}
		} catch (error) {
			throw new Error(JSON.stringify(error, undefined, 2));
		} finally {
			setLoading(false);
		}
	};

	const createChannel = async (channelName: string, username: string) => {
		if (!userId) {
			throw new Error("userId is not defined");
		}

		try {
			const { data } = await supabase
				.from("channels")
				.insert({ name: channelName })
				.select();

			if (data?.length) {
				console.log("Inserting player", username);
				await supabase.from("channel_players").insert({
					channel_id: data[0].id,
					user_id: userId,
					username,
					is_host: true,
					is_connected: true,
				});
			}

			initBroadcastChannel(channelName, username);
		} catch (error) {
			throw new Error(JSON.stringify(error, undefined, 2));
		}
	};

	const joinChannel = async (
		channelName: string,
		channelId: number,
		username: string,
	) => {
		if (!userId) {
			throw "userId is not defined";
		}

		// Find number of active players.
		const players = await supabase
			.from("channel_players")
			.select()
			.eq("channel_id", channelId)
			.eq("is_connected", true);

		// If players exceed max, can't enter the channel.
		if (players.data && players.data.length >= 2) {
			throw "Channel is already full";
		}

		// Find the channel host.
		const host = await supabase
			.from("channel_players")
			.select()
			.eq("channel_id", channelId)
			.eq("is_host", true);

		// Find the player.
		const channelPlayers = await supabase
			.from("channel_players")
			.select()
			.eq("channel_id", channelId)
			.eq("user_id", userId);

		console.log("Upserting player", username);
		await supabase.from("channel_players").upsert({
			id: channelPlayers.data?.[0]?.ids,
			channel_id: channelId,
			user_id: userId,
			username,
			is_connected: true,
			is_host: !host.data?.length, // Auto become host if no one act as it yet.
		});

		initBroadcastChannel(channelName, username);
	};

	const initBroadcastChannel = (channelName: string, username: string) => {
		const channel = supabase.channel(channelName, {
			config: {
				presence: { key: `user-${username.trim()}` },
				broadcast: { self: true },
			},
		});
		broadcastChannel.current = channel;

		// broadcastChannel.current
		// 	.on("presence", { event: "sync" }, () => {
		// 		const presenceState = channel.presenceState();
		// 		setPlayers(
		// 			Object.values(presenceState).map((o) => ({
		// 				username: (o[0] as PresenceObj).username,
		// 			})),
		// 		);
		// 	})
		// 	.on("presence", { event: "join" }, ({ key, newPresences }) => {
		// 		console.log("join", key, newPresences);
		// 	})
		// 	.on("presence", { event: "leave" }, ({ key, leftPresences }) => {
		// 		console.log("leave", key, leftPresences);
		// 	})
		// .on("broadcast", { event: "select_role" }, ({ payload }) => {
		// 	console.log("broadcast select_role", payload);
		// 	setPlayers((prevState) => {
		// 		return prevState.map((o) => {
		// 			if (o.username === payload.username) {
		// 				return payload;
		// 			}
		// 			return o;
		// 		});
		// 	});
		// })
		// .on("broadcast", { event: "game_started" }, ({ payload }) => {
		// 	console.log("broadcast game_started", payload);
		// 	setIsStarted(true);
		// })
		// 	.subscribe((status) => {
		// 		console.log("status", status);
		// 		if (status === "SUBSCRIBED") {
		// 			channel.track({ username });
		// 		}
		// 	});
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

		broadcastChannel.current.send({
			type: "broadcast",
			event: "select_role",
			payload: {
				username,
				role,
			},
		});
	};

	const commenceBattle = () => {
		if (!broadcastChannel.current) {
			console.log("NO CHANNEL");
			return;
		}

		broadcastChannel.current.send({
			type: "broadcast",
			event: "game_started",
		});
	};

	const contextValue = useMemo(
		() => ({
			enterChannel,
			loading,
			broadcastChannel,

			players,
			selectRole,
			myRole,
			setMyRole,
			isStarted,
			commenceBattle,
		}),
		[
			enterChannel,
			loading,

			players,
			selectRole,
			myRole,
			isStarted,
			commenceBattle,
		],
	);

	return (
		<GameChannelContext.Provider value={contextValue}>
			{children}
		</GameChannelContext.Provider>
	);
};

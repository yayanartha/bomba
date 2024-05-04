export enum Role {
	Pirate = "pirate",
	Marine = "marine",
}

export type PresenceObj = {
	username: string;
	presence_ref: string;
};

export type Player = {
	username: string;
	role?: Role;
};

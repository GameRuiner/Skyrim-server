import { ProfessionNamesProp } from '..';

export interface MessagesItem {
	baseId: number;
	name: string;
	ruName: string;
	worldId?: string;
}

export type MessagesList = {
	[name in ProfessionNamesProp]?: MessagesItem;
};

export const MESSAGES: MessagesList = {
	farmer: {
		baseId: 0x500fb0b,
		name: 'MP_msg_StartWorkFarmer',
		ruName: '25 способов стать фермером',
		worldId: 'fb0b:FarmSystem.esp',
	},
};

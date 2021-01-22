import { Equipment } from '../../../../types';

export type ProfessionNames = 'miner' | 'herbalist' | 'woodsman';
export type ProfessionStaffNames = 'tool' | 'clothes' | 'boots' | 'helmet' | 'gloves';

export type ProfessionList = {
	[name in ProfessionNames]: ProfessionStaff;
};

export type ProfessionStaff = {
	[name in ProfessionStaffNames]?: number;
};

export const PROFESSIONS: ProfessionList = {
	miner: {
		tool: 0xe3c16,
		clothes: 0x80697,
		boots: 0x1be1b,
	},
	herbalist: {},
	woodsman: {},
};

export interface Profession {
	name?: ProfessionNames;
	equipment?: ProfessionStaff;
	oldEquipment: Equipment;
	isActive: boolean;
}

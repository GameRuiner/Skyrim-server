import { Equipment } from '../../../../types/SystemProp';

export type ProfessionNamesProp = 'miner' | 'herbalist' | 'woodsman';
export type ProfessionStaffNamesProp = 'tool' | 'clothes' | 'boots' | 'helmet' | 'gloves';

export type ProfessionListProp = {
	[name in ProfessionNamesProp]: ProfessionStaffProp;
};

export type ProfessionStaffProp = {
	[name in ProfessionStaffNamesProp]?: number;
};

export interface ProfessionProp {
	name?: ProfessionNamesProp;
	equipment?: ProfessionStaffProp;
	oldEquipment: Equipment;
	isActive: boolean;
}

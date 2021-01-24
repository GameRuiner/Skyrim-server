import { Equipment } from '../../../../types/SystemProp';
export type ProfessionTypesProp = 'collector';
export type ProfessionNamesProp = 'miner' | 'herbalist' | 'woodsman' | 'farmer';
export type ProfessionStaffNamesProp = 'tool' | 'clothes' | 'boots' | 'helmet' | 'gloves' | 'other';

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

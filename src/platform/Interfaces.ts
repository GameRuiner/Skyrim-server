import { Cell } from './Cell';
import { Form } from './Form';
import { MagicEffect } from './MagicEffect';
import { ObjectReference } from './ObjectReference';
import { Projectile } from './Projectile';
import { BaseExtraList } from './Types';

export interface Face {
	hairColor: number;
	bodySkinColor: number;
	headTextureSetId: number;
	headPartIds: number[];
	presets: number[];
}
export interface ChangeFormNpc {
	raceId?: number;
	name?: string;
	face?: Face;
}
export interface Browser {
	setVisible(visible: boolean): void;
	setFocused(focused: boolean): void;
	loadUrl(url: string): void;
	getToken(): string;
}
export interface ExtraData {
	type: 'Health' | 'Count' | 'Enchantment' | 'Charge' | 'TextDisplayData' | 'Soul' | 'Poison' | 'Worn' | 'WornLeft';
}
export interface ExtraHealth extends ExtraData {
	type: 'Health';
	health: number;
}
export interface ExtraCount extends ExtraData {
	type: 'Count';
	count: number;
}
export interface ExtraEnchantment extends ExtraData {
	type: 'Enchantment';
	enchantmentId: number;
	maxCharge: number;
	removeOnUnequip: boolean;
}
export interface ExtraCharge extends ExtraData {
	type: 'Charge';
	charge: number;
}
export interface ExtraTextDisplayData extends ExtraData {
	type: 'TextDisplayData';
	name: string;
}
export interface ExtraSoul extends ExtraData {
	type: 'Soul';
	soul: 0 | 1 | 2 | 3 | 4 | 5;
}
export interface ExtraPoison extends ExtraData {
	type: 'Poison';
	poisonId: number;
	count: number;
}
export interface ExtraWorn extends ExtraData {
	type: 'Worn';
}
export interface ExtraWornLeft extends ExtraData {
	type: 'WornLeft';
}
export interface InventoryChangesEntry {
	countDelta: number;
	baseId: number;
	extendDataList: BaseExtraList[];
}
export interface InventoryEntry {
	count: number;
	baseId: number;
}

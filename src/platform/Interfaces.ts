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
export interface ActivateEvent {
	target: ObjectReference;
	caster: ObjectReference;
	isCrimeToActivate: boolean;
}
export interface MoveAttachDetachEvent {
	movedRef: ObjectReference;
	isCellAttached: boolean;
}
export interface WaitStopEvent {
	isInterrupted: boolean;
}
export interface ObjectLoadedEvent {
	object: Form;
	isLoaded: boolean;
}
export interface LockChangedEvent {
	lockedObject: ObjectReference;
}
export interface CellFullyLoadedEvent {
	cell: Cell;
}
export interface GrabReleaseEvent {
	refr: ObjectReference;
	isGrabbed: boolean;
}
export interface SwitchRaceCompleteEvent {
	subject: ObjectReference;
}
export interface UniqueIDChangeEvent {
	oldBaseID: number;
	newBaseID: number;
	oldUniqueID: number;
	newUniqueID: number;
}
export interface TrackedStatsEvent {
	statName: string;
	newValue: number;
}
export interface InitScriptEvent {
	initializedObject: ObjectReference;
}
export interface ResetEvent {
	object: ObjectReference;
}
export interface CombatEvent {
	target: ObjectReference;
	actor: ObjectReference;
	isCombat: boolean;
	isSearching: boolean;
}
export interface DeathEvent {
	actorDying: ObjectReference;
	actorKiller: ObjectReference;
}
export interface ContainerChangedEvent {
	oldContainer: ObjectReference;
	newContainer: ObjectReference;
	baseObj: Form;
	numItems: number;
	uniqueID: number;
	reference: ObjectReference;
}
export interface HitEvent {
	target: ObjectReference;
	agressor: ObjectReference;
	source: Form;
	projectile: Projectile;
	isPowerAttack: boolean;
	isSneakAttack: boolean;
	isBashAttack: boolean;
	isHitBlocked: boolean;
}
export interface EquipEvent {
	actor: ObjectReference;
	baseObj: Form;
	uniqueId: number;
	originalRefr: ObjectReference;
}
export interface ActiveEffectApplyRemoveEvent {
	effect: MagicEffect;
	caster: ObjectReference;
	target: ObjectReference;
}
export interface MagicEffectApplyEvent {
	effect: MagicEffect;
	caster: ObjectReference;
	target: ObjectReference;
}

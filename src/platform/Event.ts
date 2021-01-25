import { Cell } from './Cell';
import { Form } from './Form';
import { MagicEffect } from './MagicEffect';
import { ObjectReference } from './ObjectReference';
import { Projectile } from './Projectile';

export type SkyrimEventName =
	| 'update'
	| 'activate'
	| 'waitStop'
	| 'objectLoaded'
	| 'moveAttachDetach'
	| 'lockChanged'
	| 'grabRelease'
	| 'cellFullyLoaded'
	| 'switchRaceComplete'
	| 'uniqueIdChange'
	| 'trackedStats'
	| 'scriptInit'
	| 'reset'
	| 'combatState'
	| 'loadGame'
	| 'deathEnd'
	| 'deathStart'
	| 'containerChanged'
	| 'hit'
	| 'unequip'
	| 'equip'
	| 'magicEffectApply'
	| 'effectFinish'
	| 'effectStart';

export type SkyrimEvent =
	| ActivateEvent
	| WaitStopEvent
	| ObjectLoadedEvent
	| MoveAttachDetachEvent
	| LockChangedEvent
	| GrabReleaseEvent
	| CellFullyLoadedEvent // loaded cell once when enter
	| SwitchRaceCompleteEvent
	| UniqueIDChangeEvent
	| TrackedStatsEvent
	| InitScriptEvent
	| ResetEvent
	| CombatEvent
	| DeathEvent
	| ContainerChangedEvent
	| HitEvent
	| EquipEvent
	| MagicEffectApplyEvent
	| ActiveEffectApplyRemoveEvent;

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

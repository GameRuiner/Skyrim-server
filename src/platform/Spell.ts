import { Actor } from './Actor';
import { EquipSlot, Perk } from './Classes';
import { Form } from './Form';
import { MagicEffect } from './MagicEffect';
import { ObjectReference } from './ObjectReference';

export interface Spell {
	from: (form: Form) => Spell;
	cast: (akSource: ObjectReference, akTarget: ObjectReference) => Promise<void>;
	getCastTime: () => number;
	getCostliestEffectIndex: () => number;
	getEffectAreas: () => number[];
	getEffectDurations: () => number[];
	getEffectMagnitudes: () => number[];
	getEffectiveMagickaCost: (caster: Actor) => number;
	getEquipType: () => EquipSlot;
	getMagicEffects: () => object[];
	getMagickaCost: () => number;
	getNthEffectArea: (index: number) => number;
	getNthEffectDuration: (index: number) => number;
	getNthEffectMagicEffect: (index: number) => MagicEffect;
	getNthEffectMagnitude: (index: number) => number;
	getNumEffects: () => number;
	getPerk: () => Perk;
	isHostile: () => boolean;
	preload: () => void;
	remoteCast: (akSource: ObjectReference, akBlameActor: Actor, akTarget: ObjectReference) => Promise<void>;
	setEquipType: (type: EquipSlot) => void;
	setNthEffectArea: (index: number, value: number) => void;
	setNthEffectDuration: (index: number, value: number) => void;
	setNthEffectMagnitude: (index: number, value: number) => void;
	unload: () => void;
}

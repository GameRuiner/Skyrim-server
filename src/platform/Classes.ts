import { Actor } from './Actor';
import { Cell } from './Cell';
import { Form } from './Form';
import { Keyword } from './Keyword';
import { MagicEffect } from './MagicEffect';
import { ObjectReference } from './ObjectReference';
import { Quest } from './Quest';
import { SendAnimationEventHook } from './SendAnimationEventHook';
import { Spell } from './Spell';

export interface ConsoleComand {
	longName: string;
	shortName: string;
	numArgs: number;
	execute: (...args: any[]) => boolean;
}
export interface Hooks {
	sendAnimationEvent: SendAnimationEventHook.Target;
}
export interface HttpResponse {
	body: string;
}
export interface HttpClient {
	get: (path: string) => Promise<HttpResponse>;
}

export interface Action extends Form {
	from: (form: Form) => Action;
}
export interface Activator extends Form {
	from: (form: Form) => Activator;
}
export interface ActiveMagicEffect {
	from: (form: Form) => ActiveMagicEffect;
	addInventoryEventFilter: (akFilter: Form) => void;
	dispel: () => void;
	getBaseObject: () => MagicEffect;
	getCasterActor: () => Actor;
	getDuration: () => number;
	getMagnitude: () => number;
	getTargetActor: () => Actor;
	getTimeElapsed: () => number;
	registerForActorAction: (actionType: number) => void;
	registerForAnimationEvent: (akSender: ObjectReference, asEventName: string) => boolean;
	registerForCameraState: () => void;
	registerForControl: (control: string) => void;
	registerForCrosshairRef: () => void;
	registerForKey: (keyCode: number) => void;
	registerForLOS: (akViewer: Actor, akTarget: ObjectReference) => void;
	registerForMenu: (menuName: string) => void;
	registerForModEvent: (eventName: string, callbackName: string) => void;
	registerForNiNodeUpdate: () => void;
	registerForSingleLOSGain: (akViewer: Actor, akTarget: ObjectReference) => void;
	registerForSingleLOSLost: (akViewer: Actor, akTarget: ObjectReference) => void;
	registerForSingleUpdate: (afInterval: number) => void;
	registerForSingleUpdateGameTime: (afInterval: number) => void;
	registerForSleep: () => void;
	registerForTrackedStatsEvent: () => void;
	registerForUpdate: (afInterval: number) => void;
	registerForUpdateGameTime: (afInterval: number) => void;
	removeAllInventoryEventFilters: () => void;
	removeInventoryEventFilter: (akFilter: Form) => void;
	sendModEvent: (eventName: string, strArg: string, numArg: number) => void;
	startObjectProfiling: () => void;
	stopObjectProfiling: () => void;
	unregisterForActorAction: (actionType: number) => void;
	unregisterForAllControls: () => void;
	unregisterForAllKeys: () => void;
	unregisterForAllMenus: () => void;
	unregisterForAllModEvents: () => void;
	unregisterForAnimationEvent: (akSender: ObjectReference, asEventName: string) => void;
	unregisterForCameraState: () => void;
	unregisterForControl: (control: string) => void;
	unregisterForCrosshairRef: () => void;
	unregisterForKey: (keyCode: number) => void;
	unregisterForLOS: (akViewer: Actor, akTarget: ObjectReference) => void;
	unregisterForMenu: (menuName: string) => void;
	unregisterForModEvent: (eventName: string) => void;
	unregisterForNiNodeUpdate: () => void;
	unregisterForSleep: () => void;
	unregisterForTrackedStatsEvent: () => void;
	unregisterForUpdate: () => void;
	unregisterForUpdateGameTime: () => void;
}

export interface ActorBase extends Form {
	from: (form: Form) => ActorBase;
	getClass: () => Class;
	getCombatStyle: () => CombatStyle;
	getDeadCount: () => number;
	getFaceMorph: (index: number) => number;
	getFacePreset: (index: number) => number;
	getFaceTextureSet: () => TextureSet;
	getGiftFilter: () => FormList;
	getHairColor: () => ColorForm;
	getHeight: () => number;
	getIndexOfHeadPartByType: (type: number) => number;
	getIndexOfOverlayHeadPartByType: (type: number) => number;
	getNthHeadPart: (slotPart: number) => HeadPart;
	getNthOverlayHeadPart: (slotPart: number) => HeadPart;
	getNthSpell: (n: number) => Spell;
	getNumHeadParts: () => number;
	getNumOverlayHeadParts: () => number;
	getOutfit: (bSleepOutfit: boolean) => Outfit;
	getRace: () => Race;
	getSex: () => number;
	getSkin: () => Armor;
	getSkinFar: () => Armor;
	getSpellCount: () => number;
	getTemplate: () => ActorBase;
	getVoiceType: () => VoiceType;
	getWeight: () => number;
	isEssential: () => boolean;
	isInvulnerable: () => boolean;
	isProtected: () => boolean;
	isUnique: () => boolean;
	setClass: (c: Class) => void;
	setCombatStyle: (cs: CombatStyle) => void;
	setEssential: (abEssential: boolean) => void;
	setFaceMorph: (value: number, index: number) => void;
	setFacePreset: (value: number, index: number) => void;
	setFaceTextureSet: (textures: TextureSet) => void;
	setHairColor: (color: ColorForm) => void;
	setHeight: (height: number) => void;
	setInvulnerable: (abInvulnerable: boolean) => void;
	setNthHeadPart: (HeadPart: HeadPart, slotPart: number) => void;
	setOutfit: (akOutfit: Outfit, abSleepOutfit: boolean) => void;
	setProtected: (abProtected: boolean) => void;
	setSkin: (skin: Armor) => void;
	setSkinFar: (skin: Armor) => void;
	setVoiceType: (nVoice: VoiceType) => void;
	setWeight: (weight: number) => void;
}
export interface ActorValueInfo extends Form {
	from: (form: Form) => ActorValueInfo;
	addSkillExperience: (exp: number) => void;
	getBaseValue: (akActor: Actor) => number;
	getCurrentValue: (akActor: Actor) => number;
	getExperienceForLevel: (currentLevel: number) => number;
	getMaximumValue: (akActor: Actor) => number;
	getPerkTree: (list: FormList, akActor: Actor, unowned: boolean, allRanks: boolean) => void;
	getPerks: (akActor: Actor, unowned: boolean, allRanks: boolean) => object[];
	getSkillExperience: () => number;
	getSkillImproveMult: () => number;
	getSkillImproveOffset: () => number;
	getSkillLegendaryLevel: () => number;
	getSkillOffsetMult: () => number;
	getSkillUseMult: () => number;
	isSkill: () => boolean;
	setSkillExperience: (exp: number) => void;
	setSkillImproveMult: (value: number) => void;
	setSkillImproveOffset: (value: number) => void;
	setSkillLegendaryLevel: (level: number) => void;
	setSkillOffsetMult: (value: number) => void;
	setSkillUseMult: (value: number) => void;
	getActorValueInfoByID: (id: number) => ActorValueInfo;
	getActorValueInfoByName: (avName: string) => ActorValueInfo;
}
export interface Alias {
	from: (form: Form) => Alias;
	getID: () => number;
	getName: () => string;
	getOwningQuest: () => Quest;
	registerForActorAction: (actionType: number) => void;
	registerForAnimationEvent: (akSender: ObjectReference, asEventName: string) => boolean;
	registerForCameraState: () => void;
	registerForControl: (control: string) => void;
	registerForCrosshairRef: () => void;
	registerForKey: (keyCode: number) => void;
	registerForLOS: (akViewer: Actor, akTarget: ObjectReference) => void;
	registerForMenu: (menuName: string) => void;
	registerForModEvent: (eventName: string, callbackName: string) => void;
	registerForNiNodeUpdate: () => void;
	registerForSingleLOSGain: (akViewer: Actor, akTarget: ObjectReference) => void;
	registerForSingleLOSLost: (akViewer: Actor, akTarget: ObjectReference) => void;
	registerForSingleUpdate: (afInterval: number) => void;
	registerForSingleUpdateGameTime: (afInterval: number) => void;
	registerForSleep: () => void;
	registerForTrackedStatsEvent: () => void;
	registerForUpdate: (afInterval: number) => void;
	registerForUpdateGameTime: (afInterval: number) => void;
	sendModEvent: (eventName: string, strArg: string, numArg: number) => void;
	startObjectProfiling: () => void;
	stopObjectProfiling: () => void;
	unregisterForActorAction: (actionType: number) => void;
	unregisterForAllControls: () => void;
	unregisterForAllKeys: () => void;
	unregisterForAllMenus: () => void;
	unregisterForAllModEvents: () => void;
	unregisterForAnimationEvent: (akSender: ObjectReference, asEventName: string) => void;
	unregisterForCameraState: () => void;
	unregisterForControl: (control: string) => void;
	unregisterForCrosshairRef: () => void;
	unregisterForKey: (keyCode: number) => void;
	unregisterForLOS: (akViewer: Actor, akTarget: ObjectReference) => void;
	unregisterForMenu: (menuName: string) => void;
	unregisterForModEvent: (eventName: string) => void;
	unregisterForNiNodeUpdate: () => void;
	unregisterForSleep: () => void;
	unregisterForTrackedStatsEvent: () => void;
	unregisterForUpdate: () => void;
	unregisterForUpdateGameTime: () => void;
}
export interface Ammo extends Form {
	from: (form: Form) => Ammo;
	getDamage: () => number;
	getProjectile: () => Projectile;
	isBolt: () => boolean;
}
export interface MiscObject extends Form {
	from: (form: Form) => MiscObject;
}
export interface Apparatus extends MiscObject {
	from: (form: Form) => Apparatus;
	getQuality: () => number;
	setQuality: (quality: number) => void;
}
export interface Armor extends Form {
	from: (form: Form) => Armor;
	addSlotToMask: (slotMask: number) => number;
	getArmorRating: () => number;
	getEnchantment: () => Enchantment;
	getIconPath: (bFemalePath: boolean) => string;
	getMessageIconPath: (bFemalePath: boolean) => string;
	getModelPath: (bFemalePath: boolean) => string;
	getNthArmorAddon: (n: number) => ArmorAddon;
	getNumArmorAddons: () => number;
	getSlotMask: () => number;
	getWarmthRating: () => number;
	getWeightClass: () => number;
	modArmorRating: (modBy: number) => void;
	removeSlotFromMask: (slotMask: number) => number;
	setArmorRating: (armorRating: number) => void;
	setEnchantment: (e: Enchantment) => void;
	setIconPath: (path: string, bFemalePath: boolean) => void;
	setMessageIconPath: (path: string, bFemalePath: boolean) => void;
	setModelPath: (path: string, bFemalePath: boolean) => void;
	setSlotMask: (slotMask: number) => void;
	setWeightClass: (weightClass: number) => void;
	getMaskForSlot: (slot: number) => number;
}
export interface ArmorAddon extends Form {
	from: (form: Form) => ArmorAddon;
	addSlotToMask: (slotMask: number) => number;
	getModelNthTextureSet: (n: number, first: boolean, female: boolean) => TextureSet;
	getModelNumTextureSets: (first: boolean, female: boolean) => number;
	getModelPath: (firstPerson: boolean, female: boolean) => string;
	getNthAdditionalRace: (n: number) => Race;
	getNumAdditionalRaces: () => number;
	getSlotMask: () => number;
	removeSlotFromMask: (slotMask: number) => number;
	setModelNthTextureSet: (texture: TextureSet, n: number, first: boolean, female: boolean) => void;
	setModelPath: (path: string, firstPerson: boolean, female: boolean) => void;
	setSlotMask: (slotMask: number) => void;
}
export interface Art extends Form {
	from: (form: Form) => Art;
	getModelPath: () => string;
	setModelPath: (path: string) => void;
}
export interface AssociationType extends Form {
	from: (form: Form) => AssociationType;
}
export interface Book extends Form {
	from: (form: Form) => Book;
	getSkill: () => number;
	getSpell: () => Spell;
	isRead: () => boolean;
	isTakeable: () => boolean;
}

export interface Class extends Form {
	from: (form: Form) => Class;
}
export interface ColorForm extends Form {
	from: (form: Form) => ColorForm;
	getColor: () => number;
	setColor: (color: number) => void;
}
export interface CombatStyle extends Form {
	from: (form: Form) => CombatStyle;
	getAllowDualWielding: () => boolean;
	getAvoidThreatChance: () => number;
	getCloseRangeDuelingCircleMult: () => number;
	getCloseRangeDuelingFallbackMult: () => number;
	getCloseRangeFlankingFlankDistance: () => number;
	getCloseRangeFlankingStalkTime: () => number;
	getDefensiveMult: () => number;
	getFlightDiveBombChance: () => number;
	getFlightFlyingAttackChance: () => number;
	getFlightHoverChance: () => number;
	getGroupOffensiveMult: () => number;
	getLongRangeStrafeMult: () => number;
	getMagicMult: () => number;
	getMeleeAttackStaggeredMult: () => number;
	getMeleeBashAttackMult: () => number;
	getMeleeBashMult: () => number;
	getMeleeBashPowerAttackMult: () => number;
	getMeleeBashRecoiledMult: () => number;
	getMeleeMult: () => number;
	getMeleePowerAttackBlockingMult: () => number;
	getMeleePowerAttackStaggeredMult: () => number;
	getMeleeSpecialAttackMult: () => number;
	getOffensiveMult: () => number;
	getRangedMult: () => number;
	getShoutMult: () => number;
	getStaffMult: () => number;
	getUnarmedMult: () => number;
	setAllowDualWielding: (allow: boolean) => void;
	setAvoidThreatChance: (chance: number) => void;
	setCloseRangeDuelingCircleMult: (mult: number) => void;
	setCloseRangeDuelingFallbackMult: (mult: number) => void;
	setCloseRangeFlankingFlankDistance: (mult: number) => void;
	setCloseRangeFlankingStalkTime: (mult: number) => void;
	setDefensiveMult: (mult: number) => void;
	setFlightDiveBombChance: (chance: number) => void;
	setFlightFlyingAttackChance: (mult: number) => void;
	setFlightHoverChance: (chance: number) => void;
	setGroupOffensiveMult: (mult: number) => void;
	setLongRangeStrafeMult: (mult: number) => void;
	setMagicMult: (mult: number) => void;
	setMeleeAttackStaggeredMult: (mult: number) => void;
	setMeleeBashAttackMult: (mult: number) => void;
	setMeleeBashMult: (mult: number) => void;
	setMeleeBashPowerAttackMult: (mult: number) => void;
	setMeleeBashRecoiledMult: (mult: number) => void;
	setMeleeMult: (mult: number) => void;
	setMeleePowerAttackBlockingMult: (mult: number) => void;
	setMeleePowerAttackStaggeredMult: (mult: number) => void;
	setMeleeSpecialAttackMult: (mult: number) => void;
	setOffensiveMult: (mult: number) => void;
	setRangedMult: (mult: number) => void;
	setShoutMult: (mult: number) => void;
	setStaffMult: (mult: number) => void;
	setUnarmedMult: (mult: number) => void;
}
export interface ConstructibleObject extends MiscObject {
	from: (form: Form) => ConstructibleObject;
	getNthIngredient: (n: number) => Form;
	getNthIngredientQuantity: (n: number) => number;
	getNumIngredients: () => number;
	getResult: () => Form;
	getResultQuantity: () => number;
	getWorkbenchKeyword: () => Keyword;
	setNthIngredient: (required: Form, n: number) => void;
	setNthIngredientQuantity: (value: number, n: number) => void;
	setResult: (result: Form) => void;
	setResultQuantity: (quantity: number) => void;
	setWorkbenchKeyword: (aKeyword: Keyword) => void;
}
export interface Container extends Form {
	from: (form: Form) => Container;
}

export interface DefaultObjectManager extends Form {
	from: (form: Form) => DefaultObjectManager;
	getForm: (key: string) => Form;
	setForm: (key: string, newForm: Form) => void;
}
export interface Door extends Form {
	from: (form: Form) => Door;
}
export interface EffectShader extends Form {
	from: (form: Form) => EffectShader;
	play: (param1: ObjectReference, param2: number) => void;
	stop: (param1: ObjectReference) => void;
}
export interface Enchantment extends Form {
	from: (form: Form) => Enchantment;
	getBaseEnchantment: () => Enchantment;
	getCostliestEffectIndex: () => number;
	getKeywordRestrictions: () => FormList;
	getNthEffectArea: (index: number) => number;
	getNthEffectDuration: (index: number) => number;
	getNthEffectMagicEffect: (index: number) => MagicEffect;
	getNthEffectMagnitude: (index: number) => number;
	getNumEffects: () => number;
	isHostile: () => boolean;
	setKeywordRestrictions: (newKeywordList: FormList) => void;
	setNthEffectArea: (index: number, value: number) => void;
	setNthEffectDuration: (index: number, value: number) => void;
	setNthEffectMagnitude: (index: number, value: number) => void;
}
export interface EncounterZone extends Form {
	from: (form: Form) => EncounterZone;
}
export interface EquipSlot extends Form {
	from: (form: Form) => EquipSlot;
	getNthParent: (n: number) => EquipSlot;
	getNumParents: () => number;
}
export interface Explosion extends Form {
	from: (form: Form) => Explosion;
}
export interface Faction extends Form {
	from: (form: Form) => Faction;
	canPayCrimeGold: () => boolean;
	clearFactionFlag: (flag: number) => void;
	getBuySellList: () => FormList;
	getCrimeGold: () => number;
	getCrimeGoldNonViolent: () => number;
	getCrimeGoldViolent: () => number;
	getInfamy: () => number;
	getInfamyNonViolent: () => number;
	getInfamyViolent: () => number;
	getMerchantContainer: () => ObjectReference;
	getReaction: (akOther: Faction) => number;
	getStolenItemValueCrime: () => number;
	getStolenItemValueNoCrime: () => number;
	getVendorEndHour: () => number;
	getVendorRadius: () => number;
	getVendorStartHour: () => number;
	isFactionFlagSet: (flag: number) => boolean;
	isFactionInCrimeGroup: (akOther: Faction) => boolean;
	isNotSellBuy: () => boolean;
	isPlayerExpelled: () => boolean;
	modCrimeGold: (aiAmount: number, abViolent: boolean) => void;
	modReaction: (akOther: Faction, aiAmount: number) => void;
	onlyBuysStolenItems: () => boolean;
	playerPayCrimeGold: (abRemoveStolenItems: boolean, abGoToJail: boolean) => void;
	sendAssaultAlarm: () => void;
	sendPlayerToJail: (abRemoveInventory: boolean, abRealJail: boolean) => Promise<void>;
	setAlly: (akOther: Faction, abSelfIsFriendToOther: boolean, abOtherIsFriendToSelf: boolean) => void;
	setBuySellList: (akList: FormList) => void;
	setCrimeGold: (aiGold: number) => void;
	setCrimeGoldViolent: (aiGold: number) => void;
	setEnemy: (akOther: Faction, abSelfIsNeutralToOther: boolean, abOtherIsNeutralToSelf: boolean) => void;
	setFactionFlag: (flag: number) => void;
	setMerchantContainer: (akContainer: ObjectReference) => void;
	setNotSellBuy: (notSellBuy: boolean) => void;
	setOnlyBuysStolenItems: (onlyStolen: boolean) => void;
	setPlayerEnemy: (abIsEnemy: boolean) => void;
	setPlayerExpelled: (abIsExpelled: boolean) => void;
	setReaction: (akOther: Faction, aiNewValue: number) => void;
	setVendorEndHour: (hour: number) => void;
	setVendorRadius: (radius: number) => void;
	setVendorStartHour: (hour: number) => void;
}
export interface Flora extends Activator {
	from: (form: Form) => Flora;
	getHarvestSound: () => SoundDescriptor;
	getIngredient: () => Form;
	setHarvestSound: (akSoundDescriptor: SoundDescriptor) => void;
	setIngredient: (akIngredient: Form) => void;
}
export interface FormList extends Form {
	from: (form: Form) => FormList;
	addForm: (apForm: Form) => void;
	addForms: (forms: object[]) => void;
	find: (apForm: Form) => number;
	getAt: (aiIndex: number) => Form;
	getSize: () => number;
	hasForm: (akForm: Form) => boolean;
	removeAddedForm: (apForm: Form) => void;
	revert: () => void;
	toArray: () => object[];
}
export interface Furniture extends Activator {
	from: (form: Form) => Furniture;
}

export interface GlobalVariable extends Form {
	from: (form: Form) => GlobalVariable;
	getValue: () => number;
	setValue: (param1: number) => void;
}
export interface Hazard extends Form {
	from: (form: Form) => Hazard;
}
export interface HeadPart extends Form {
	from: (form: Form) => HeadPart;
	getIndexOfExtraPart: (p: HeadPart) => number;
	getNthExtraPart: (n: number) => HeadPart;
	getNumExtraParts: () => number;
	getPartName: () => string;
	getType: () => number;
	getValidRaces: () => FormList;
	hasExtraPart: (p: HeadPart) => boolean;
	isExtraPart: () => boolean;
	setValidRaces: (vRaces: FormList) => void;
	getHeadPart: (name: string) => HeadPart;
}
export interface Idle extends Form {
	from: (form: Form) => Idle;
}
export interface ImageSpaceModifier extends Form {
	from: (form: Form) => ImageSpaceModifier;
	apply: (param1: number) => void;
	applyCrossFade: (param1: number) => void;
	popTo: (param1: ImageSpaceModifier, param2: number) => void;
	remove: () => void;
	removeCrossFade: (param1: number) => void;
}
export interface ImpactDataSet extends Form {
	from: (form: Form) => ImpactDataSet;
}
export interface Ingredient extends Form {
	from: (form: Form) => Ingredient;
	getCostliestEffectIndex: () => number;
	getEffectAreas: () => number[];
	getEffectDurations: () => number[];
	getEffectMagnitudes: () => number[];
	getIsNthEffectKnown: (index: number) => boolean;
	getMagicEffects: () => object[];
	getNthEffectArea: (index: number) => number;
	getNthEffectDuration: (index: number) => number;
	getNthEffectMagicEffect: (index: number) => MagicEffect;
	getNthEffectMagnitude: (index: number) => number;
	getNumEffects: () => number;
	isHostile: () => boolean;
	learnAllEffects: () => void;
	learnEffect: (aiIndex: number) => void;
	learnNextEffect: () => number;
	setNthEffectArea: (index: number, value: number) => void;
	setNthEffectDuration: (index: number, value: number) => void;
	setNthEffectMagnitude: (index: number, value: number) => void;
}

export interface Key extends MiscObject {
	from: (form: Form) => Key;
}

export interface LeveledActor extends Form {
	from: (form: Form) => LeveledActor;
	addForm: (apForm: Form, aiLevel: number) => void;
	getNthCount: (n: number) => number;
	getNthForm: (n: number) => Form;
	getNthLevel: (n: number) => number;
	getNumForms: () => number;
	revert: () => void;
	setNthCount: (n: number, count: number) => void;
	setNthLevel: (n: number, level: number) => void;
}
export interface LeveledItem extends Form {
	from: (form: Form) => LeveledItem;
	addForm: (apForm: Form, aiLevel: number, aiCount: number) => void;
	getChanceGlobal: () => GlobalVariable;
	getChanceNone: () => number;
	getNthCount: (n: number) => number;
	getNthForm: (n: number) => Form;
	getNthLevel: (n: number) => number;
	getNumForms: () => number;
	revert: () => void;
	setChanceGlobal: (glob: GlobalVariable) => void;
	setChanceNone: (chance: number) => void;
	setNthCount: (n: number, count: number) => void;
	setNthLevel: (n: number, level: number) => void;
}
export interface LeveledSpell extends Form {
	from: (form: Form) => LeveledSpell;
	addForm: (apForm: Form, aiLevel: number) => void;
	getChanceNone: () => number;
	getNthForm: (n: number) => Form;
	getNthLevel: (n: number) => number;
	getNumForms: () => number;
	revert: () => void;
	setChanceNone: (chance: number) => void;
	setNthLevel: (n: number, level: number) => void;
}
export interface Light extends Form {
	from: (form: Form) => Light;
	getWarmthRating: () => number;
}

export interface LocationRefType extends Keyword {
	from: (form: Form) => LocationRefType;
}

export interface MusicType extends Form {
	from: (form: Form) => MusicType;
	add: () => void;
	remove: () => void;
}
export interface NetImmerse {
	from: (form: Form) => NetImmerse;
	getNodeLocalPosition: (ref: ObjectReference, node: string, _in: number[], firstPerson: boolean) => boolean;
	getNodeLocalPositionX: (ref: ObjectReference, node: string, firstPerson: boolean) => number;
	getNodeLocalPositionY: (ref: ObjectReference, node: string, firstPerson: boolean) => number;
	getNodeLocalPositionZ: (ref: ObjectReference, node: string, firstPerson: boolean) => number;
	getNodeLocalRotationEuler: (ref: ObjectReference, node: string, _in: number[], firstPerson: boolean) => boolean;
	getNodeLocalRotationMatrix: (ref: ObjectReference, node: string, _in: number[], firstPerson: boolean) => boolean;
	getNodeScale: (ref: ObjectReference, node: string, firstPerson: boolean) => number;
	getNodeWorldPosition: (ref: ObjectReference, node: string, _in: number[], firstPerson: boolean) => boolean;
	getNodeWorldPositionX: (ref: ObjectReference, node: string, firstPerson: boolean) => number;
	getNodeWorldPositionY: (ref: ObjectReference, node: string, firstPerson: boolean) => number;
	getNodeWorldPositionZ: (ref: ObjectReference, node: string, firstPerson: boolean) => number;
	getNodeWorldRotationEuler: (ref: ObjectReference, node: string, _in: number[], firstPerson: boolean) => boolean;
	getNodeWorldRotationMatrix: (ref: ObjectReference, node: string, _in: number[], firstPerson: boolean) => boolean;
	getRelativeNodePosition: (
		ref: ObjectReference,
		nodeA: string,
		nodeB: string,
		_in: number[],
		firstPerson: boolean
	) => boolean;
	getRelativeNodePositionX: (ref: ObjectReference, nodeA: string, nodeB: string, firstPerson: boolean) => number;
	getRelativeNodePositionY: (ref: ObjectReference, nodeA: string, nodeB: string, firstPerson: boolean) => number;
	getRelativeNodePositionZ: (ref: ObjectReference, nodeA: string, nodeB: string, firstPerson: boolean) => number;
	hasNode: (ref: ObjectReference, node: string, firstPerson: boolean) => boolean;
	setNodeLocalPosition: (ref: ObjectReference, node: string, _in: number[], firstPerson: boolean) => boolean;
	setNodeLocalPositionX: (ref: ObjectReference, node: string, x: number, firstPerson: boolean) => void;
	setNodeLocalPositionY: (ref: ObjectReference, node: string, y: number, firstPerson: boolean) => void;
	setNodeLocalPositionZ: (ref: ObjectReference, node: string, z: number, firstPerson: boolean) => void;
	setNodeLocalRotationEuler: (ref: ObjectReference, node: string, _in: number[], firstPerson: boolean) => boolean;
	setNodeLocalRotationMatrix: (ref: ObjectReference, node: string, _in: number[], firstPerson: boolean) => boolean;
	setNodeScale: (ref: ObjectReference, node: string, scale: number, firstPerson: boolean) => void;
	setNodeTextureSet: (ref: ObjectReference, node: string, tSet: TextureSet, firstPerson: boolean) => void;
}
export interface Outfit extends Form {
	from: (form: Form) => Outfit;
	getNthPart: (n: number) => Form;
	getNumParts: () => number;
}
export interface Projectile extends Form {
	from: (form: Form) => Projectile;
}
export interface Package extends Form {
	from: (form: Form) => Package;
	getOwningQuest: () => Quest;
	getTemplate: () => Package;
}
export interface Perk extends Form {
	from: (form: Form) => Perk;
	getNextPerk: () => Perk;
	getNthEntryLeveledList: (n: number) => LeveledItem;
	getNthEntryPriority: (n: number) => number;
	getNthEntryQuest: (n: number) => Quest;
	getNthEntryRank: (n: number) => number;
	getNthEntrySpell: (n: number) => Spell;
	getNthEntryStage: (n: number) => number;
	getNthEntryText: (n: number) => string;
	getNthEntryValue: (n: number, i: number) => number;
	getNumEntries: () => number;
	setNthEntryLeveledList: (n: number, lList: LeveledItem) => boolean;
	setNthEntryPriority: (n: number, priority: number) => boolean;
	setNthEntryQuest: (n: number, newQuest: Quest) => boolean;
	setNthEntryRank: (n: number, rank: number) => boolean;
	setNthEntrySpell: (n: number, newSpell: Spell) => boolean;
	setNthEntryStage: (n: number, stage: number) => boolean;
	setNthEntryText: (n: number, newText: string) => boolean;
	setNthEntryValue: (n: number, i: number, value: number) => boolean;
}
export interface Potion extends Form {
	from: (form: Form) => Potion;
	getCostliestEffectIndex: () => number;
	getEffectAreas: () => number[];
	getEffectDurations: () => number[];
	getEffectMagnitudes: () => number[];
	getMagicEffects: () => object[];
	getNthEffectArea: (index: number) => number;
	getNthEffectDuration: (index: number) => number;
	getNthEffectMagicEffect: (index: number) => MagicEffect;
	getNthEffectMagnitude: (index: number) => number;
	getNumEffects: () => number;
	getUseSound: () => SoundDescriptor;
	isFood: () => boolean;
	isHostile: () => boolean;
	isPoison: () => boolean;
	setNthEffectArea: (index: number, value: number) => void;
	setNthEffectDuration: (index: number, value: number) => void;
	setNthEffectMagnitude: (index: number, value: number) => void;
}
export interface Race extends Form {
	from: (form: Form) => Race;
	clearRaceFlag: (n: number) => void;
	getDefaultVoiceType: (female: boolean) => VoiceType;
	getNthSpell: (n: number) => Spell;
	getSkin: () => Armor;
	getSpellCount: () => number;
	isRaceFlagSet: (n: number) => boolean;
	setDefaultVoiceType: (female: boolean, voice: VoiceType) => void;
	setRaceFlag: (n: number) => void;
	setSkin: (skin: Armor) => void;
	getNthPlayableRace: (n: number) => Race;
	getNumPlayableRaces: () => number;
	getRace: (editorId: string) => Race;
}
export interface ReferenceAlias extends Alias {
	from: (form: Form) => ReferenceAlias;
	addInventoryEventFilter: (param1: Form) => void;
	clear: () => void;
	forceRefTo: (param1: ObjectReference) => void;
	getReference: () => ObjectReference;
	removeAllInventoryEventFilters: () => void;
	removeInventoryEventFilter: (param1: Form) => void;
}

export interface Static extends Form {
	from: (form: Form) => Static;
}
export interface Scene extends Form {
	from: (form: Form) => Scene;
	forceStart: () => void;
	getOwningQuest: () => Quest;
	isActionComplete: (param1: number) => boolean;
	isPlaying: () => boolean;
	start: () => void;
	stop: () => void;
}
export interface Scroll extends Form {
	from: (form: Form) => Scroll;
	cast: (akSource: ObjectReference, akTarget: ObjectReference) => Promise<void>;
	getCastTime: () => number;
	getCostliestEffectIndex: () => number;
	getEffectAreas: () => number[];
	getEffectDurations: () => number[];
	getEffectMagnitudes: () => number[];
	getEquipType: () => EquipSlot;
	getMagicEffects: () => object[];
	getNthEffectArea: (index: number) => number;
	getNthEffectDuration: (index: number) => number;
	getNthEffectMagicEffect: (index: number) => MagicEffect;
	getNthEffectMagnitude: (index: number) => number;
	getNumEffects: () => number;
	getPerk: () => Perk;
	setEquipType: (type: EquipSlot) => void;
	setNthEffectArea: (index: number, value: number) => void;
	setNthEffectDuration: (index: number, value: number) => void;
	setNthEffectMagnitude: (index: number, value: number) => void;
}
export interface ShaderParticleGeometry extends Form {
	from: (form: Form) => ShaderParticleGeometry;
	apply: (param1: number) => void;
	remove: (param1: number) => void;
}
export interface Shout extends Form {
	from: (form: Form) => Shout;
	getNthRecoveryTime: (n: number) => number;
	getNthSpell: (n: number) => Spell;
	getNthWordOfPower: (n: number) => WordOfPower;
	setNthRecoveryTime: (n: number, time: number) => void;
	setNthSpell: (n: number, aSpell: Spell) => void;
	setNthWordOfPower: (n: number, aWoop: WordOfPower) => void;
}
export interface SoulGem extends MiscObject {
	from: (form: Form) => SoulGem;
	getGemSize: () => number;
	getSoulSize: () => number;
}

export interface SoundCategory extends Form {
	from: (form: Form) => SoundCategory;
	mute: () => void;
	pause: () => void;
	setFrequency: (param1: number) => void;
	setVolume: (param1: number) => void;
	unMute: () => void;
	unPause: () => void;
}
export interface SoundDescriptor extends Form {
	from: (form: Form) => SoundDescriptor;
	getDecibelAttenuation: () => number;
	getDecibelVariance: () => number;
	getFrequencyShift: () => number;
	getFrequencyVariance: () => number;
	setDecibelAttenuation: (dbAttenuation: number) => void;
	setDecibelVariance: (dbVariance: number) => void;
	setFrequencyShift: (frequencyShift: number) => void;
	setFrequencyVariance: (frequencyVariance: number) => void;
}
export interface TESModPlatform {
	from: (form: Form) => TESModPlatform;
	addItemEx: (
		containerRefr: ObjectReference,
		item: Form,
		countDelta: number,
		health: number,
		enchantment: Enchantment,
		maxCharge: number,
		removeEnchantmentOnUnequip: boolean,
		chargePercent: number,
		textDisplayData: string,
		soul: number,
		poison: Potion,
		poisonCount: number
	) => void;
	clearTintMasks: (targetActor: Actor) => void;
	createNpc: () => ActorBase;
	getNthVtableElement: (pointer: Form, pointerOffset: number, elementIndex: number) => number;
	getSkinColor: (base: ActorBase) => ColorForm;
	isPlayerRunningEnabled: () => boolean;
	moveRefrToPosition: (
		refr: ObjectReference,
		cell: Cell,
		world: WorldSpace,
		posX: number,
		posY: number,
		posZ: number,
		rotX: number,
		rotY: number,
		rotZ: number
	) => void;
	pushTintMask: (targetActor: Actor, type: number, argb: number, texturePath: string) => void;
	pushWornState: (worn: boolean, wornLeft: boolean) => void;
	resetContainer: (container: Form) => void;
	resizeHeadpartsArray: (npc: ActorBase, newSize: number) => void;
	resizeTintsArray: (newSize: number) => void;
	setFormIdUnsafe: (Form: Form, newId: number) => void;
	setNpcHairColor: (npc: ActorBase, hairColor: number) => void;
	setNpcRace: (npc: ActorBase, race: Race) => void;
	setNpcSex: (npc: ActorBase, sex: number) => void;
	setNpcSkinColor: (npc: ActorBase, skinColor: number) => void;
	setWeaponDrawnMode: (actor: Actor, mode: number) => void;
	updateEquipment: (actor: Actor, item: Form, leftHand: boolean) => void;
}
export interface TalkingActivator extends Activator {
	from: (form: Form) => TalkingActivator;
}
export interface TextureSet extends Form {
	from: (form: Form) => TextureSet;
	getNthTexturePath: (n: number) => string;
	getNumTexturePaths: () => number;
	setNthTexturePath: (n: number, texturePath: string) => void;
}
export interface Topic extends Form {
	from: (form: Form) => Topic;
	add: () => void;
}
export interface TopicInfo extends Form {
	from: (form: Form) => TopicInfo;
	getOwningQuest: () => Quest;
}
export interface TreeObject extends Form {
	from: (form: Form) => TreeObject;
	getHarvestSound: () => SoundDescriptor;
	getIngredient: () => Form;
	setHarvestSound: (akSoundDescriptor: SoundDescriptor) => void;
	setIngredient: (akIngredient: Form) => void;
}
export interface Ui {
	from: (form: Form) => Ui;
	closeCustomMenu: () => void;
	getBool: (menuName: string, target: string) => boolean;
	getFloat: (menuName: string, target: string) => number;
	getInt: (menuName: string, target: string) => number;
	getString: (menuName: string, target: string) => string;
	invokeBool: (menuName: string, target: string, arg: boolean) => void;
	invokeBoolA: (menuName: string, target: string, args: boolean[]) => void;
	invokeFloat: (menuName: string, target: string, arg: number) => void;
	invokeFloatA: (menuName: string, target: string, args: number[]) => void;
	invokeForm: (menuName: string, target: string, arg: Form) => void;
	invokeInt: (menuName: string, target: string, arg: number) => void;
	invokeIntA: (menuName: string, target: string, args: number[]) => void;
	invokeString: (menuName: string, target: string, arg: string) => void;
	invokeStringA: (menuName: string, target: string, args: string[]) => void;
	isMenuOpen: (menuName: string) => boolean;
	isTextInputEnabled: () => boolean;
	openCustomMenu: (swfPath: string, flags: number) => void;
	setBool: (menuName: string, target: string, value: boolean) => void;
	setFloat: (menuName: string, target: string, value: number) => void;
	setInt: (menuName: string, target: string, value: number) => void;
	setString: (menuName: string, target: string, value: string) => void;
}
export interface VisualEffect extends Form {
	from: (form: Form) => VisualEffect;
	play: (param1: ObjectReference, param2: number, param3: ObjectReference) => void;
	stop: (param1: ObjectReference) => void;
}
export interface VoiceType extends Form {
	from: (form: Form) => VoiceType;
}
export interface Weapon extends Form {
	from: (form: Form) => Weapon;
	fire: (akSource: ObjectReference, akAmmo: Ammo) => void;
	getBaseDamage: () => number;
	getCritDamage: () => number;
	getCritEffect: () => Spell;
	getCritEffectOnDeath: () => boolean;
	getCritMultiplier: () => number;
	getEnchantment: () => Enchantment;
	getEnchantmentValue: () => number;
	getEquipType: () => EquipSlot;
	getEquippedModel: () => Static;
	getIconPath: () => string;
	getMaxRange: () => number;
	getMessageIconPath: () => string;
	getMinRange: () => number;
	getModelPath: () => string;
	getReach: () => number;
	getResist: () => string;
	getSkill: () => string;
	getSpeed: () => number;
	getStagger: () => number;
	getTemplate: () => Weapon;
	getWeaponType: () => number;
	setBaseDamage: (damage: number) => void;
	setCritDamage: (damage: number) => void;
	setCritEffect: (ce: Spell) => void;
	setCritEffectOnDeath: (ceod: boolean) => void;
	setCritMultiplier: (crit: number) => void;
	setEnchantment: (e: Enchantment) => void;
	setEnchantmentValue: (value: number) => void;
	setEquipType: (type: EquipSlot) => void;
	setEquippedModel: (model: Static) => void;
	setIconPath: (path: string) => void;
	setMaxRange: (maxRange: number) => void;
	setMessageIconPath: (path: string) => void;
	setMinRange: (minRange: number) => void;
	setModelPath: (path: string) => void;
	setReach: (reach: number) => void;
	setResist: (resist: string) => void;
	setSkill: (skill: string) => void;
	setSpeed: (speed: number) => void;
	setStagger: (stagger: number) => void;
	setWeaponType: (type: number) => void;
}
export interface Weather extends Form {
	from: (form: Form) => Weather;
	forceActive: (abOverride: boolean) => void;
	getClassification: () => number;
	getFogDistance: (day: boolean, type: number) => number;
	getSunDamage: () => number;
	getSunGlare: () => number;
	getWindDirection: () => number;
	getWindDirectionRange: () => number;
	setActive: (abOverride: boolean, abAccelerate: boolean) => void;
	findWeather: (auiType: number) => Weather;
	getCurrentWeather: () => Weather;
	getCurrentWeatherTransition: () => number;
	getOutgoingWeather: () => Weather;
	getSkyMode: () => number;
	releaseOverride: () => void;
}
export interface WordOfPower extends Form {
	from: (form: Form) => WordOfPower;
}
export interface WorldSpace extends Form {
	from: (form: Form) => WorldSpace;
}

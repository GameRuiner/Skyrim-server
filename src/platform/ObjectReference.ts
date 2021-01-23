import { Actor } from './Actor';
import { Form } from './Form';
import * as skyrimPlatform from './skyrimPlatform';

export interface ObjectReference extends Form {
	from: (form: Form) => ObjectReference;
	activate: (akActivator: ObjectReference, abDefaultProcessingOnly: boolean) => boolean;
	addDependentAnimatedObjectReference: (akDependent: ObjectReference) => boolean;
	addInventoryEventFilter: (akFilter: Form) => void;
	addItem: (akItemToAdd: Form, aiCount: number, abSilent: boolean) => void;
	addToMap: (abAllowFastTravel: boolean) => void;
	applyHavokImpulse: (afX: number, afY: number, afZ: number, afMagnitude: number) => Promise<void>;
	blockActivation: (abBlocked: boolean) => void;
	calculateEncounterLevel: (aiDifficulty: number) => number;
	canFastTravelToMarker: () => boolean;
	clearDestruction: () => void;
	createDetectionEvent: (akOwner: Actor, aiSoundLevel: number) => void;
	createEnchantment: (
		maxCharge: number,
		effects: object[],
		magnitudes: number[],
		areas: number[],
		durations: number[]
	) => void;
	damageObject: (afDamage: number) => Promise<void>;
	delete: () => Promise<void>;
	disable: (abFadeOut: boolean) => Promise<void>;
	disableNoWait: (abFadeOut: boolean) => void;
	dropObject: (akObject: Form, aiCount: number) => Promise<ObjectReference>;
	enable: (abFadeIn: boolean) => Promise<void>;
	enableFastTravel: (abEnable: boolean) => void;
	enableNoWait: (abFadeIn: boolean) => void;
	forceAddRagdollToWorld: () => Promise<void>;
	forceRemoveRagdollFromWorld: () => Promise<void>;
	getActorOwner: () => skyrimPlatform.ActorBase;
	getAllForms: (toFill: skyrimPlatform.FormList) => void;
	getAngleX: () => number;
	getAngleY: () => number;
	getAngleZ: () => number;
	getAnimationVariableBool: (arVariableName: string) => boolean;
	getAnimationVariableFloat: (arVariableName: string) => number;
	getAnimationVariableInt: (arVariableName: string) => number;
	getBaseObject: () => Form;
	getContainerForms: () => object[];
	getCurrentDestructionStage: () => number;
	getCurrentLocation: () => Location;
	getCurrentScene: () => skyrimPlatform.Scene;
	getDisplayName: () => string;
	getEditorLocation: () => Location;
	getEnableParent: () => ObjectReference;
	getEnchantment: () => skyrimPlatform.Enchantment;
	getFactionOwner: () => skyrimPlatform.Faction;
	getHeadingAngle: (akOther: ObjectReference) => number;
	getHeight: () => number;
	getItemCharge: () => number;
	getItemCount: (akItem: Form) => number;
	getItemHealthPercent: () => number;
	getItemMaxCharge: () => number;
	getKey: () => skyrimPlatform.Key;
	getLength: () => number;
	getLinkedRef: (apKeyword: skyrimPlatform.Keyword) => ObjectReference;
	getLockLevel: () => number;
	getMass: () => number;
	getNthForm: (index: number) => Form;
	getNthLinkedRef: (aiLinkedRef: number) => ObjectReference;
	getNthReferenceAlias: (n: number) => skyrimPlatform.ReferenceAlias;
	getNumItems: () => number;
	getNumReferenceAliases: () => number;
	getOpenState: () => number;
	getParentCell: () => skyrimPlatform.Cell;
	getPoison: () => skyrimPlatform.Potion;
	getPositionX: () => number;
	getPositionY: () => number;
	getPositionZ: () => number;
	getReferenceAliases: () => object[];
	getScale: () => number;
	getTotalArmorWeight: () => number;
	getTotalItemWeight: () => number;
	getTriggerObjectCount: () => number;
	getVoiceType: () => skyrimPlatform.VoiceType;
	getWidth: () => number;
	getWorldSpace: () => skyrimPlatform.WorldSpace;
	hasEffectKeyword: (akKeyword: skyrimPlatform.Keyword) => boolean;
	hasNode: (asNodeName: string) => boolean;
	hasRefType: (akRefType: skyrimPlatform.LocationRefType) => boolean;
	ignoreFriendlyHits: (abIgnore: boolean) => void;
	interruptCast: () => void;
	is3DLoaded: () => boolean;
	isActivateChild: (akChild: ObjectReference) => boolean;
	isActivationBlocked: () => boolean;
	isDeleted: () => boolean;
	isDisabled: () => boolean;
	isFurnitureInUse: (abIgnoreReserved: boolean) => boolean;
	isFurnitureMarkerInUse: (aiMarker: number, abIgnoreReserved: boolean) => boolean;
	isHarvested: () => boolean;
	isIgnoringFriendlyHits: () => boolean;
	isInDialogueWithPlayer: () => boolean;
	isLockBroken: () => boolean;
	isLocked: () => boolean;
	isMapMarkerVisible: () => boolean;
	isOffLimits: () => boolean;
	knockAreaEffect: (afMagnitude: number, afRadius: number) => void;
	lock: (abLock: boolean, abAsOwner: boolean) => void;
	moveTo: (
		akTarget: ObjectReference,
		afXOffset: number,
		afYOffset: number,
		afZOffset: number,
		abMatchRotation: boolean
	) => Promise<void>;
	moveToInteractionLocation: (akTarget: ObjectReference) => Promise<void>;
	moveToMyEditorLocation: () => Promise<void>;
	moveToNode: (akTarget: ObjectReference, asNodeName: string) => Promise<void>;
	placeActorAtMe: (akActorToPlace: skyrimPlatform.ActorBase, aiLevelMod: number, akZone: skyrimPlatform.EncounterZone) => Actor;
	placeAtMe: (
		akFormToPlace: Form,
		aiCount: number,
		abForcePersist: boolean,
		abInitiallyDisabled: boolean
	) => ObjectReference;
	playAnimation: (asAnimation: string) => boolean;
	playAnimationAndWait: (asAnimation: string, asEventName: string) => Promise<boolean>;
	playGamebryoAnimation: (asAnimation: string, abStartOver: boolean, afEaseInTime: number) => boolean;
	playImpactEffect: (
		akImpactEffect: skyrimPlatform.ImpactDataSet,
		asNodeName: string,
		afPickDirX: number,
		afPickDirY: number,
		afPickDirZ: number,
		afPickLength: number,
		abApplyNodeRotation: boolean,
		abUseNodeLocalRotation: boolean
	) => boolean;
	playSyncedAnimationAndWaitSS: (
		asAnimation1: string,
		asEvent1: string,
		akObj2: ObjectReference,
		asAnimation2: string,
		asEvent2: string
	) => Promise<boolean>;
	playSyncedAnimationSS: (asAnimation1: string, akObj2: ObjectReference, asAnimation2: string) => boolean;
	playTerrainEffect: (asEffectModelName: string, asAttachBoneName: string) => void;
	processTrapHit: (
		akTrap: ObjectReference,
		afDamage: number,
		afPushback: number,
		afXVel: number,
		afYVel: number,
		afZVel: number,
		afXPos: number,
		afYPos: number,
		afZPos: number,
		aeMaterial: number,
		afStagger: number
	) => void;
	pushActorAway: (akActorToPush: Actor, aiKnockbackForce: number) => void;
	removeAllInventoryEventFilters: () => void;
	removeAllItems: (akTransferTo: ObjectReference, abKeepOwnership: boolean, abRemoveQuestItems: boolean) => void;
	removeDependentAnimatedObjectReference: (akDependent: ObjectReference) => boolean;
	removeInventoryEventFilter: (akFilter: Form) => void;
	removeItem: (akItemToRemove: Form, aiCount: number, abSilent: boolean, akOtherContainer: ObjectReference) => void;
	reset: (akTarget: ObjectReference) => Promise<void>;
	resetInventory: () => void;
	say: (akTopicToSay: skyrimPlatform.Topic, akActorToSpeakAs: Actor, abSpeakInPlayersHead: boolean) => void;
	sendStealAlarm: (akThief: Actor) => void;
	setActorCause: (akActor: Actor) => void;
	setActorOwner: (akActorBase: skyrimPlatform.ActorBase) => void;
	setAngle: (afXAngle: number, afYAngle: number, afZAngle: number) => Promise<void>;
	setAnimationVariableBool: (arVariableName: string, abNewValue: boolean) => void;
	setAnimationVariableFloat: (arVariableName: string, afNewValue: number) => void;
	setAnimationVariableInt: (arVariableName: string, aiNewValue: number) => void;
	setDestroyed: (abDestroyed: boolean) => void;
	setDisplayName: (name: string, force: boolean) => boolean;
	setEnchantment: (source: skyrimPlatform.Enchantment, maxCharge: number) => void;
	setFactionOwner: (akFaction: skyrimPlatform.Faction) => void;
	setHarvested: (harvested: boolean) => void;
	setItemCharge: (charge: number) => void;
	setItemHealthPercent: (health: number) => void;
	setItemMaxCharge: (maxCharge: number) => void;
	setLockLevel: (aiLockLevel: number) => void;
	setMotionType: (aeMotionType: skyrimPlatform.MotionType, abAllowActivate: boolean) => Promise<void>;
	setNoFavorAllowed: (abNoFavor: boolean) => void;
	setOpen: (abOpen: boolean) => void;
	setPosition: (afX: number, afY: number, afZ: number) => Promise<void>;
	setScale: (afScale: number) => Promise<void>;
	splineTranslateTo: (
		afX: number,
		afY: number,
		afZ: number,
		afXAngle: number,
		afYAngle: number,
		afZAngle: number,
		afTangentMagnitude: number,
		afSpeed: number,
		afMaxRotationSpeed: number
	) => void;
	splineTranslateToRefNode: (
		arTarget: ObjectReference,
		arNodeName: string,
		afTangentMagnitude: number,
		afSpeed: number,
		afMaxRotationSpeed: number
	) => void;
	stopTranslation: () => void;
	tetherToHorse: (akHorse: ObjectReference) => void;
	translateTo: (
		afX: number,
		afY: number,
		afZ: number,
		afXAngle: number,
		afYAngle: number,
		afZAngle: number,
		afSpeed: number,
		afMaxRotationSpeed: number
	) => void;
	waitForAnimationEvent: (asEventName: string) => Promise<boolean>;
	getDistance: (akOther: ObjectReference) => number;
}

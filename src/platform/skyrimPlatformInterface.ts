import { Game } from './Game';
import * as skyrimPlatform from './skyrimPlatform';

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
	| skyrimPlatform.ActivateEvent
	| skyrimPlatform.WaitStopEvent
	| skyrimPlatform.ObjectLoadedEvent
	| skyrimPlatform.MoveAttachDetachEvent
	| skyrimPlatform.LockChangedEvent
	| skyrimPlatform.GrabReleaseEvent
	| skyrimPlatform.CellFullyLoadedEvent
	| skyrimPlatform.SwitchRaceCompleteEvent
	| skyrimPlatform.UniqueIDChangeEvent
	| skyrimPlatform.TrackedStatsEvent
	| skyrimPlatform.InitScriptEvent
	| skyrimPlatform.ResetEvent
	| skyrimPlatform.CombatEvent
	| skyrimPlatform.DeathEvent
	| skyrimPlatform.ContainerChangedEvent
	| skyrimPlatform.HitEvent
	| skyrimPlatform.EquipEvent
	| skyrimPlatform.MagicEffectApplyEvent
	| skyrimPlatform.ActiveEffectApplyRemoveEvent;

export interface SkyrimPlatform {
	printConsole: (...args: any[]) => void;
	writeScript: (scriptName: string, src: string) => void;
	callNative: (
		className: string,
		functionName: string,
		self?: object,
		...args: any
	) => any;
	getJsMemoryUsage: () => number;
	getPluginSourceCode: (pluginName: string) => string;
	writePlugin: (pluginName: string, newSources: string) => string;
	getPlatformVersion: () => string;
	storage: any;
	settings: any;
	Face: skyrimPlatform.Face;
	ChangeFormNpc: skyrimPlatform.ChangeFormNpc;
	loadGame: (
		pos: number[],
		angle: number[],
		worldOrCell: number,
		changeFormNpc?: skyrimPlatform.ChangeFormNpc
	) => void;
	worldPointToScreenPoint: (...args: number[][]) => number[][];
	PacketType: skyrimPlatform.PacketType;
	Browser: skyrimPlatform.Browser;
	ExtraData: skyrimPlatform.ExtraData;
	ExtraHealth: skyrimPlatform.ExtraHealth;
	ExtraCount: skyrimPlatform.ExtraCount;
	ExtraEnchantment: skyrimPlatform.ExtraEnchantment;
	ExtraCharge: skyrimPlatform.ExtraCharge;
	ExtraTextDisplayData: skyrimPlatform.ExtraTextDisplayData;
	ExtraSoul: skyrimPlatform.ExtraSoul;
	ExtraPoison: skyrimPlatform.ExtraPoison;
	ExtraWorn: skyrimPlatform.ExtraWorn;
	ExtraWornLeft: skyrimPlatform.ExtraWornLeft;
	BaseExtraList: skyrimPlatform.BaseExtraList;
	InventoryChangesEntry: skyrimPlatform.InventoryChangesEntry;
	getExtraContainerChanges: (
		objectReferenceId: number
	) => skyrimPlatform.InventoryChangesEntry[];
	InventoryEntry: skyrimPlatform.InventoryEntry;
	getContainer: (baseId: number) => skyrimPlatform.InventoryEntry[];
	ActivateEvent: skyrimPlatform.ActivateEvent;
	MoveAttachDetachEvent: skyrimPlatform.MoveAttachDetachEvent;
	WaitStopEvent: skyrimPlatform.WaitStopEvent;
	ObjectLoadedEvent: skyrimPlatform.ObjectLoadedEvent;
	LockChangedEvent: skyrimPlatform.LockChangedEvent;
	CellFullyLoadedEvent: skyrimPlatform.CellFullyLoadedEvent;
	GrabReleaseEvent: skyrimPlatform.GrabReleaseEvent;
	SwitchRaceCompleteEvent: skyrimPlatform.SwitchRaceCompleteEvent;
	UniqueIDChangeEvent: skyrimPlatform.UniqueIDChangeEvent;
	TrackedStatsEvent: skyrimPlatform.TrackedStatsEvent;
	InitScriptEvent: skyrimPlatform.InitScriptEvent;
	ResetEvent: skyrimPlatform.ResetEvent;
	CombatEvent: skyrimPlatform.CombatEvent;
	DeathEvent: skyrimPlatform.DeathEvent;
	ContainerChangedEvent: skyrimPlatform.ContainerChangedEvent;
	HitEvent: skyrimPlatform.HitEvent;
	EquipEvent: skyrimPlatform.EquipEvent;
	ActiveEffectApplyRemoveEvent: skyrimPlatform.ActiveEffectApplyRemoveEvent;
	MagicEffectApplyEvent: skyrimPlatform.MagicEffectApplyEvent;

	on: (
		eventName: SkyrimEventName,
		callback: (event?: SkyrimEvent) => void
	) => void;
	once: (
		eventName: SkyrimEventName,
		callback: (event?: SkyrimEvent) => void
	) => void;

	Hooks: skyrimPlatform.Hooks;
	HttpResponse: skyrimPlatform.HttpResponse;
	HttpClient: skyrimPlatform.HttpClient;
	Form: skyrimPlatform.Form;
	Action: skyrimPlatform.Action;
	Activator: skyrimPlatform.Activator;
	ActiveMagicEffect: skyrimPlatform.ActiveMagicEffect;
	ObjectReference: skyrimPlatform.ObjectReference;
	Actor: {
		from: (form: skyrimPlatform.Form) => skyrimPlatform.Actor;
		addPerk: (akPerk: skyrimPlatform.Perk) => void;
		addShout: (akShout: skyrimPlatform.Shout) => boolean;
		addSpell: (akSpell: skyrimPlatform.Spell, abVerbose: boolean) => boolean;
		allowBleedoutDialogue: (abCanTalk: boolean) => void;
		allowPCDialogue: (abTalk: boolean) => void;
		attachAshPile: (akAshPileBase: skyrimPlatform.Form) => void;
		canFlyHere: () => boolean;
		changeHeadPart: (hPart: skyrimPlatform.HeadPart) => void;
		clearArrested: () => void;
		clearExpressionOverride: () => void;
		clearExtraArrows: () => void;
		clearForcedMovement: () => void;
		clearKeepOffsetFromActor: () => void;
		clearLookAt: () => void;
		damageActorValue: (asValueName: string, afDamage: number) => void;
		dismount: () => boolean;
		dispelAllSpells: () => void;
		dispelSpell: (akSpell: skyrimPlatform.Spell) => boolean;
		doCombatSpellApply: (
			akSpell: skyrimPlatform.Spell,
			akTarget: skyrimPlatform.ObjectReference
		) => void;
		drawWeapon: () => void;
		enableAI: (abEnable: boolean) => void;
		endDeferredKill: () => void;
		equipItem: (
			akItem: skyrimPlatform.Form,
			abPreventRemoval: boolean,
			abSilent: boolean
		) => void;
		equipItemById: (
			item: skyrimPlatform.Form,
			itemId: number,
			equipSlot: number,
			preventUnequip: boolean,
			equipSound: boolean
		) => void;
		equipItemEx: (
			item: skyrimPlatform.Form,
			equipSlot: number,
			preventUnequip: boolean,
			equipSound: boolean
		) => void;
		equipShout: (akShout: skyrimPlatform.Shout) => void;
		equipSpell: (akSpell: skyrimPlatform.Spell, aiSource: number) => void;
		evaluatePackage: () => void;
		forceActorValue: (asValueName: string, afNewValue: number) => void;
		forceMovementDirection: (
			afXAngle: number,
			afYAngle: number,
			afZAngle: number
		) => void;
		forceMovementDirectionRamp: (
			afXAngle: number,
			afYAngle: number,
			afZAngle: number,
			afRampTime: number
		) => void;
		forceMovementRotationSpeed: (
			afXMult: number,
			afYMult: number,
			afZMult: number
		) => void;
		forceMovementRotationSpeedRamp: (
			afXMult: number,
			afYMult: number,
			afZMult: number,
			afRampTime: number
		) => void;
		forceMovementSpeed: (afSpeedMult: number) => void;
		forceMovementSpeedRamp: (afSpeedMult: number, afRampTime: number) => void;
		forceTargetAngle: (
			afXAngle: number,
			afYAngle: number,
			afZAngle: number
		) => void;
		forceTargetDirection: (
			afXAngle: number,
			afYAngle: number,
			afZAngle: number
		) => void;
		forceTargetSpeed: (afSpeed: number) => void;
		getActorValue: (asValueName: string) => number;
		getActorValueMax: (asValueName: string) => number;
		getActorValuePercentage: (asValueName: string) => number;
		getBaseActorValue: (asValueName: string) => number;
		getBribeAmount: () => number;
		getCombatState: () => number;
		getCombatTarget: () => skyrimPlatform.Actor;
		getCrimeFaction: () => skyrimPlatform.Faction;
		getCurrentPackage: () => skyrimPlatform.Package;
		getDialogueTarget: () => skyrimPlatform.Actor;
		getEquippedArmorInSlot: (aiSlot: number) => skyrimPlatform.Armor;
		getEquippedItemId: (Location: number) => number;
		getEquippedItemType: (aiHand: number) => number;
		getEquippedObject: (Location: number) => skyrimPlatform.Form;
		getEquippedShield: () => skyrimPlatform.Armor;
		getEquippedShout: () => skyrimPlatform.Shout;
		getEquippedSpell: (aiSource: number) => skyrimPlatform.Spell;
		getEquippedWeapon: (abLeftHand: boolean) => skyrimPlatform.Weapon;
		getFactionRank: (akFaction: skyrimPlatform.Faction) => number;
		getFactionReaction: (akOther: skyrimPlatform.Actor) => number;
		getFactions: (minRank: number, maxRank: number) => object[];
		getFlyingState: () => number;
		getForcedLandingMarker: () => skyrimPlatform.ObjectReference;
		getFurnitureReference: () => skyrimPlatform.ObjectReference;
		getGoldAmount: () => number;
		getHighestRelationshipRank: () => number;
		getKiller: () => skyrimPlatform.Actor;
		getLevel: () => number;
		getLeveledActorBase: () => skyrimPlatform.ActorBase;
		getLightLevel: () => number;
		getLowestRelationshipRank: () => number;
		getNoBleedoutRecovery: () => boolean;
		getNthSpell: (n: number) => skyrimPlatform.Spell;
		getPlayerControls: () => boolean;
		getRace: () => skyrimPlatform.Race;
		getRelationshipRank: (akOther: skyrimPlatform.Actor) => number;
		getSitState: () => number;
		getSleepState: () => number;
		getSpellCount: () => number;
		getVoiceRecoveryTime: () => number;
		getWarmthRating: () => number;
		getWornForm: (slotMask: number) => skyrimPlatform.Form;
		getWornItemId: (slotMask: number) => number;
		hasAssociation: (
			akAssociation: skyrimPlatform.AssociationType,
			akOther: skyrimPlatform.Actor
		) => boolean;
		hasFamilyRelationship: (akOther: skyrimPlatform.Actor) => boolean;
		hasLOS: (akOther: skyrimPlatform.ObjectReference) => boolean;
		hasMagicEffect: (akEffect: skyrimPlatform.MagicEffect) => boolean;
		hasMagicEffectWithKeyword: (akKeyword: skyrimPlatform.Keyword) => boolean;
		hasParentRelationship: (akOther: skyrimPlatform.Actor) => boolean;
		hasPerk: (akPerk: skyrimPlatform.Perk) => boolean;
		hasSpell: (akForm: skyrimPlatform.Form) => boolean;
		isAIEnabled: () => boolean;
		isAlarmed: () => boolean;
		isAlerted: () => boolean;
		isAllowedToFly: () => boolean;
		isArrested: () => boolean;
		isArrestingTarget: () => boolean;
		isBeingRidden: () => boolean;
		isBleedingOut: () => boolean;
		isBribed: () => boolean;
		isChild: () => boolean;
		isCommandedActor: () => boolean;
		isDead: () => boolean;
		isDetectedBy: (akOther: skyrimPlatform.Actor) => boolean;
		isDoingFavor: () => boolean;
		isEquipped: (akItem: skyrimPlatform.Form) => boolean;
		isEssential: () => boolean;
		isFlying: () => boolean;
		isGhost: () => boolean;
		isGuard: () => boolean;
		isHostileToActor: (akActor: skyrimPlatform.Actor) => boolean;
		isInCombat: () => boolean;
		isInFaction: (akFaction: skyrimPlatform.Faction) => boolean;
		isInKillMove: () => boolean;
		isIntimidated: () => boolean;
		isOnMount: () => boolean;
		isOverEncumbered: () => boolean;
		isPlayerTeammate: () => boolean;
		isPlayersLastRiddenHorse: () => boolean;
		isRunning: () => boolean;
		isSneaking: () => boolean;
		isSprinting: () => boolean;
		isSwimming: () => boolean;
		isTrespassing: () => boolean;
		isUnconscious: () => boolean;
		isWeaponDrawn: () => boolean;
		keepOffsetFromActor: (
			arTarget: skyrimPlatform.Actor,
			afOffsetX: number,
			afOffsetY: number,
			afOffsetZ: number,
			afOffsetAngleX: number,
			afOffsetAngleY: number,
			afOffsetAngleZ: number,
			afCatchUpRadius: number,
			afFollowRadius: number
		) => void;
		kill: (akKiller: skyrimPlatform.Actor) => void;
		killSilent: (akKiller: skyrimPlatform.Actor) => void;
		modActorValue: (asValueName: string, afAmount: number) => void;
		modFactionRank: (akFaction: skyrimPlatform.Faction, aiMod: number) => void;
		moveToPackageLocation: () => Promise<void>;
		openInventory: (abForceOpen: boolean) => void;
		pathToReference: (
			aTarget: skyrimPlatform.ObjectReference,
			afWalkRunPercent: number
		) => Promise<boolean>;
		playIdle: (akIdle: skyrimPlatform.Idle) => boolean;
		playIdleWithTarget: (
			akIdle: skyrimPlatform.Idle,
			akTarget: skyrimPlatform.ObjectReference
		) => boolean;
		playSubGraphAnimation: (asEventName: string) => void;
		queueNiNodeUpdate: () => void;
		regenerateHead: () => void;
		removeFromAllFactions: () => void;
		removeFromFaction: (akFaction: skyrimPlatform.Faction) => void;
		removePerk: (akPerk: skyrimPlatform.Perk) => void;
		removeShout: (akShout: skyrimPlatform.Shout) => boolean;
		removeSpell: (akSpell: skyrimPlatform.Spell) => boolean;
		replaceHeadPart: (
			oPart: skyrimPlatform.HeadPart,
			newPart: skyrimPlatform.HeadPart
		) => void;
		resetAI: () => void;
		resetExpressionOverrides: () => void;
		resetHealthAndLimbs: () => void;
		restoreActorValue: (asValueName: string, afAmount: number) => void;
		resurrect: () => Promise<void>;
		sendAssaultAlarm: () => void;
		sendLycanthropyStateChanged: (abIsWerewolf: boolean) => void;
		sendTrespassAlarm: (akCriminal: skyrimPlatform.Actor) => void;
		sendVampirismStateChanged: (abIsVampire: boolean) => void;
		setActorValue: (asValueName: string, afValue: number) => void;
		setAlert: (abAlerted: boolean) => void;
		setAllowFlying: (abAllowed: boolean) => void;
		setAllowFlyingEx: (
			abAllowed: boolean,
			abAllowCrash: boolean,
			abAllowSearch: boolean
		) => void;
		setAlpha: (afTargetAlpha: number, abFade: boolean) => void;
		setAttackActorOnSight: (abAttackOnSight: boolean) => void;
		setBribed: (abBribe: boolean) => void;
		setCrimeFaction: (akFaction: skyrimPlatform.Faction) => void;
		setCriticalStage: (aiStage: number) => void;
		setDoingFavor: (abDoingFavor: boolean) => void;
		setDontMove: (abDontMove: boolean) => void;
		setExpressionModifier: (index: number, value: number) => void;
		setExpressionOverride: (aiMood: number, aiStrength: number) => void;
		setExpressionPhoneme: (index: number, value: number) => void;
		setEyeTexture: (akNewTexture: skyrimPlatform.TextureSet) => void;
		setFactionRank: (akFaction: skyrimPlatform.Faction, aiRank: number) => void;
		setForcedLandingMarker: (aMarker: skyrimPlatform.ObjectReference) => void;
		setGhost: (abIsGhost: boolean) => void;
		setHeadTracking: (abEnable: boolean) => void;
		setIntimidated: (abIntimidate: boolean) => void;
		setLookAt: (
			akTarget: skyrimPlatform.ObjectReference,
			abPathingLookAt: boolean
		) => void;
		setNoBleedoutRecovery: (abAllowed: boolean) => void;
		setNotShowOnStealthMeter: (abNotShow: boolean) => void;
		setOutfit: (
			akOutfit: skyrimPlatform.Outfit,
			abSleepOutfit: boolean
		) => void;
		setPlayerControls: (abControls: boolean) => void;
		setPlayerResistingArrest: () => void;
		setPlayerTeammate: (abTeammate: boolean, abCanDoFavor: boolean) => void;
		setRace: (akRace: skyrimPlatform.Race) => void;
		setRelationshipRank: (
			akOther: skyrimPlatform.Actor,
			aiRank: number
		) => void;
		setRestrained: (abRestrained: boolean) => void;
		setSubGraphFloatVariable: (asVariableName: string, afValue: number) => void;
		setUnconscious: (abUnconscious: boolean) => void;
		setVehicle: (akVehicle: skyrimPlatform.ObjectReference) => void;
		setVoiceRecoveryTime: (afTime: number) => void;
		sheatheWeapon: () => void;
		showBarterMenu: () => void;
		showGiftMenu: (
			abGivingGift: boolean,
			apFilterList: skyrimPlatform.FormList,
			abShowStolenItems: boolean,
			abUseFavorPoints: boolean
		) => Promise<number>;
		startCannibal: (akTarget: skyrimPlatform.Actor) => void;
		startCombat: (akTarget: skyrimPlatform.Actor) => void;
		startDeferredKill: () => void;
		startSneaking: () => void;
		startVampireFeed: (akTarget: skyrimPlatform.Actor) => void;
		stopCombat: () => void;
		stopCombatAlarm: () => void;
		trapSoul: (akTarget: skyrimPlatform.Actor) => boolean;
		unLockOwnedDoorsInCell: () => void;
		unequipAll: () => void;
		unequipItem: (
			akItem: skyrimPlatform.Form,
			abPreventEquip: boolean,
			abSilent: boolean
		) => void;
		unequipItemEx: (
			item: skyrimPlatform.Form,
			equipSlot: number,
			preventEquip: boolean
		) => void;
		unequipItemSlot: (aiSlot: number) => void;
		unequipShout: (akShout: skyrimPlatform.Shout) => void;
		unequipSpell: (akSpell: skyrimPlatform.Spell, aiSource: number) => void;
		updateWeight: (neckDelta: number) => void;
		willIntimidateSucceed: () => boolean;
		wornHasKeyword: (akKeyword: skyrimPlatform.Keyword) => boolean;
	};
	ActorBase: skyrimPlatform.ActorBase;
	ActorValueInfo: skyrimPlatform.ActorValueInfo;
	Alias: skyrimPlatform.Alias;
	Ammo: skyrimPlatform.Ammo;
	MiscObject: skyrimPlatform.MiscObject;
	Apparatus: skyrimPlatform.Apparatus;
	Armor: skyrimPlatform.Armor;
	ArmorAddon: skyrimPlatform.ArmorAddon;
	Art: skyrimPlatform.Art;
	AssociationType: skyrimPlatform.AssociationType;
	Book: skyrimPlatform.Book;
	Cell: skyrimPlatform.Cell;
	Class: skyrimPlatform.Class;
	ColorForm: skyrimPlatform.ColorForm;
	CombatStyle: skyrimPlatform.CombatStyle;
	ConstructibleObject: skyrimPlatform.ConstructibleObject;
	Container: skyrimPlatform.Container;
	Debug: skyrimPlatform.Debug;
	DefaultObjectManager: skyrimPlatform.DefaultObjectManager;
	Door: skyrimPlatform.Door;
	EffectShader: skyrimPlatform.EffectShader;
	Enchantment: skyrimPlatform.Enchantment;
	EncounterZone: skyrimPlatform.EncounterZone;
	EquipSlot: skyrimPlatform.EquipSlot;
	Explosion: skyrimPlatform.Explosion;
	Faction: skyrimPlatform.Faction;
	Flora: skyrimPlatform.Flora;
	FormList: skyrimPlatform.FormList;
	Furniture: skyrimPlatform.Furniture;
	Game: Game;
	GlobalVariable: skyrimPlatform.GlobalVariable;
	Hazard: skyrimPlatform.Hazard;
	HeadPart: skyrimPlatform.HeadPart;
	Idle: skyrimPlatform.Idle;
	ImageSpaceModifier: skyrimPlatform.ImageSpaceModifier;
	ImpactDataSet: skyrimPlatform.ImpactDataSet;
	Ingredient: skyrimPlatform.Ingredient;
	Input: skyrimPlatform.Input;
	Key: skyrimPlatform.Key;
	Keyword: skyrimPlatform.Keyword;
	LeveledActor: skyrimPlatform.LeveledActor;
	LeveledItem: skyrimPlatform.LeveledItem;
	LeveledSpell: skyrimPlatform.LeveledSpell;
	Light: skyrimPlatform.Light;
	Location: skyrimPlatform.Location;
	LocationAlias: skyrimPlatform.LocationAlias;
	LocationRefType: skyrimPlatform.LocationRefType;
	MagicEffect: skyrimPlatform.MagicEffect;
	Message: skyrimPlatform.Message;
	MusicType: skyrimPlatform.MusicType;
	NetImmerse: skyrimPlatform.NetImmerse;
	Outfit: skyrimPlatform.Outfit;
	Projectile: skyrimPlatform.Projectile;
	Package: skyrimPlatform.Package;
	Perk: skyrimPlatform.Perk;
	Potion: skyrimPlatform.Potion;
	Quest: skyrimPlatform.Quest;
	Race: skyrimPlatform.Race;
	ReferenceAlias: skyrimPlatform.ReferenceAlias;
	Spell: {
		from: (form: skyrimPlatform.Form) => skyrimPlatform.Spell;
		cast: (
			akSource: skyrimPlatform.ObjectReference,
			akTarget: skyrimPlatform.ObjectReference
		) => Promise<void>;
		getCastTime: () => number;
		getCostliestEffectIndex: () => number;
		getEffectAreas: () => number[];
		getEffectDurations: () => number[];
		getEffectMagnitudes: () => number[];
		getEffectiveMagickaCost: (caster: skyrimPlatform.Actor) => number;
		getEquipType: () => skyrimPlatform.EquipSlot;
		getMagicEffects: () => object[];
		getMagickaCost: () => number;
		getNthEffectArea: (index: number) => number;
		getNthEffectDuration: (index: number) => number;
		getNthEffectMagicEffect: (index: number) => skyrimPlatform.MagicEffect;
		getNthEffectMagnitude: (index: number) => number;
		getNumEffects: () => number;
		getPerk: () => skyrimPlatform.Perk;
		isHostile: () => boolean;
		preload: () => void;
		remoteCast: (
			akSource: skyrimPlatform.ObjectReference,
			akBlameActor: skyrimPlatform.Actor,
			akTarget: skyrimPlatform.ObjectReference
		) => Promise<void>;
		setEquipType: (type: skyrimPlatform.EquipSlot) => void;
		setNthEffectArea: (index: number, value: number) => void;
		setNthEffectDuration: (index: number, value: number) => void;
		setNthEffectMagnitude: (index: number, value: number) => void;
		unload: () => void;
	};
	Static: skyrimPlatform.Static;
	Scene: skyrimPlatform.Scene;
	Scroll: skyrimPlatform.Scroll;
	ShaderParticleGeometry: skyrimPlatform.ShaderParticleGeometry;
	Shout: skyrimPlatform.Shout;
	SoulGem: skyrimPlatform.SoulGem;
	Sound: skyrimPlatform.Sound;
	SoundCategory: skyrimPlatform.SoundCategory;
	SoundDescriptor: skyrimPlatform.SoundDescriptor;
	TESModPlatform: skyrimPlatform.TESModPlatform;
	TalkingActivator: skyrimPlatform.TalkingActivator;
	TextureSet: skyrimPlatform.TextureSet;
	Topic: skyrimPlatform.Topic;
	TopicInfo: skyrimPlatform.TopicInfo;
	TreeObject: skyrimPlatform.TreeObject;
	Ui: skyrimPlatform.Ui;
	VisualEffect: skyrimPlatform.VisualEffect;
	VoiceType: skyrimPlatform.VoiceType;
	Weapon: skyrimPlatform.Weapon;
	Weather: skyrimPlatform.Weather;
	WordOfPower: skyrimPlatform.WordOfPower;
	WorldSpace: skyrimPlatform.WorldSpace;
	Utility: {
		from: (form: skyrimPlatform.Form) => skyrimPlatform.Utility;
		captureFrameRate: (numFrames: number) => string;
		createAliasArray: (size: number, fill: skyrimPlatform.Alias) => object[];
		createBoolArray: (size: number, fill: boolean) => boolean[];
		createFloatArray: (size: number, fill: number) => number[];
		createFormArray: (size: number, fill: skyrimPlatform.Form) => object[];
		createIntArray: (size: number, fill: number) => number[];
		createStringArray: (size: number, fill: string) => string[];
		endFrameRateCapture: () => void;
		gameTimeToString: (afGameTime: number) => Promise<string>;
		getAverageFrameRate: () => number;
		getBudgetCount: () => number;
		getBudgetName: (aiBudgetNumber: number) => string;
		getCurrentBudget: (aiBudgetNumber: number) => number;
		getCurrentGameTime: () => number;
		getCurrentMemory: () => number;
		getCurrentRealTime: () => number;
		getINIBool: (ini: string) => boolean;
		getINIFloat: (ini: string) => number;
		getINIInt: (ini: string) => number;
		getINIString: (ini: string) => string;
		getMaxFrameRate: () => number;
		getMinFrameRate: () => number;
		isInMenuMode: () => boolean;
		overBudget: (aiBudgetNumber: number) => boolean;
		randomFloat: (afMin: number, afMax: number) => number;
		randomInt: (aiMin: number, aiMax: number) => number;
		resizeAliasArray: (
			source: object[],
			size: number,
			fill: skyrimPlatform.Alias
		) => object[];
		resizeBoolArray: (
			source: boolean[],
			size: number,
			fill: boolean
		) => boolean[];
		resizeFloatArray: (
			source: number[],
			size: number,
			fill: number
		) => number[];
		resizeFormArray: (
			source: object[],
			size: number,
			fill: skyrimPlatform.Form
		) => object[];
		resizeIntArray: (source: number[], size: number, fill: number) => number[];
		resizeStringArray: (
			source: string[],
			size: number,
			fill: string
		) => string[];
		setINIBool: (ini: string, value: boolean) => void;
		setINIFloat: (ini: string, value: number) => void;
		setINIInt: (ini: string, value: number) => void;
		setINIString: (ini: string, value: string) => void;
		startFrameRateCapture: () => void;
		wait: (afSeconds: number) => Promise<void>;
		waitGameTime: (afHours: number) => Promise<void>;
		waitMenuMode: (afSeconds: number) => Promise<void>;
	};
}

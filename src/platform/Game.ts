import * as skyrimPlatform from './skyrimPlatform';

import { Actor } from './Actor';
import { Form } from './Form';
import { ObjectReference } from './ObjectReference';

export interface Game {
	from: (form: Form) => Game;
	addAchievement: (aiAchievementID: number) => void;
	addHavokBallAndSocketConstraint: (
		arRefA: ObjectReference,
		arRefANode: string,
		arRefB: ObjectReference,
		arRefBNode: string,
		afRefALocalOffsetX: number,
		afRefALocalOffsetY: number,
		afRefALocalOffsetZ: number,
		afRefBLocalOffsetX: number,
		afRefBLocalOffsetY: number,
		afRefBLocalOffsetZ: number
	) => Promise<boolean>;
	addPerkPoints: (aiPerkPoints: number) => void;
	advanceSkill: (asSkillName: string, afMagnitude: number) => void;
	calculateFavorCost: (aiFavorPrice: number) => number;
	clearPrison: () => void;
	clearTempEffects: () => void;
	disablePlayerControls: (
		abMovement: boolean,
		abFighting: boolean,
		abCamSwitch: boolean,
		abLooking: boolean,
		abSneaking: boolean,
		abMenu: boolean,
		abActivate: boolean,
		abJournalTabs: boolean,
		aiDisablePOVType: number
	) => void;
	enableFastTravel: (abEnable: boolean) => void;
	enablePlayerControls: (
		abMovement: boolean,
		abFighting: boolean,
		abCamSwitch: boolean,
		abLooking: boolean,
		abSneaking: boolean,
		abMenu: boolean,
		abActivate: boolean,
		abJournalTabs: boolean,
		aiDisablePOVType: number
	) => void;
	fadeOutGame: (abFadingOut: boolean, abBlackFade: boolean, afSecsBeforeFade: number, afFadeDuration: number) => void;
	fastTravel: (akDestination: ObjectReference) => void;
	findClosestActor: (afX: number, afY: number, afZ: number, afRadius: number) => Actor;
	findClosestReferenceOfAnyTypeInList: (
		arBaseObjects: skyrimPlatform.FormList,
		afX: number,
		afY: number,
		afZ: number,
		afRadius: number
	) => ObjectReference;
	findClosestReferenceOfType: (
		arBaseObject: Form,
		afX: number,
		afY: number,
		afZ: number,
		afRadius: number
	) => ObjectReference;
	findRandomActor: (afX: number, afY: number, afZ: number, afRadius: number) => Actor;
	findRandomReferenceOfAnyTypeInList: (
		arBaseObjects: skyrimPlatform.FormList,
		afX: number,
		afY: number,
		afZ: number,
		afRadius: number
	) => ObjectReference;
	findRandomReferenceOfType: (
		arBaseObject: Form,
		afX: number,
		afY: number,
		afZ: number,
		afRadius: number
	) => ObjectReference;
	forceFirstPerson: () => void;
	forceThirdPerson: () => void;
	getCameraState: () => number;
	getCurrentConsoleRef: () => ObjectReference;
	getCurrentCrosshairRef: () => ObjectReference;
	getDialogueTarget: () => ObjectReference;
	getExperienceForLevel: (currentLevel: number) => number;
	getForm: (aiFormID: number) => Form;
	getFormEx: (formId: number) => Form;
	getFormFromFile: (aiFormID: number, asFilename: string) => Form;
	getGameSettingFloat: (asGameSetting: string) => number;
	getGameSettingInt: (asGameSetting: string) => number;
	getGameSettingString: (asGameSetting: string) => Promise<string>;
	getHotkeyBoundObject: (hotkey: number) => Form;
	getLightModAuthor: (idx: number) => string;
	getLightModByName: (name: string) => number;
	getLightModCount: () => number;
	getLightModDependencyCount: (idx: number) => number;
	getLightModDescription: (idx: number) => string;
	getLightModName: (idx: number) => string;
	getModAuthor: (modIndex: number) => string;
	getModByName: (name: string) => number;
	getModCount: () => number;
	getModDependencyCount: (modIndex: number) => number;
	getModDescription: (modIndex: number) => string;
	getModName: (modIndex: number) => string;
	getNthLightModDependency: (modIdx: number, idx: number) => number;
	getNthTintMaskColor: (n: number) => number;
	getNthTintMaskTexturePath: (n: number) => string;
	getNthTintMaskType: (n: number) => number;
	getNumTintMasks: () => number;
	getNumTintsByType: (type: number) => number;
	getPerkPoints: () => number;
	getPlayerExperience: () => number;
	getPlayerGrabbedRef: () => ObjectReference;
	getPlayerMovementMode: () => boolean;
	getPlayersLastRiddenHorse: () => Actor;
	getRealHoursPassed: () => number;
	getSunPositionX: () => number;
	getSunPositionY: () => number;
	getSunPositionZ: () => number;
	getTintMaskColor: (type: number, index: number) => number;
	getTintMaskTexturePath: (type: number, index: number) => string;
	hideTitleSequenceMenu: () => void;
	incrementSkill: (asSkillName: string) => void;
	incrementSkillBy: (asSkillName: string, aiCount: number) => void;
	incrementStat: (asStatName: string, aiModAmount: number) => void;
	isActivateControlsEnabled: () => boolean;
	isCamSwitchControlsEnabled: () => boolean;
	isFastTravelControlsEnabled: () => boolean;
	isFastTravelEnabled: () => boolean;
	isFightingControlsEnabled: () => boolean;
	isJournalControlsEnabled: () => boolean;
	isLookingControlsEnabled: () => boolean;
	isMenuControlsEnabled: () => boolean;
	isMovementControlsEnabled: () => boolean;
	isObjectFavorited: (Form: Form) => boolean;
	isPlayerSungazing: () => boolean;
	isPluginInstalled: (name: string) => boolean;
	isSneakingControlsEnabled: () => boolean;
	isWordUnlocked: (akWord: skyrimPlatform.WordOfPower) => boolean;
	loadGame: (name: string) => void;
	modPerkPoints: (perkPoints: number) => void;
	playBink: (
		asFilename: string,
		abInterruptible: boolean,
		abMuteAudio: boolean,
		abMuteMusic: boolean,
		abLetterbox: boolean
	) => void;
	precacheCharGen: () => void;
	precacheCharGenClear: () => void;
	queryStat: (asStat: string) => number;
	quitToMainMenu: () => void;
	removeHavokConstraints: (
		arFirstRef: ObjectReference,
		arFirstRefNodeName: string,
		arSecondRef: ObjectReference,
		arSecondRefNodeName: string
	) => Promise<boolean>;
	requestAutosave: () => void;
	requestModel: (asModelName: string) => void;
	requestSave: () => void;
	saveGame: (name: string) => void;
	sendWereWolfTransformation: () => void;
	serveTime: () => void;
	setAllowFlyingMountLandingRequests: (abAllow: boolean) => void;
	setBeastForm: (abEntering: boolean) => void;
	setCameraTarget: (arTarget: Actor) => void;
	setGameSettingBool: (setting: string, value: boolean) => void;
	setGameSettingFloat: (setting: string, value: number) => void;
	setGameSettingInt: (setting: string, value: number) => void;
	setGameSettingString: (setting: string, value: string) => void;
	setHudCartMode: (abSetCartMode: boolean) => void;
	setInChargen: (abDisableSaving: boolean, abDisableWaiting: boolean, abShowControlsDisabledMessage: boolean) => void;
	setMiscStat: (name: string, value: number) => void;
	setNthTintMaskColor: (n: number, color: number) => void;
	setNthTintMaskTexturePath: (path: string, n: number) => void;
	setPerkPoints: (perkPoints: number) => void;
	setPlayerAIDriven: (abAIDriven: boolean) => void;
	setPlayerExperience: (exp: number) => void;
	setPlayerLevel: (level: number) => void;
	setPlayerReportCrime: (abReportCrime: boolean) => void;
	setPlayersLastRiddenHorse: (horse: Actor) => void;
	setSittingRotation: (afValue: number) => void;
	setSunGazeImageSpaceModifier: (apImod: skyrimPlatform.ImageSpaceModifier) => void;
	setTintMaskColor: (color: number, type: number, index: number) => void;
	setTintMaskTexturePath: (path: string, type: number, index: number) => void;
	showFirstPersonGeometry: (abShow: boolean) => void;
	showLimitedRaceMenu: () => void;
	showRaceMenu: () => void;
	showTitleSequenceMenu: () => void;
	showTrainingMenu: (aTrainer: Actor) => void;
	startTitleSequence: (asSequenceName: string) => void;
	teachWord: (akWord: skyrimPlatform.WordOfPower) => void;
	triggerScreenBlood: (aiValue: number) => void;
	unbindObjectHotkey: (hotkey: number) => void;
	unlockWord: (akWord: skyrimPlatform.WordOfPower) => void;
	updateHairColor: () => void;
	updateThirdPerson: () => void;
	updateTintMaskColors: () => void;
	usingGamepad: () => boolean;
	getPlayer: () => Actor;
	shakeCamera: (akSource: ObjectReference, afStrength: number, afDuration: number) => void;
	shakeController: (afSmallMotorStrength: number, afBigMotorStreangth: number, afDuration: number) => void;
}

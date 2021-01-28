import { Actor } from './Actor';
import { Debug } from './Debug';
import { Game } from './Game';
import { Input } from './Input';
import { Spell } from './Spell';
import { Utility } from './Utility';
import { Sound } from './Sound';
import { ObjectReference } from './ObjectReference';
import { Form } from './Form';
import { Message } from './Message';
import { Quest } from './Quest';
import { Projectile } from './Projectile';
import { SkyrimEvent, SkyrimEventName } from './Event';
import { Cell } from './Cell';
import { MagicEffect } from './MagicEffect';
import { Location } from './Location';
import { Keyword } from './Keyword';
import { Browser, ChangeFormNpc, InventoryChangesEntry, InventoryEntry } from './Interfaces';
import { PacketType } from './Types';
import {
	ConsoleComand,
	Hooks,
	HttpResponse,
	HttpClient,
	Action,
	Activator,
	ActiveMagicEffect,
	ActorBase,
	ActorValueInfo,
	Alias,
	Ammo,
	MiscObject,
	Apparatus,
	Armor,
	ArmorAddon,
	Art,
	AssociationType,
	Book,
	Class,
	ColorForm,
	CombatStyle,
	ConstructibleObject,
	Container,
	DefaultObjectManager,
	Door,
	EffectShader,
	Enchantment,
	EncounterZone,
	EquipSlot,
	Explosion,
	Faction,
	Flora,
	FormList,
	Furniture,
	GlobalVariable,
	Hazard,
	HeadPart,
	Idle,
	ImageSpaceModifier,
	ImpactDataSet,
	Ingredient,
	LeveledActor,
	LeveledItem,
	LeveledSpell,
	Light,
	LocationRefType,
	MusicType,
	NetImmerse,
	Outfit,
	Package,
	Perk,
	Potion,
	Race,
	ReferenceAlias,
	Static,
	Scene,
	Scroll,
	ShaderParticleGeometry,
	Shout,
	SoulGem,
	SoundCategory,
	SoundDescriptor,
	TESModPlatform,
	TalkingActivator,
	TextureSet,
	Topic,
	TopicInfo,
	TreeObject,
	Ui,
	VisualEffect,
	VoiceType,
	Weapon,
	Weather,
	WordOfPower,
	WorldSpace,
	Key,
} from './Classes';
import { LocationAlias } from './LocationAlias';

export interface SkyrimPlatform {
	printConsole: (...args: any[]) => void;
	writeScript: (scriptName: string, src: string) => void;
	callNative: (className: string, functionName: string, self?: object, ...args: any) => any;
	getJsMemoryUsage: () => number;
	getPluginSourceCode: (pluginName: string) => string;
	writePlugin: (pluginName: string, newSources: string) => string;
	getPlatformVersion: () => string;
	findConsoleCommand: (cmdName: string) => ConsoleComand;
	storage: any;
	settings: any;
	loadGame: (pos: number[], angle: number[], worldOrCell: number, changeFormNpc?: ChangeFormNpc) => void;
	worldPointToScreenPoint: (...args: number[][]) => number[][];
	PacketType: PacketType;
	Browser: Browser;
	getExtraContainerChanges: (objectReferenceId: number) => InventoryChangesEntry[];
	getContainer: (baseId: number) => InventoryEntry[];

	on: (eventName: SkyrimEventName, callback: (event?: SkyrimEvent) => void) => void;
	once: (eventName: SkyrimEventName, callback: (event?: SkyrimEvent) => void) => void;

	Hooks: Hooks;
	HttpResponse: HttpResponse;
	HttpClient: HttpClient;
	Form: Form;
	Action: Action;
	Activator: Activator;
	ActiveMagicEffect: ActiveMagicEffect;
	ObjectReference: ObjectReference;
	Actor: Actor;
	ActorBase: ActorBase;
	ActorValueInfo: ActorValueInfo;
	Alias: Alias;
	Ammo: Ammo;
	MiscObject: MiscObject;
	Apparatus: Apparatus;
	Armor: Armor;
	ArmorAddon: ArmorAddon;
	Art: Art;
	AssociationType: AssociationType;
	Book: Book;
	Cell: Cell;
	Class: Class;
	ColorForm: ColorForm;
	CombatStyle: CombatStyle;
	ConstructibleObject: ConstructibleObject;
	Container: Container;
	Debug: Debug;
	DefaultObjectManager: DefaultObjectManager;
	Door: Door;
	EffectShader: EffectShader;
	Enchantment: Enchantment;
	EncounterZone: EncounterZone;
	EquipSlot: EquipSlot;
	Explosion: Explosion;
	Faction: Faction;
	Flora: Flora;
	FormList: FormList;
	Furniture: Furniture;
	Game: Game;
	GlobalVariable: GlobalVariable;
	Hazard: Hazard;
	HeadPart: HeadPart;
	Idle: Idle;
	ImageSpaceModifier: ImageSpaceModifier;
	ImpactDataSet: ImpactDataSet;
	Ingredient: Ingredient;
	Input: Input;
	Key: Key;
	Keyword: Keyword;
	LeveledActor: LeveledActor;
	LeveledItem: LeveledItem;
	LeveledSpell: LeveledSpell;
	Light: Light;
	Location: Location;
	LocationAlias: LocationAlias;
	LocationRefType: LocationRefType;
	MagicEffect: MagicEffect;
	Message: Message;
	MusicType: MusicType;
	NetImmerse: NetImmerse;
	Outfit: Outfit;
	Projectile: Projectile;
	Package: Package;
	Perk: Perk;
	Potion: Potion;
	Quest: Quest;
	Race: Race;
	ReferenceAlias: ReferenceAlias;
	Spell: Spell;
	Static: Static;
	Scene: Scene;
	Scroll: Scroll;
	ShaderParticleGeometry: ShaderParticleGeometry;
	Shout: Shout;
	SoulGem: SoulGem;
	Sound: Sound;
	SoundCategory: SoundCategory;
	SoundDescriptor: SoundDescriptor;
	TESModPlatform: TESModPlatform;
	TalkingActivator: TalkingActivator;
	TextureSet: TextureSet;
	Topic: Topic;
	TopicInfo: TopicInfo;
	TreeObject: TreeObject;
	Ui: Ui;
	VisualEffect: VisualEffect;
	VoiceType: VoiceType;
	Weapon: Weapon;
	Weather: Weather;
	WordOfPower: WordOfPower;
	WorldSpace: WorldSpace;
	Utility: Utility;
}

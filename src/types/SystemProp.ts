export interface Inventar {
	filter(arg0: (item: { worn: any }) => any): any;
	entries: InventarItem[];
}

export interface InventarItem {
	baseId: number;
	count: number;
	worn?: boolean;
}

export interface Equipment {
	inv: Inventar;
	numChanges: number;
}

export interface Appearance {
	hairColor: number;
	headTextureSetId: number;
	headpartIds: number[];
	isFemale: boolean;
	name: string;
	options: number[];
	presets: number[];
	raceId: number;
	skinColor: number;
	tints: Tint[];
	weight: number;
}

export interface Tint {
	argb: number;
	texturePath: string;
	type: number;
}

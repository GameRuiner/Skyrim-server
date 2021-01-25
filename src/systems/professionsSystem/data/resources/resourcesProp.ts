export type ResourcesTypesProp = 'minerals' | 'woods';

export interface ResourceProp {
	type: ResourcesTypesProp;
	baseId: number;
	name: string;
	sourceName: string;
	price: number;
}

export type AllResourcesProp = {
	[name in ResourcesTypesProp]: ResourceProp[];
};

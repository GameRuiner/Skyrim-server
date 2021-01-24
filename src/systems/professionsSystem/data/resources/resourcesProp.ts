export type ResourcesTypesProp = 'minerals';

export interface ResourceProp {
	type: ResourcesTypesProp;
	baseId: number;
	name: string;
	sourceName: string;
}

export type AllResourcesProp = {
	[name in ResourcesTypesProp]: ResourceProp[];
};

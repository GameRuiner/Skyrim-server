export interface Inventar {
	baseId: number;
	count: number;
	added?: boolean;
}

export interface Equipment {
	inv: any;
	numCounts: number;
}

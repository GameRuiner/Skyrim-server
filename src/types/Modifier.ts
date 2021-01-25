export type Modifier = 'base' | 'permanent' | 'temporary' | 'damage';

export type ModifierValue = {
	[name in Modifier]: number;
};

import { ProfessionNamesProp, ProfessionTypesProp } from '../';

export type AnimationProp = {
	[name in ProfessionNamesProp]: {
		start: string[];
		end: string[];
	};
};

export type AllAnimationProp = {
	[name in ProfessionTypesProp]: AnimationProp;
};

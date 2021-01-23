import { Modifier } from '../types/Modifier';

export const typeCheck = {
	number: (name: string, value: number) => {
		if (typeof value !== typeof 0) {
			throw new TypeError(
				`Expected '${name}' to be a number, but got ${JSON.stringify(
					value
				)} (${typeof value})`
			);
		}
	},
	avModifier: (name: string, value: Modifier) => {
		const modifiers: Modifier[] = ['base', 'permanent', 'temporary', 'damage'];
		if (!modifiers.includes(value)) {
			throw new TypeError(
				`Expected '${name}' to be a modifier, but got ${JSON.stringify(
					value
				)} (${typeof value})`
			);
		}
	},
};

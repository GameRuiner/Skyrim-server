import { CTX, MP } from '../platform';
import { getFunctionText } from '../utils';

declare const mp: MP;
declare const ctx: CTX;

function setScale() {
	const defaultScale: number = 1;
	const value: number = ctx.value ?? defaultScale;
	if (value != ctx.state.value) {
		ctx.refr.setScale(value);
		ctx.state.value = value;
	}
}

export const init = () => {
	mp.makeProperty('scale', {
		isVisibleByOwner: true,
		isVisibleByNeighbors: true,
		updateOwner: getFunctionText(setScale),
		updateNeighbor: getFunctionText(setScale),
	});
};

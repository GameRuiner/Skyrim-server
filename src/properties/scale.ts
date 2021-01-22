import { CTX } from '../platform';
import { MP } from '../types';
import { getFunctionText } from '../utility';

declare const mp: MP;
declare const ctx: CTX;

function setScale() {
	if (ctx.value !== ctx.state.lastScale) {
		ctx.state.lastScale = +ctx.value;
		ctx.refr.setScale(+ctx.value);
	}
}

export const initScale = () => {
	mp.makeProperty('scale', {
		isVisibleByOwner: true,
		isVisibleByNeighbors: true,
		updateOwner: getFunctionText(setScale),
		updateNeighbor: getFunctionText(setScale),
	});
};

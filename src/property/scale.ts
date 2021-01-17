import { CTX, MP } from '../platform';
import { getFunctionText } from '../utils';

declare const mp: MP;
declare const ctx: CTX;

function setScale() {
	if (ctx.value !== ctx.state.lastScale) {
		ctx.state.lastScale = +ctx.value;
		ctx.refr.setScale(+ctx.value);
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

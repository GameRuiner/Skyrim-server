import { CTX } from '../platform';
import { MP } from '../types';
import { getFunctionText } from '../utility';

declare const mp: MP;
declare const ctx: CTX;

function setScale() {
	if (ctx.state.lastScale !== +ctx.value) {
		if (ctx.state.lastScale !== undefined) {
			ctx.sp.Game.getPlayer().setScale(+ctx.value);
		}
		ctx.state.lastScale = +ctx.value;
	}
}

export const initScale = () => {
	mp.makeProperty('scale', {
		isVisibleByOwner: true,
		isVisibleByNeighbors: true,
		updateOwner: getFunctionText(setScale, 'setScale'),
		updateNeighbor: getFunctionText(setScale, 'setScale'),
	});
};

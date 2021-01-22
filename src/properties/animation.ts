import { CTX } from '../platform';
import { MP } from '../types';
import { getFunctionText } from '../utility';

declare const mp: MP;
declare const ctx: CTX;

function setAnimation() {
	if (ctx.value !== ctx.state.animation) {
	}
}

export const initAnimation = () => {
	mp.makeProperty('animation', {
		isVisibleByOwner: true,
		isVisibleByNeighbors: true,
		updateOwner: getFunctionText(setAnimation),
		updateNeighbor: '',
	});
};

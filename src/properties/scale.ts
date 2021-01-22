<<<<<<< HEAD
import { CTX, MP } from '../platform';
=======
import { CTX } from '../platform';
import { MP } from '../types';
>>>>>>> bf2957091c86ee0b1c2b7d597e85778ccce4e7c9
import { getFunctionText } from '../utility';

declare const mp: MP;
declare const ctx: CTX;

function setScale() {
	if (ctx.value !== ctx.state.lastScale) {
		ctx.state.lastScale = +ctx.value;
		ctx.refr.setScale(+ctx.value);
	}
}

<<<<<<< HEAD
export const init = () => {
=======
export const initScale = () => {
>>>>>>> bf2957091c86ee0b1c2b7d597e85778ccce4e7c9
	mp.makeProperty('scale', {
		isVisibleByOwner: true,
		isVisibleByNeighbors: true,
		updateOwner: getFunctionText(setScale),
		updateNeighbor: getFunctionText(setScale),
	});
};

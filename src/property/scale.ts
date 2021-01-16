import { CTX, MP } from '../platform';
import { getFunctionText } from '../utils';

declare const mp: MP;
declare const ctx: CTX;

function setScale() {
	ctx.refr.setScale(typeof ctx.value === 'number' ? ctx.value : 1);
	//ctx.refr.getScale();
}

export const init = () => {
	mp.makeProperty('playerScale', {
		isVisibleByOwner: true,
		isVisibleByNeighbors: false,
		updateOwner: getFunctionText(setScale),
		updateNeighbor: '',
	});
};

import { CTX, MP } from '../platform';
import { getFunctionText } from '../utils';

declare const mp: MP;
declare const ctx: CTX;

function setRaceWeight() {
	if (!(typeof ctx.value === 'number')) return;
	ctx.refr.setWeight(ctx.value);
}

export const init = () => {
	mp.makeProperty('race', {
		isVisibleByOwner: false,
		isVisibleByNeighbors: false,
		updateOwner: '',
		updateNeighbor: '',
	});
	mp.makeProperty('raceWeight', {
		isVisibleByOwner: true,
		isVisibleByNeighbors: true,
		updateOwner: getFunctionText(setRaceWeight),
		updateNeighbor: getFunctionText(setRaceWeight),
	});
};

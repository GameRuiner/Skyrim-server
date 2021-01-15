import { MP } from '../platform/mp';

declare var mp: MP;

export const init = () => {
	mp.makeProperty('playerLevel', {
		isVisibleByOwner: true,
		isVisibleByNeighbors: false,
		updateOwner: 'ctx.sp.Game.setPlayerLevel(ctx.value)',
		updateNeighbor: '',
	});
};

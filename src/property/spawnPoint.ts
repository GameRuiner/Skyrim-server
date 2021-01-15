import { MP } from '../platform/mp';

declare var mp: MP;

export const init = () => {
	mp.makeProperty('spawnPoint', {
		isVisibleByOwner: false,
		isVisibleByNeighbors: false,
		updateNeighbor: '',
		updateOwner: '',
	});
};

import { MP } from '../types';

declare const mp: MP;

export const init = () => {
	mp.makeProperty('spawnPoint', {
		isVisibleByOwner: false,
		isVisibleByNeighbors: false,
		updateNeighbor: '',
		updateOwner: '',
	});
};

import { MP } from '../../types';

declare const mp: MP;

export const initInFarmProp = () => {
	/** true if actor in farm zone */
	mp.makeProperty('inFarm', {
		isVisibleByNeighbors: false,
		isVisibleByOwner: false,
		updateNeighbor: '',
		updateOwner: '',
	});
};

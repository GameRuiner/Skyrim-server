import { MP } from '../types';

declare const mp: MP;

export const initMessageIdToShow = () => {
	mp.makeProperty('messageIdToShow', {
		isVisibleByOwner: false,
		isVisibleByNeighbors: false,
		updateNeighbor: '',
		updateOwner: '',
	});
};

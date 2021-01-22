<<<<<<< HEAD
import { MP } from '../platform';

declare const mp: MP;

export const init = () => {
=======
import { defaultSpawnPoint } from '../constants';
import { spawnSystem } from '../systems';
import { MP } from '../types';
import { utils } from '../utility';

declare const mp: MP;

export const initSpawnPoint = () => {
>>>>>>> bf2957091c86ee0b1c2b7d597e85778ccce4e7c9
	mp.makeProperty('spawnPoint', {
		isVisibleByOwner: false,
		isVisibleByNeighbors: false,
		updateNeighbor: '',
		updateOwner: '',
	});
<<<<<<< HEAD
=======

	utils.hook('onDeath', (pcFormId: number) => {
		// don't spawn npc
		if (mp.get(pcFormId, 'baseDesc') === '7:Skyrim.esm') {
			setTimeout(() => {
				spawnSystem.spawn(pcFormId);
			}, spawnSystem.timeToRespawn);
		}
	});

	utils.hook('onReinit', (pcFormId: number, options: any) => {
		/** set respawn point */
		if (!mp.get(pcFormId, 'spawnPoint') || (options && options.force)) {
			mp.set(pcFormId, 'spawnPoint', defaultSpawnPoint);
		}
	});
>>>>>>> bf2957091c86ee0b1c2b7d597e85778ccce4e7c9
};

declare var mp: any;
import { utils } from './utils';
import { actorValues } from './sync/ActorValues';

const defaultSpawnPoint = {
	pos: [227, 239, 53],
	angle: [0, 0, 0],
	worldOrCellDesc: '165a7:Skyrim.esm',
};

export const spawnSystem = {
	timeToRespawn: 6000,
	spawn: (targetFormId: number) => {
		const spawnPoint = mp.get(targetFormId, 'spawnPoint');
		for (const propName of Object.keys(spawnPoint || defaultSpawnPoint)) {
			mp.set(
				targetFormId,
				propName,
				(spawnPoint || defaultSpawnPoint)[propName]
			);
		}
		actorValues.set(targetFormId, 'health', 'damage', 0);
		actorValues.set(targetFormId, 'magicka', 'damage', 0);
		actorValues.set(targetFormId, 'stamina', 'damage', 0);
		setTimeout(() => {
			mp.set(targetFormId, 'isDead', false);
		}, 500);
		utils.log(`${targetFormId.toString(16)} respawns`);
	},
	updateSpawnPoint: (targetFormId: number) => {
		mp.set(targetFormId, 'spawnPoint', {
			pos: mp.get(targetFormId, 'pos'),
			angle: mp.get(targetFormId, 'angle'),
			worldOrCellDesc: mp.get(targetFormId, 'worldOrCellDesc'),
		});
	},
};

export const init = () => {
	mp.makeProperty('spawnPoint', {
		isVisibleByOwner: false,
		isVisibleByNeighbors: false,
		updateNeighbor: '',
		updateOwner: '',
	});

	utils.hook('onDeath', (pcFormId: number) => {
		setTimeout(() => {
			spawnSystem.spawn(pcFormId);
		}, spawnSystem.timeToRespawn);
	});

	utils.hook('onReinit', (pcFormId: number, options: any) => {
		if (!mp.get(pcFormId, 'spawnPoint') || (options && options.force)) {
			mp.set(pcFormId, 'spawnPoint', defaultSpawnPoint);
		}
	});
};

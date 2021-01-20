import { utils } from './utility/utils';
import { initDevCommands, minesInit } from './systems';

import {
	consoleOutputPropInit,
	isDeadPropInit,
	spawnPointPropInit,
	playerLevelPropInit,
	playerRacePropInit,
	scalePropInit,
} from './properties';

import {
	_Init,
	initBashEvent,
	_onHitInit,
	_onPowerAttackInit,
	_onRegenFinishInit,
	_onSprintStateChangeInit,
	_onConsoleCommandInit,
	_onLocalDeathInit,
	_onCurrentCellChangeInit,
	_TestInit,
	initAnimationEvent,
} from './events';

import { actorValues, ActorValuesInit } from './properties';

import { MP } from './types/mp';

import { defaultSpawnPoint } from './constants/constants';
import { spawnSystem } from './systems/spawnSystem';

////////////////////////////////////////////////
declare const mp: MP;
declare const global: any;
////////////////////////////////////////////////

utils.log('Gamemode init');
if (!Array.isArray(global.knownEvents)) {
	global.knownEvents = [];
}
for (const eventName of global.knownEvents) {
	delete mp[eventName];
}
utils.hook('onInit', (pcFormId: number) => {
	mp.onReinit(pcFormId);
});
utils.hook('onReinit', (pcFormId: number, options: any) => {
	/** set default value to Actor */
	if (actorValues.setDefaults) {
		actorValues.setDefaults(pcFormId, options);
	}
	/** set respawn point */
	if (!mp.get(pcFormId, 'spawnPoint') || (options && options.force)) {
		mp.set(pcFormId, 'spawnPoint', defaultSpawnPoint);
	}
	/** set scale of Actor to default */
	mp.set(pcFormId, 'scale', 1);
});
utils.hook('onDeath', (pcFormId: number) => {
	setTimeout(() => {
		spawnSystem.spawn(pcFormId);
	}, spawnSystem.timeToRespawn);
});

/** property initialization */
isDeadPropInit();
consoleOutputPropInit();
spawnPointPropInit();
playerLevelPropInit();
playerRacePropInit();
scalePropInit();
/** */

/** event initialization */
_Init();
initBashEvent();
_onHitInit();
_onPowerAttackInit();
_onRegenFinishInit();
_onSprintStateChangeInit();
_onConsoleCommandInit();
_onLocalDeathInit();
_onCurrentCellChangeInit();
_TestInit();
initAnimationEvent();
/** */

/** sync initialization */
ActorValuesInit();
/** */

/** mechanics initialization */
initDevCommands();
minesInit();
/** */

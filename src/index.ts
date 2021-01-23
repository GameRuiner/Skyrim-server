import { MP } from './types';
import { initUtils, utils } from './utility';

import {
	initActiveProfession,
	initConsoleOutput,
	initScale,
	initSpawnPoint,
	initIsDead,
	initActorValue,
	initAnimation,
} from './properties';

import {
	initAnimationEvent,
	initActorValueFlushRequiredEvent,
	initBashEvent,
	initConsoleCommandEvent,
	initHitEvent,
	initPowerAttacksEvent,
	initSprintStateChangeEvent,
	initCurrentCellChangeEvent,
	initEmptyAnimationEvent,
	initHitStatic,
	initInputF5Event,
	initActivateEvent,
} from './events';

import { initDevCommands, initMinesSystem, initWoodsmanSystem, initFarmSystem } from './systems';

declare const mp: MP;

// init creates events, properties
// "utility/utils",
initUtils();
// "events/onHit",
initHitEvent();

// "properties/isDead",
initIsDead();

// "events/onSprintStateChange",
initSprintStateChangeEvent();

// "events/onPowerAttack",
initPowerAttacksEvent();

// "events/onBash",
initBashEvent();

// "properties/consoleOutput",
initConsoleOutput();

// "properties/actorValues",
initActorValue();

utils.hook('onReinit', (pcFormId: number, options: any) => {
	/** set scale of Actor to default */
	mp.set(pcFormId, 'scale', 1);
});

// "events/onActorValueFlushRequired",
initActorValueFlushRequiredEvent();

// "properties/spawnSystem",
initSpawnPoint();

// "events/onConsoleCommand",
initConsoleCommandEvent();

// "systems/developerCommands"
initDevCommands();

// "events/onAnimationEvent"
initAnimationEvent();

initAnimation();

initCurrentCellChangeEvent();
initScale();
initEmptyAnimationEvent();
initHitStatic();
initInputF5Event();
initActivateEvent();

// farm
initFarmSystem();
// profession
initActiveProfession();
initMinesSystem();
initWoodsmanSystem();

utils.hook('onInit', (pcFormId: number) => {
	mp.onReinit(pcFormId);
});

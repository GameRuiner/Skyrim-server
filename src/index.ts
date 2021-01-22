import { MP } from './types';
import { initUtils, utils } from './utility';

import {
	initActiveProfession,
	initActorValue,
	initConsoleOutput,
	initIsDead,
	initScale,
	initSpawnPoint,
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
} from './events';

import { initDevCommands, initMinesSystem } from './systems';

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

initCurrentCellChangeEvent();
initScale();
initEmptyAnimationEvent();
initHitStatic();
initInputF5Event();

// profession
// initMinesSystem();
// initActiveProfession();

utils.hook('onInit', (pcFormId: number) => {
	mp.onReinit(pcFormId);
});

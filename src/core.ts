import { initUtils } from './utility';

import {
	initConsoleOutput,
	initSpawnPoint,
	initIsDead,
	initActorValue,
	initAnimation,
	initActiveProfession,
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
	initInputEvent,
	initActivateEvent,
	initActivateMessageEvent,
	initSlowerUpdate,
} from './events';

import { initDevCommands, initFarmerSystem, initFarmSystem, initMinesSystem, initWoodsmanSystem } from './systems';
import { initSendMessage } from './properties/clientMessage';

export const initCore = () => {
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
	initEmptyAnimationEvent();
	initHitStatic();
	initInputEvent();
	initActivateEvent();
	initAnimation();

	initSendMessage();
	initSlowerUpdate();

	//message form
	initActivateMessageEvent();

	// farm
	initFarmSystem();
	// profession
	initActiveProfession();
	initMinesSystem();
	initWoodsmanSystem();
	initFarmerSystem();
};

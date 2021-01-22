<<<<<<< HEAD
import { utils } from "./utility/utils";
// import { devCommandsInit, minesInit, spawnSystemInit } from "./systems";
import { minesInit, spawnSystemInit, farmInit } from "./mechanics";

import {
  consoleOutputPropInit,
  isDeadPropInit,
  spawnPointPropInit,
  playerLevelPropInit,
  playerRacePropInit,
  scalePropInit,
  activeProfessionInit,
  clientMessageInit,
  teleportInit,
} from "./properties";

import {
  _Init,
  _onBashInit,
  _onHitInit,
  _onPowerAttackInit,
  _onRegenFinishInit,
  _onSprintStateChangeInit,
  _onConsoleCommandInit,
  _onLocalDeathInit,
  _onCurrentCellChangeInit,
  _onActivateInit,
  _onFarm,
} from "./events";

import { actorValues, ActorValuesInit } from "./properties";

import { MP } from "./platform/mp";
import { CTX } from "./platform";

import { defaultSpawnPoint } from "./constants/constants";
import { devCommandsInit } from "./systems";

declare const mp: MP;
declare var global: any;

utils.log("Gamemode init");
if (!Array.isArray(global.knownEvents)) {
  global.knownEvents = [];
}
for (const eventName of global.knownEvents) {
  delete mp[eventName];
}
utils.hook("onInit", (pcFormId: number) => {
  mp.onReinit(pcFormId);
});

/** property initialization */
isDeadPropInit();
consoleOutputPropInit();
spawnPointPropInit();
playerLevelPropInit();
playerRacePropInit();
scalePropInit();
activeProfessionInit();
clientMessageInit();
teleportInit();
/** */

/** event initialization */
_Init();
_onBashInit();
_onHitInit();
_onPowerAttackInit();
_onRegenFinishInit();
_onSprintStateChangeInit();
_onConsoleCommandInit();
_onLocalDeathInit();
_onCurrentCellChangeInit();
_onActivateInit();
_onFarm();
/** */

/** sync initialization */
ActorValuesInit();
/** */

/** mechanics initialization */
spawnSystemInit();
devCommandsInit();
minesInit();
farmInit();
/** */

/**
 * * Вопросы
 * ? Лично Леониду, можно ли избавится от вызовов init (сделать классы с конструктором)
 */

/**
 * * Работа с typescript
 * // TODO: Добавить strict mode и исправить все неверные и неявные типы
 * // TODO: Код в строках попробовать реализовать в виде функции и передавать текст этой функции
 */

/**
 * * Создать систему которая будет отнимать стамину у игрока за разные действия
 * TODO: За прыжок - 10 зс
 * TODO: За обычный бег - 0.5 зс в секунду
 * TODO: За обычную атаку - (вес оружия * 0.5)
 * TODO: За плаванье - 1 зс в секунду
 */

/**
 * TODO: Определить что локацию в которую зашел это шахта
 * TODO: Выдать игроку кирку и одежду шахтера и надеть ее
 * TODO: Перенести доработки Леонида в ts
 */

utils.hook("onReinit", (pcFormId: number, options: any) => {
  /** Проставляем значения по умолчанию персонажу */
  if (actorValues.setDefaults) {
    actorValues.setDefaults(pcFormId, options);
  }
  /** Проставляем точку для респавна */
  if (!mp.get(pcFormId, "spawnPoint") || (options && options.force)) {
    mp.set(pcFormId, "spawnPoint", defaultSpawnPoint);
  }
  /** Проставляем размер персонажа на стандартный */
  mp.set(pcFormId, "scale", 1);
  /** Проставляем наличие профессии */

  mp.set(pcFormId, "activeProfession", null);
  mp.set(pcFormId, "message", null);
});

/** TEST */
declare const ctx: CTX;

// import { init as scaleHitInit } from './test/scaleHit';
// scaleHitInit();

/**  */
=======
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
initMinesSystem();
initActiveProfession();

utils.hook('onInit', (pcFormId: number) => {
	mp.onReinit(pcFormId);
});
>>>>>>> bf2957091c86ee0b1c2b7d597e85778ccce4e7c9

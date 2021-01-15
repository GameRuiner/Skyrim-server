import { utils } from './utils/utils';
import { devCommandsInit, spawnSystemInit } from './mechanics';

import {
	consoleOutputPropInit,
	isDeadPropInit,
	spawnPointPropInit,
	playerLevelPropInit,
} from './property';

import {
	_Init,
	_onBashInit,
	_onHitInit,
	_onPowerAttackInit,
	_onRegenFinishInit,
	_onSprintStateChangeInit,
	_onConsoleCommandInit,
	_onLocalDeathInit,
} from './event';

import { ActorValuesInit } from './sync';

import { MP } from './platform/mp';

declare var mp: MP;
declare var global: any;

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

/** property initialization */
isDeadPropInit();
consoleOutputPropInit();
spawnPointPropInit();
playerLevelPropInit();
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
/** */

/** sync initialization */
ActorValuesInit();
/** */

/** mechanics initialization */
spawnSystemInit();
devCommandsInit();
/** */

/**
 * * Вопросы
 * ? Что за объекта mp, есть ли документация
 * ? Лично Леониду, можно ли избавится от вызовов init (сделать классы с конструктором)
 * ? Что такое ctx.sp и есть на это документация
 */

/**
 * * Работа с typescript
 * TODO: Добавить strict mode и исправить все неверные и неявные типы
 * TODO: Код в строках попробовать реализовать в виде функции и передавать текст этой функции
 */

/**
 * * Создать систему которая будет отнимать стамину у игрока за разные действия
 * TODO: За прыжок - 10 зс
 * TODO: За обычный бег - 0.5 зс в секунду
 * TODO: За обычную атаку - (вес оружия * 0.5)
 * TODO: За плаванье - 1 зс в секунду
 */

/**
 * * Доп функции:
 * TODO: Отключить ванильный расход зс при спринте
 * TODO: Откличить ванильный расход зс при силовой атаке
 */

/**
 ** Работа с объектами
 * TODO: Понять как работать с конкретными объектами в простарнстве
 */

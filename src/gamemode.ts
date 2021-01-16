import { getFunctionText, utils } from './utils/utils';
import { devCommandsInit, spawnSystemInit } from './mechanics';

import {
	consoleOutputPropInit,
	isDeadPropInit,
	spawnPointPropInit,
	playerLevelPropInit,
	playerRacePropInit,
	scalePropInit,
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
import { CTX, SkyrimEvent } from './platform';

import { HitEvent } from './platform/skyrimPlatform';

declare const mp: MP;
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
playerRacePropInit();
scalePropInit();
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
 * ? Лично Леониду, можно ли избавится от вызовов init (сделать классы с конструктором)
 */

/**
 * * Работа с typescript
 * // TODO: Добавить strict mode и исправить все неверные и неявные типы
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

utils.hook('onReinit', (pcFormId: number, options: any) => {
	mp.set(pcFormId, 'scale', 1);
	// mp.set(pcFormId, 'raceWeight', 1);
	// utils.log(pcFormId, mp.get(pcFormId, 'playerScale'));
	// utils.log(pcFormId, mp.get(pcFormId, 'raceWeight'));
	// utils.log(pcFormId, mp.get(pcFormId, 'race'));
});

declare const ctx: CTX;

function setHtml() {
	ctx.sp.once('loadGame', () => {
		const url: string = 'http://localhost:1234/chat.html';
		ctx.sp.printConsole('load url ' + url);
		ctx.sp.Browser.setVisible(true);
		ctx.sp.Browser.loadUrl(url);
		ctx.sendEvent(url);
	});
}

mp.makeEventSource('_onInit2', getFunctionText(setHtml));
utils.hook('_onInit2', (pcformId: number, url: string) => {
	utils.log('loadGame -> Browser -> loadUrl', pcformId, url);
});

function changeScaleOnHit() {
	ctx.sp.on('hit', (event) => {
		const e = event as HitEvent;
		if (!(ctx.sp.Actor as any).from(e.target)) return;
		if (e.source && (ctx.sp.Spell as any).from(e.source)) return;

		const target = ctx.getFormIdInServerFormat(e.target.getFormID());
		const agressor = ctx.getFormIdInServerFormat(e.agressor.getFormID());
		ctx.sendEvent({
			target: target,
			agressor: agressor,
		});
	});
}

mp.makeEventSource('_onHitScale', getFunctionText(changeScaleOnHit));
utils.hook('_onHitScale', (pcformId: number, eventData: any) => {
	const current = mp.get(eventData.target, 'scale');
	mp.set(eventData.target, 'scale', current >= 1.5 ? 1 : 1.5);
	utils.log('_onHitScale', pcformId, eventData, current);
});

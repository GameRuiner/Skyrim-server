declare var mp: any;
import { utils, init as utilsInit } from './utils';
import { init as onHitInit } from './event/onHit';
import { init as onRegenFinishInit } from './event/onRegenFinish';
import { init as isDeadInit } from './property/isDead';
import { init as isSprintingInit } from './property/isSprinting';
import { init as consoleOutputInit } from './property/consoleOutput';
import { init as ActorValuesInit } from './sync/ActorValues';
import { init as spawnSystemInit } from './spawnSystem';
import { init as CommandsInit } from './Commands';
import { init as DevCommandsInit } from './DevCommands';

utilsInit();
onHitInit();
onRegenFinishInit();
isDeadInit();
isSprintingInit();
consoleOutputInit();
ActorValuesInit();
spawnSystemInit();
CommandsInit();
DevCommandsInit();

utils.hook('onInit', (pcFormId: number) => {
	mp.onReinit(pcFormId);
});

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

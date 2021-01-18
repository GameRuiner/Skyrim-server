/**
 * текущий игрок
 */
export const currentActor = 0x14;

/**
 * Точка спавна по умолчанию
 */
export const defaultSpawnPoint = {
	pos: [227, 239, 53],
	angle: [0, 0, 0],
	worldOrCellDesc: '165a7:Skyrim.esm',
};

/**
 * Все событие в системе
 */
export const EVENTS_NAME = {
	_: '_',
	bash: '_onBash',
	consoleCommand: '_onConsoleCommand',
	currentCellChange: '_onCurrentCellChange',
	hit: '_onHit',
	localDeath: '_onLocalDeath',
	powerAttack: '_onPowerAttack',
	actorValueFlushRequiredhealth: '_onActorValueFlushRequiredhealth',
	actorValueFlushRequiredstamina: '_onActorValueFlushRequiredstamina',
	actorValueFlushRequiredmagicka: '_onActorValueFlushRequiredmagicka',
	sprintStateChange: '_onSprintStateChange',
	hitScale: '_onHitScale',
};

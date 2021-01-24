/**
 * Built-in events
 */
type SystemEventName = 'onDeath' | 'onInit' | 'onReinit';

/**
 * Custom events
 */
type CustomEventName =
	| '_'
	| '_1'
	| '_onBash'
	| '_onConsoleCommand'
	| '_onCurrentCellChange'
	| '_onHit'
	| '_onLocalDeath'
	| '_onPowerAttack'
	| '_onActorValueFlushRequiredhealth'
	| '_onActorValueFlushRequiredstamina'
	| '_onActorValueFlushRequiredmagicka'
	| '_onSprintStateChange'
	| '_onHitScale'
	| '_onActivate'
	| '_onFarm'
	| '_onAnimationEvent'
	| '_onHitStatic'
	| '_onInputF5';

export type EventName = SystemEventName | CustomEventName;

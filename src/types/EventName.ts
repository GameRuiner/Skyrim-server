/**
 * Built-in events
 */
type SystemEventName = 'onDeath' | 'onInit' | 'onReinit';

/**
 * Custom events
 */
type CustomEventName =
	| '_'
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
	| '_onInputTest'
	| '_onAnimationEvent'
	| '_onHitStatic';

export type EventName = SystemEventName | CustomEventName;

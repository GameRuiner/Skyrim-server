/**
 * Built-in events
 */
type SystemEventName = 'onDeath' | 'onInit' | 'onReinit' | 'onUiEvent';

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
	| '_onActivate'
	| '_onFarm'
	| '_onAnimationEvent'
	| '_onHitStatic'
	| '_onInput'
	| '_onMessage'
	| '_onActivateMessage'
	| '_onContainerChange'
	| '_onCellFullyLoaded';

export type EventName = SystemEventName | CustomEventName;

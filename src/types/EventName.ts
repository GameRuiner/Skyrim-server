/**
 * Built-in events
 */
<<<<<<< HEAD
type SystemEventName = "onDeath" | "onInit" | "onReinit";
=======
type SystemEventName = 'onDeath' | 'onInit' | 'onReinit';
>>>>>>> bf2957091c86ee0b1c2b7d597e85778ccce4e7c9

/**
 * Custom events
 */
type CustomEventName =
  | "_"
  | "_onBash"
  | "_onConsoleCommand"
  | "_onCurrentCellChange"
  | "_onHit"
  | "_onLocalDeath"
  | "_onPowerAttack"
  | "_onActorValueFlushRequiredhealth"
  | "_onActorValueFlushRequiredstamina"
  | "_onActorValueFlushRequiredmagicka"
  | "_onSprintStateChange"
  | "_onHitScale"
  | "_onActivate"
  | "_onFarm"
  | '_onAnimationEvent'
	| '_onHitStatic'
	| '_onInputF5';

export type EventName = SystemEventName | CustomEventName;

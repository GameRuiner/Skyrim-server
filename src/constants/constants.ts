import { EventName } from "../types/EventName";

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
  worldOrCellDesc: "165a7:Skyrim.esm",
};

/**
 * Все событие в системе
 */
export const EVENTS_NAME = {
  _: "_",
  bash: "_onBash" as EventName,
  consoleCommand: "_onConsoleCommand" as EventName,
  currentCellChange: "_onCurrentCellChange" as EventName,
  hit: "_onHit" as EventName,
  localDeath: "_onLocalDeath" as EventName,
  powerAttack: "_onPowerAttack" as EventName,
  actorValueFlushRequiredhealth: "_onActorValueFlushRequiredhealth" as EventName,
  actorValueFlushRequiredstamina: "_onActorValueFlushRequiredstamina" as EventName,
  actorValueFlushRequiredmagicka: "_onActorValueFlushRequiredmagicka" as EventName,
  sprintStateChange: "_onSprintStateChange" as EventName,
  hitScale: "_onHitScale" as EventName,
};

import { MP } from '../platform';

declare const mp: MP;

export const init = () => {
	mp.makeEventSource(
		'_onLocalDeath',
		`
    ctx.sp.on("update", () => {
      const isDead = ctx.sp.Game.getPlayer().getActorValuePercentage("health") === 0;
      if (ctx.state.wasDead !== isDead) {
        if (isDead) {
          ctx.sendEvent();
        }
        ctx.state.wasDead = isDead;
      }
    });
  `
	);
};

import { CTX, MP } from '../platform';
import { actorValues } from '../properties';
import { getFunctionText, utils } from '../utility';

declare const mp: MP;
declare const ctx: CTX;

export const init = () => {
	mp.makeEventSource(
		'_onLocalDeath',
		// 	`
		//   ctx.sp.on("update", () => {
		//     const isDead = ctx.sp.Game.getPlayer().getActorValuePercentage("health") === 0;
		//     if (ctx.state.wasDead !== isDead) {
		//       if (isDead) {
		//         ctx.sendEvent();
		//       }
		//       ctx.state.wasDead = isDead;
		//     }
		//   });
		// `
		getFunctionText(() => {
			ctx.sp.on('update', () => {
				const isDead =
					ctx.sp.Game.getPlayer().getActorValuePercentage('health') === 0;
				if (ctx.state.wasDead !== isDead) {
					if (isDead) {
						ctx.sendEvent();
					}
					ctx.state.wasDead = isDead;
				}
			});
		})
	);

	utils.hook('_onLocalDeath', (pcFormId: number) => {
		const max = actorValues.getMaximum(pcFormId, 'health');
		actorValues.set(pcFormId, 'health', 'damage', -max);
		mp.onDeath(pcFormId);
	});
};

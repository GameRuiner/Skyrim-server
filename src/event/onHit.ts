declare var mp: any;
import { utils } from '../utils';

export const init = () => {
	mp.makeEventSource(
		'_onHit',
		`
    ctx.sp.on("hit", (e) => {
      if (!ctx.sp.Actor.from(e.target)) return;
      if (e.source && ctx.sp.Spell.from(e.source)) return;

      const target = ctx.getFormIdInServerFormat(e.target.getFormId());
      const agressor = ctx.getFormIdInServerFormat(e.agressor.getFormId());
      ctx.sendEvent({
        isPowerAttack: e.isPowerAttack,
        isSneakAttack: e.isSneakAttack,
        isBashAttack: e.isBashAttack,
        isHitBlocked: e.isHitBlocked,
        target: target,
        agressor: agressor,
        source: e.source ? e.source.getFormId() : 0,
      });
    });
  `
	);

	utils.hook('_onHit', (pcFormId: number, eventData: any) => {
		if (eventData.target === 0x14) {
			eventData.target = pcFormId;
		}
		if (eventData.agressor === 0x14) {
			eventData.agressor = pcFormId;
		}
	});
};

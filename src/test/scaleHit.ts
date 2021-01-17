import { CTX, MP } from '../platform';
import { HitEvent } from '../platform/skyrimPlatform';
import { getFunctionText, utils } from '../utils';

declare const mp: MP;
declare const ctx: CTX;

export const init = () => {
	function changeScaleOnHit() {
		ctx.sp.on('hit', (event) => {
			const e = event as HitEvent;
			if (!(ctx.sp.Actor as any).from(e.target)) return;
			if (e.source && (ctx.sp.Spell as any).from(e.source)) return;

			const target = ctx.getFormIdInServerFormat(e.target.getFormID());
			const agressor = ctx.getFormIdInServerFormat(e.agressor.getFormID());
			ctx.sendEvent({
				target: target,
				agressor: agressor,
			});
		});
	}

	mp.makeEventSource('_onHitScale', getFunctionText(changeScaleOnHit));
	utils.hook('_onHitScale', (pcformId: number, eventData: any) => {
		const current: number = +mp.get(eventData.target, 'scale');
		mp.set(eventData.target, 'scale', current >= 1.5 ? 1 : 1.5);
		utils.log('_onHitScale', pcformId, eventData, current);
	});
};

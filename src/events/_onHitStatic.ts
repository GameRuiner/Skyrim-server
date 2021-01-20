import { CTX } from '../platform';
import { genClientFunction, utils } from '../utility';
import { MP } from '../types';

declare const mp: MP;
declare const ctx: CTX;

export const initHitStatic = () => {
	mp.makeEventSource(
		'_onHitStatic',
		genClientFunction(() => {
			ctx.sp.on('hit', (e: any) => {
				const target = ctx.getFormIdInServerFormat(e.target.getFormId());
				const agressor = ctx.getFormIdInServerFormat(e.agressor.getFormId());
				ctx.sendEvent({
					target: target,
					agressor: agressor,
				});
			});
		}, {})
	);

	utils.hook('_onHitStatic', (pcFormId: number, eventData: any) => {
		//utils.log('[_onHitStatic]', eventData);
	});
};

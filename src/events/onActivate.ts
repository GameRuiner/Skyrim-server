import { CTX } from '../platform';
import { getFunctionText, utils } from '../utility';
import { MP } from '../types';

declare const mp: MP;
declare const ctx: CTX;

export const initActivateEvent = () => {
	mp.makeEventSource(
		'_onActivate',
		getFunctionText(() => {
			ctx.sp.on('activate', (e: any) => {
				try {
					if (e.source && ctx.sp.Spell.from(e.source)) return;
					const target = ctx.getFormIdInServerFormat(e.target.getFormId());
					ctx.sendEvent({ target });
				} catch (e) {
					ctx.sp.printConsole('Catch _onActivate', e);
				}
			});
		})
	);
};

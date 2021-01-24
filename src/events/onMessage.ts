import { CTX } from '../platform';
import { MP } from '../types';
import { getFunctionText, utils } from '../utility';

declare const mp: MP;
declare const ctx: CTX;

export const initMessageEvent = () => {
	mp.makeEventSource(
		'_onMessage',
		getFunctionText(() => {
			ctx.sp.once('update', () => {
				// ctx.sendEvent(e);
				//ctx.sendEvent(1);
				if (!ctx.state.messageIdToShow) return;

				ctx.sendEvent(ctx.state.messageIdToShow);
				// 		const form = ctx.sp.Game.getFormEx(0x500fb0b);
				// 		const msg = ctx.sp.Message.from(form);
				// 		msg.show(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0).then((answer) => {
				// 			ctx.sp.printConsole('[TEST MESSAGE] answer', answer);
				// 		});
				ctx.state.messageIdToShow = undefined;
			});
		}, '_onMessage')
	);

	utils.hook('_onMessage', (pcFormId: number, state: any) => {
		utils.log('[MESSAGE] ctx.state', state);
	});
};

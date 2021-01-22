import { CTX } from '../platform';
import { reinit } from '../systems';
import { MP } from '../types';
import { getFunctionText, utils } from '../utility';

declare const mp: MP;
declare const ctx: CTX;

export const initInputF5Event = () => {
	mp.makeEventSource(
		'_onInputF5',
		getFunctionText(() => {
			const F5 = 0x3f;
			ctx.sp.on('update', () => {
				const isPressed = ctx.sp.Input.isKeyPressed(F5);
				if (ctx.state.isPressed !== isPressed) {
					if (ctx.state.isPressed !== undefined && isPressed === true) {
						ctx.sendEvent();
					}
					ctx.state.isPressed = isPressed;
				}
			});
		})
	);

	utils.hook('_onInputF5', (pcFormId: number) => {
		reinit(pcFormId);
		utils.log('Нажал F5');
	});
};

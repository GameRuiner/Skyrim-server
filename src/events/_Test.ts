import { CTX, MP } from '../platform';
import { reinit } from '../systems/devCommands';
import { getFunctionText, utils } from '../utility';

declare const mp: MP;
declare const ctx: CTX;

export const init = () => {
	mp.makeEventSource(
		'_onInputTest',
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

	utils.hook('_onInputTest', (pcFormId: number) => {
		reinit(pcFormId);
		utils.log('Нажал F5');
	});
};

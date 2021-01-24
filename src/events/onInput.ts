import { CTX } from '../platform';
import { inventorySystem, reinit } from '../systems';
import { InputEvent, MP } from '../types';
import { getFunctionText, utils } from '../utility';

declare const mp: MP;
declare const ctx: CTX;

export const initInputF5Event = () => {
	mp.makeEventSource(
		'_onInput',
		getFunctionText(() => {
			const BUTTONS = new Map<string, number>().set('F4', 0x3e).set('F5', 0x3f).set('F7', 0x41).set('F8', 0x42);
			ctx.sp.on('update', () => {
				let event: InputEvent = { name: '', code: -1 };
				let isPressed: boolean = false;
				BUTTONS.forEach((val, key) => {
					if (ctx.sp.Input.isKeyPressed(val)) {
						isPressed = true;
						event = {
							name: key,
							code: val,
						};
					}
				});
				if (ctx.state.isPressed !== isPressed) {
					if (ctx.state.isPressed !== undefined && isPressed) {
						const obj = ctx.sp.ObjectReference.from(ctx.sp.Game.getPlayer());
						ctx.sendEvent(event);
					}
					ctx.state.isPressed = isPressed;
				}
			});
		}, '_onInput')
	);

	utils.hook('_onInput', (pcFormId: number, event: InputEvent) => {
		switch (true) {
			case event.name === 'F4':
				utils.log('[INPUT] press F4');
				inventorySystem.addItem(pcFormId, 243042, 1);
				break;
			case event.name === 'F5':
				reinit(pcFormId);
				utils.log('[INPUT] press F5');
				break;
			case event.name === 'F7':
				utils.log('[INPUT] press F7');
				break;
			case event.name === 'F8':
				utils.log('[INPUT] press F8');
				break;

			default:
				utils.log('[INPUT] key is not assignment');
				break;
		}
	});
};

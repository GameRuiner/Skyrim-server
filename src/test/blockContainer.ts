import { CTX } from '../platform';
import { consoleOutput } from '../properties';
import { InputEvent } from '../types';
import { getFunctionText, utils } from '../utility';

declare const ctx: CTX;

export const initTestBlockContainer = () => {
	utils.hook('_onInput', (pcFormId: number, event: InputEvent) => {
		if (event.name === 'F8') {
			consoleOutput.evalClient(
				pcFormId,
				getFunctionText(() => {
					ctx.sp.printConsole('[TEST BLOCK CONTAINER]');
					[84448194, 84448116, 84448119, 84448195, 84448272, 0x6eb4f, 0x6eb51].forEach((x) => {
						const form = ctx.sp.Game.getForm(x);
						const obj = ctx.sp.ObjectReference.from(form);
						const baseObj = obj.getBaseObject();
						ctx.sp.printConsole('[TEST BLOCK CONTAINER]', form.getFormID());
						ctx.sp.printConsole('[TEST BLOCK CONTAINER]', baseObj.getName());
						obj.blockActivation(true);
					});

					// ctx.sp.ObjectReference.from(o).setOpen(false);
					//ctx.sp.ObjectReference.from(object[1]).activate(ctx.sp.Game.getPlayer(), false);
					//ctx.sp.Game.getPlayer().moveTo(ctx.sp.ObjectReference.from(object[1]), 0, 0, 0, true);
				}, 'disable objectRef')
			);
		}
	});
};

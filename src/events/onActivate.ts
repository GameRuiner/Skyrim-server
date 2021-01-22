import { CTX } from '../platform';
import { getFunctionText, utils } from '../utility';
import { MP } from '../types';
import { ObjectReference } from '@platform/skyrimPlatform';

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
					const data: ObjectReference = e.target;
					const objectReference = data.getBaseObject();
					ctx.sendEvent({
						name: objectReference.getName(),
						baseId: objectReference.getFormID(),
					});
				} catch (e) {
					ctx.sp.printConsole('Catch _onActivate', e);
				}
			});
		})
	);
};

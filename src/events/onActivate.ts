import { CTX } from '../platform';
import { getFunctionText } from '../utility';
import { ActivateEvent, ActivateEventReturn, MP } from '../types';
import { ObjectReference } from '../platform/ObjectReference';

declare const mp: MP;
declare const ctx: CTX;

export const initActivateEvent = () => {
	mp.makeEventSource(
		'_onActivate',
		getFunctionText(() => {
			let count = 0;
			let block = true;
			ctx.sp.on('activate', (event: any) => {
				try {
					const e = event as ActivateEvent;

					const target: ObjectReference = e.target;
					const BaseForm = target.getBaseObject();

					ctx.sp.printConsole(count++, 'activate');
					block = !block;
					const object = ctx.sp.Game.getFormEx(BaseForm.getFormID());
					ctx.sp.ObjectReference.from(object).blockActivation(block);

					const result: ActivateEventReturn = {
						baseId: BaseForm.getFormID(),
						name: BaseForm.getName(),
						caster: e.caster,
						target: e.target,
						isCrimeToActivate: e.isCrimeToActivate,
					};
					ctx.sendEvent(result);
				} catch (e) {
					ctx.sp.printConsole('Catch _onActivate', e);
				}
			});
		})
	);
};

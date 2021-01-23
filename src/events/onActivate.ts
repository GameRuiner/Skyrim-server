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
			ctx.sp.on('activate', (event: any) => {
				try {
					const e = event as ActivateEvent;
					if (e.caster.getFormID() !== 0x14) return;

					const target: ObjectReference = e.target;

					const result: ActivateEventReturn = {
						baseId: target.getFormID(),
						name: target.getBaseObject().getName(),
						caster: e.caster,
						target: e.target,
						isCrimeToActivate: e.isCrimeToActivate,
					};
					ctx.sendEvent(result);
				} catch (e) {
					ctx.sp.printConsole('Catch _onActivate', e);
				}
			});
		}, '_onActivate')
	);
};

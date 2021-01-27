import { CTX } from '../platform';
import { getFunctionText } from '../utility';
import { ActivateEvent, ActivateEventReturn, MP } from '../types';

declare const mp: MP;
declare const ctx: CTX;

export const initActivateEvent = () => {
	mp.makeEventSource(
		'_onActivate',
		getFunctionText(() => {
			ctx.sp.on('activate', (event: any) => {
				const e = event as ActivateEvent;
				if (e.caster.getFormID() !== 0x14) return;

				const target = ctx.getFormIdInServerFormat(e.target.getFormID());
				const targetBase = e.target.getBaseObject();
				const caster = ctx.getFormIdInServerFormat(e.caster.getFormID());

				let keywords = [];
				for (let i = 0; i < targetBase.getNumKeywords(); i++) {
					keywords.push(targetBase.getNthKeyword(i).getFormID());
				}

				const result: ActivateEventReturn = {
					caster,
					target,
					targetBaseId: targetBase.getFormID(),
					targetBaseName: targetBase.getName(),
					targetKeywords: keywords,
					isCrimeToActivate: e.isCrimeToActivate,
				};
				ctx.sendEvent(result);
			});
		}, '_onActivate')
	);
};

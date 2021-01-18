import { CTX, MP } from '../platform';
import { actorValues } from '../properties';
import { Attr } from '../types/Attr';
import { getFunctionText, utils } from '../utility';

declare const mp: MP;
declare const ctx: CTX;

export const init = () => {
	mp.makeEventSource(
		'_onBash',
		getFunctionText(() => {
			const next = ctx.sp.storage._api_onAnimationEvent;
			ctx.sp.storage._api_onAnimationEvent = {
				callback(...args: any[]) {
					const [serversideFormId, animEventName] = args;
					if (
						serversideFormId === 0x14 &&
						animEventName.toLowerCase().includes('bash')
					) {
						ctx.sendEvent(serversideFormId);
					}
					if (typeof next.callback === 'function') {
						next.callback(...args);
					}
				},
			};
		})
	);

	const sprintAttr: Attr = 'stamina';
	utils.hook('_onBash', (pcFormId: number) => {
		const damage = actorValues.get(pcFormId, sprintAttr, 'damage');
		const damageMod = -35;
		actorValues.set(pcFormId, sprintAttr, 'damage', damage + damageMod);
	});
};

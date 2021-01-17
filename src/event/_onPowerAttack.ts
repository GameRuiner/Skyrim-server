import { MP } from '../platform';
import { actorValues } from '../sync';
import { utils } from '../utils';
import { Attr } from '../types/Attr';

declare const mp: MP;

export const init = () => {
	mp.makeEventSource(
		'_onPowerAttack',
		`
    const next = ctx.sp.storage._api_onAnimationEvent;
    ctx.sp.storage._api_onAnimationEvent = {
      callback(...args) {
        const [serversideFormId, animEventName] = args;
        if (serversideFormId === 0x14 && animEventName.toLowerCase().includes("power")) {
          ctx.sendEvent(serversideFormId);
        }
        if (typeof next.callback === "function") {
          next.callback(...args);
        }
      }
    };
  `
	);

	const sprintAttr: Attr = 'stamina';
	utils.hook('_onPowerAttack', (pcFormId: number) => {
		const damage = actorValues.get(pcFormId, sprintAttr, 'damage');
		const damageMod = -35;
		actorValues.set(pcFormId, sprintAttr, 'damage', damage + damageMod);
	});
};

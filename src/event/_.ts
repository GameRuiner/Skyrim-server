import { MP } from '../platform';

declare const mp: MP;

export const init = () => {
	mp.makeEventSource(
		'_',
		`
    ctx.sp.storage._api_onAnimationEvent = { callback: () => {} };
  `
	);
};

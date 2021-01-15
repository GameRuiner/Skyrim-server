import { MP } from '../platform/mp';

declare var mp: MP;

export const init = () => {
	mp.makeEventSource(
		'_',
		`
    ctx.sp.storage._api_onAnimationEvent = { callback: () => {} };
  `
	);
};

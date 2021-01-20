import { CTX } from '../platform';
import { MP } from '../types';

declare const mp: MP;
declare const ctx: CTX;

export const init = () => {
	mp.makeEventSource(
		'_',
		'ctx.sp.storage._api_onAnimationEvent = { callback: function () {} };'
		// getFunctionText(function () {
		// 	ctx.sp.storage._api_onAnimationEvent = { callback: () => {} };
		// })
	);
};

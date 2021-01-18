import { getFunctionText, utils } from 'utils';
import { CTX, MP } from '../platform';

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

// ctx.sp.storage._api_onAnimationEvent = { callback: function () {} };
// ctx.sp.storage._api_onAnimationEvent = { callback: () => {} };

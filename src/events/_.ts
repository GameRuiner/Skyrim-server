import { MP } from '../types';

declare const mp: MP;

export const initEmptyAnimationEvent = () => {
	mp.makeEventSource('_', 'ctx.sp.storage._api_onAnimationEvent = { callback: function () {} };');
};

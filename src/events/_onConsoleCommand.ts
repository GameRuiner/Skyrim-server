import { CTX } from '../platform';
import { MP } from '../types';

declare const ctx: CTX;
declare var mp: MP;

export const init = () => {
	mp.makeEventSource(
		'_onConsoleCommand',
		`
		  ctx.sp.storage._api_onConsoleCommand = {
		    callback(...args) {
		      ctx.sendEvent(...args);
		    }
		  };
		`
		// getFunctionText(() => {
		// 	ctx.sp.storage._api_onConsoleCommand = {
		// 		callback(...args: any[]) {
		// 			ctx.sendEvent(...args);
		// 		},
		// 	};
		// })
	);
};

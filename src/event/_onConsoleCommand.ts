import { CTX } from 'platform';
import { getFunctionText } from 'utils';

declare const ctx: CTX;

declare var mp: any;

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

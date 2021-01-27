import { CTX } from '../platform';
import { getFunctionText } from '../utility';
import { MP } from '../types';

declare const mp: MP;
declare const ctx: CTX;

export const initSlowerUpdate = () => {
	/** trigger update in 1 sec */
	mp.makeEventSource(
		'_onUpdate1sec',
		getFunctionText(() => {
			ctx.sp.on('update', async () => {
				if (ctx.state.isWaiting) return;
				ctx.state.isWaiting = true;
				await ctx.sp.Utility.wait(1);
				ctx.state.isWaiting = false;
				ctx.sendEvent();
			});
		})
	);
	/** trigger update in 2 sec */
	mp.makeEventSource(
		'_onUpdate2sec',
		getFunctionText(() => {
			ctx.sp.on('update', async () => {
				if (ctx.state.isWaiting) return;
				ctx.state.isWaiting = true;
				await ctx.sp.Utility.wait(2);
				ctx.state.isWaiting = false;
				ctx.sendEvent();
			});
		})
	);
	/** trigger update in 5 sec */
	mp.makeEventSource(
		'_onUpdate5sec',
		getFunctionText(() => {
			ctx.sp.on('update', async () => {
				if (ctx.state.isWaiting) return;
				ctx.state.isWaiting = true;
				await ctx.sp.Utility.wait(5);
				ctx.state.isWaiting = false;
				ctx.sendEvent();
			});
		})
	);
};

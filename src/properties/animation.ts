import { CTX } from '../platform';
import { MP } from '../types';
import { getFunctionText } from '../utility';

declare const mp: MP;
declare const ctx: CTX;

function setAnimation() {
	try {
		if (ctx.value !== ctx.state.animation) {
			ctx.state.animation = ctx.value;

			if (ctx.value?.animations) {
				ctx.sp.printConsole('Animation start.');
				const animations: {
					start: string[];
					end: string[];
				} = ctx.value.animations;
				if (animations) {
					animations.start.forEach((animName) => {
						ctx.sp.Debug.sendAnimationEvent(ctx.sp.Game.getPlayer(), animName);
					});
					ctx.sp.Utility.wait(ctx.value.duration ?? 5).then(() => {
						animations.end.forEach((animName) => {
							ctx.sp.Debug.sendAnimationEvent(ctx.sp.Game.getPlayer(), animName);
						});
					});
				} else {
					ctx.sp.printConsole('Not found animations.');
				}
			}
		}
	} catch (e) {
		ctx.sp.printConsole(e);
	}
}

export const initAnimation = () => {
	mp.makeProperty('animation', {
		isVisibleByOwner: true,
		isVisibleByNeighbors: true,
		updateOwner: getFunctionText(setAnimation, 'setAnimation'),
		updateNeighbor: '',
	});
};

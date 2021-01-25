import { CTX } from '../platform';
import { MP } from '../types';
import { getFunctionText } from '../utility';

declare const mp: MP;
declare const ctx: CTX;

function teleport() {
	if (ctx.value !== ctx.state.teleport) {
		ctx.state.teleport = ctx.value;
		ctx.sp.printConsole(ctx.value);

		const pl = ctx.sp.Game.getPlayer();
		pl.moveTo(ctx.value, 0, 0, 0, true);
		ctx.sp.printConsole(ctx.value);
	}
}

export const initTeleport = () => {
	mp.makeProperty('teleport', {
		isVisibleByOwner: true,
		isVisibleByNeighbors: false,
		updateOwner: getFunctionText(teleport),
		updateNeighbor: '',
	});
};

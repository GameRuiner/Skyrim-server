import { CTX, MP } from '../platform';
import { Cell } from '../platform/skyrimPlatform';
import { getFunctionText, utils } from '../utils';

declare const mp: MP;
declare const ctx: CTX;

interface eventResult {
	hasError: boolean;
	err?: string;
	cell?: any;
}

function _onCurrentCellChange() {
	ctx.sp.on('update', () => {
		try {
			let result: eventResult = { hasError: false };
			const currentCell = ctx.sp.Game.getPlayer().getParentCell();
			if (ctx.state.currentCellId !== currentCell.getFormID()) {
				if (ctx.state.currentCellId !== undefined) {
					result.cell = currentCell.getFormID();
					ctx.sendEvent(result);
				}
				ctx.state.currentCellId = currentCell.getFormID();
			}
		} catch (err) {
			ctx.sendEvent({
				hasError: true,
				err: err.toString(),
			});
		}
	});
}

export const init = () => {
	mp.makeEventSource(
		'_onCurrentCellChange',
		getFunctionText(_onCurrentCellChange)
	);
	utils.hook(
		'_onCurrentCellChange',
		(
			pcformId: number,
			event: { hasError: boolean; err: string; cell: string }
		) => {
			try {
				utils.log(mp.get(pcformId, 'inventory'));
			} catch (err) {
				utils.log(err);
			}
			if (!event.hasError) {
				utils.log(pcformId, event.cell);
			}
		}
	);
};

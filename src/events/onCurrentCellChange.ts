import { CTX } from '../platform';
import { MP, CellChangeEvent } from '../types';
import { genClientFunction, utils } from '../utility';

declare const mp: MP;
declare const ctx: CTX;

export const initCurrentCellChangeEvent = () => {
	mp.makeEventSource(
		'_onCurrentCellChange',
		genClientFunction(() => {
			ctx.sp.on('update', () => {
				try {
					let result: CellChangeEvent = { hasError: false };
					const currentCell = ctx.sp.Game.getPlayer().getParentCell();
					const currentCellData = {
						id: currentCell.getFormID(),
						name: currentCell.getName(),
						type: currentCell.getType(),
					};
					if (ctx.state.currentCell?.id !== currentCellData.id) {
						if (ctx.state.currentCell?.id !== undefined) {
							result.prevCell = ctx.state.currentCell;
							result.currentCell = currentCellData;
							ctx.sendEvent(result);
						}
						ctx.state.currentCell = currentCellData;
					}
				} catch (err) {
					ctx.sendEvent({
						hasError: true,
						err: err.toString(),
					});
				}
			});
		}, {})
	);
	utils.hook('_onCurrentCellChange', (pcFormId: number, event: CellChangeEvent) => {
		if (!event.hasError) {
			utils.log('[CELL_CHANGE]', pcFormId, event.currentCell);
			// utils.log('[CELL_CHANGE]', mp.get(pcFormId, 'worldOrCellDesc'));
		} else {
			utils.log('[CELL_CHANGE]', 'ERROR: ' + event.err);
		}
	});
};

import { CTX } from '../platform';
import { MP, CellChangeEvent } from '../types';
import { genClientFunction, utils } from '../utility';

declare const mp: MP;
declare const ctx: CTX;
// ctx.sp.printConsole('[CELL_CHANGE v2]');
// ctx.sp.printConsole(
// 	ctx.state.currentCell?.id,
// 	currentCellData.id,
// 	ctx.state.currentCellId !== currentCellData.id
// );

export const initCurrentCellChangeEvent = () => {
	mp.makeEventSource(
		'_onCurrentCellChange',
		genClientFunction(() => {
			ctx.sp.once('update', () => {
				try {
					let result: CellChangeEvent = { hasError: false };
					const currentCell = ctx.sp.Game.getPlayer().getParentCell();
					const currentCellData = {
						id: currentCell.getFormID(),
						name: currentCell.getName(),
						type: currentCell.getType(),
					};
					if (ctx.state.currentCellId !== currentCellData.id) {
						ctx.state.currentCell = currentCellData;
						if (ctx.state.currentCellId !== undefined) {
							result.prevCell = ctx.state.currentCell;
							result.currentCell = currentCellData;
							ctx.sendEvent(result);
						}
						ctx.state.currentCellId = currentCell.getFormID();
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

// ctx.sp.on('update', function () {
// 	try {
// 		var result = {
// 			hasError: false
// 		};
// 		var currentCell = ctx.sp.Game.getPlayer().getParentCell();
// 		var currentCellData = {
// 			id: currentCell.getFormID(),
// 			name: currentCell.getName(),
// 			type: currentCell.getType()
// 		};

// 		if (ctx.state.currentCellId !== currentCellData.id) {
// 			if (ctx.state.currentCellId !== undefined) {
// 				result.currentCell = currentCellData;
// 				ctx.sendEvent(result);
// 			}

// 			ctx.state.currentCellId = currentCell.getFormID();
// 			ctx.state.currentCell = currentCellData;
// 		}
// 	} catch (err) {
// 		ctx.sendEvent({
// 			hasError: true,
// 			err: err.toString()
// 		});
// 	}
// });

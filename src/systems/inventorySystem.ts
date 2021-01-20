import { CTX } from '../platform';
import { consoleOutput } from '../properties';
import { MP } from '../types';
import { genClientFunction } from '../utility';

declare const mp: MP;
declare const ctx: CTX;

export const inventorySystem = {
	/**
	 * Add item to player
	 * @param formId who should I give the item to
	 * @param baseId id of item
	 * @param count quantity items to give
	 */
	addItem: (formId: number, baseId: number, count: number) => {
		if (count <= 0) return;

		const inv = mp.get(formId, 'inventory');
		let added = false;
		for (const value of inv) {
			if (Object.keys(value).length == 2 && value.baseId == baseId) {
				value.count += count;
				added = true;
				break;
			}
		}
		if (!added) {
			inv.entries.push({ baseId, count });
		}
		mp.set(formId, 'inventory', inv);
	},
	eqiupItem: (formId: number, baseId: number) => {
		consoleOutput.evalClient(
			formId,
			genClientFunction(
				() => {
					ctx.sp.Game.getPlayer().equipItem(
						ctx.sp.Game.getFormEx(baseId),
						false,
						false
					);
				},
				{ baseId }
			)
		);
	},
};

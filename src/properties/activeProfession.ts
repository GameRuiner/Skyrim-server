import { CTX } from '../platform';
import { MP } from '../types';
import { getFunctionText } from '../utility';

declare const mp: MP;
declare const ctx: CTX;

function setActiveProfession() {
	try {
		if (ctx.value !== ctx.state.activeProfession) {
			ctx.state.activeProfession = ctx.value;

			if (ctx.value) {
				const player = ctx.sp.Game.getPlayer();
				const oldEquip = ctx.value?.oldEquipment?.inv?.entries;
				if (oldEquip && !ctx.value.isActive) {
					// player.unequipAll();
					oldEquip.forEach((itemId: any) => {
						const currentItem = ctx.sp.Game.getForm(itemId.baseId);
						if (!player.isEquipped(currentItem)) {
							player.equipItem(currentItem, false, false);
						}
					});
				}
				if (ctx.value.equipment && ctx.value.isActive) {
					// player.unequipAll();
					const equipItems = Object.keys(ctx.value.equipment);
					equipItems.forEach((item) => {
						ctx.sp.printConsole(item);
						const currentItem = ctx.sp.Game.getForm(ctx.value.equipment[item]);
						ctx.sp.printConsole(currentItem.getName());
						if (!player.isEquipped(currentItem)) {
							player.equipItem(currentItem, false, false);
						}
					});
				}
			}
			ctx.sp.printConsole(ctx.value);
		}
	} catch (e) {
		ctx.sp.printConsole(e);
	}
}

export const initActiveProfession = () => {
	mp.makeProperty('activeProfession', {
		isVisibleByOwner: true,
		isVisibleByNeighbors: true,
		updateOwner: getFunctionText(setActiveProfession),
		updateNeighbor: '',
	});
};

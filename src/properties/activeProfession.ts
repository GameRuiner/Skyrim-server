import { CTX } from '../platform';
import { MP } from '../types';
import { getFunctionText } from '../utility';

declare const mp: MP;
declare const ctx: CTX;

function setActiveProfession() {
	if (ctx.value !== ctx.state.activeProfession) {
		ctx.state.activeProfession = ctx.value;

		if (ctx.value) {
			const player = ctx.sp.Game.getPlayer();
			if (ctx.value.oldEquipment && !ctx.value.isActive) {
				const oldEq = ctx.value.oldEquipment.inv.entries;
				// player.unequipAll();
				oldEq.forEach((itemId: any) => {
					const currentItem = ctx.sp.Game.getForm(itemId.baseId);
					if (!player.isEquipped(currentItem)) {
						player.equipItem(currentItem, false, false);
					}
				});
			}
			if (ctx.value.equipment && ctx.value.isActive) {
				const equipItems = Object.keys(ctx.value.equipment);
				equipItems.forEach((item) => {
					const currentItem = ctx.sp.Game.getForm(ctx.value.equipment[item]);

					if (!player.isEquipped(currentItem)) {
						player.equipItem(currentItem, false, false);
					}
				});
			}
		}
		ctx.sp.printConsole(ctx.value);
	}
}

export const initActiveProfession = () => {
	mp.makeProperty('activeProfession', {
		isVisibleByOwner: true,
		isVisibleByNeighbors: true,
		updateOwner: getFunctionText(setActiveProfession, 'setActiveProfession'),
		updateNeighbor: '',
	});
};

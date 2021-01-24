import { inventorySystem } from '..';
import { getEquipment, getInventar, consoleOutput } from '../../properties';
import { MP } from '../../types';
import { CTX } from '../../platform';
import { genClientFunction, getFunctionText, utils } from '../../utility';
import { PROFESSIONS } from './data/professions';
import { professionSystem } from './professionSystem';
import { initEmptyAnimationEvent } from '../../events';

declare const mp: MP;
declare const ctx: CTX;

//Woodsman
//-------------------------------------------------------------------
const currentProfessionName = 'woodsman';

export const initWoodsmanSystem = () => {
	utils.hook('_onActivate', (pcFormId: number, event: any) => {
		try {
			if (event.target === 0x1f229) {
				const activeProfession = professionSystem.getFromServer(pcFormId);
				const currentProfessionStaff = PROFESSIONS[currentProfessionName];
				//Проверка сосдали ли мы профессию woodsman
				if (currentProfessionStaff) {
					if (!activeProfession) {
						professionSystem.set(pcFormId, currentProfessionName);
					} else {
						if (activeProfession.name === currentProfessionName) {
							const isDeleted = professionSystem.delete(pcFormId, currentProfessionName);

							if (!isDeleted) {
								utils.log('Error: deleteProfessionItems() - error in deleteItem() ');
							} else {
								mp.set(pcFormId, 'activeProfession', null);
							}
						}
					}
				}
			}
		} catch (err) {
			utils.log(err);
		}
	});
// HitTree
//-------------------------------------------------------------------
	let countHitLog = 0;
	utils.hook('_onHitStatic', (pcFormId: number, eventData: any) => {
		if (eventData.target === 0x12dee) {
			countHitLog++;
			if (countHitLog >= 3) {
				const activeProfession = mp.get(pcFormId, 'activeProfession');
				if (activeProfession != undefined) {
					if (activeProfession.name === currentProfessionName) {
						if (inventorySystem.isEquip(pcFormId, 0x2f2f4)) {
							inventorySystem.addItem(pcFormId, 457107, 1);
							countHitLog = 0;
						}
					}
				}
			}
		}
	});
//sell log
//-------------------------------------------------------------------
	utils.hook('_onActivate', (pcFormId: number, event: any) => {
		if (event.target === 0x1f228) {
			const activeProfession = mp.get(pcFormId, 'activeProfession');
			if (activeProfession != undefined) {
				if (activeProfession.name === currentProfessionName) {
					let inv = mp.get(pcFormId, 'inventory');
					const deletedItemIndex = inv.entries.findIndex((item: { baseId: number; }) => item.baseId === 457107);
					if (inv.entries[deletedItemIndex] != undefined) {
						let count = inv.entries[deletedItemIndex].count;
						if (count > 0) {
							let gold = 10 * count;
							let del = inventorySystem.deleteItem(pcFormId, 457107, count);
							if (del.success) inventorySystem.addItem(pcFormId, 0xf, gold);
						}
					}
				}
			}
		}
	});
//-------------------------------------------------------------------
};

import { inventorySystem } from '..';
import { MP } from '../../types';
import { CTX } from '../../platform';
import { utils } from '../../utility';
import { professions } from './data';
import { professionSystem } from './professionSystem';

declare const mp: MP;
declare const ctx: CTX;

//Woodsman
//-------------------------------------------------------------------
const currentProfessionName = 'woodsman';

export const initWoodsmanSystem = () => {
	utils.hook('_onActivate', (pcFormId: number, event: any) => {
		utils.log(event);
		try {
			if (event.target === 403466) {
				const myProfession = professionSystem.getFromServer(pcFormId);
				const currentProfessionStaff = professions.collectors[currentProfessionName];
				utils.log('Тут 1');
				utils.log(myProfession);
				//Проверка сосдали ли мы профессию woodsman
				if (myProfession === undefined) {
					professionSystem.set(pcFormId, currentProfessionName);
				} else {
					if (!myProfession.isActive) {
						utils.log('set');
						utils.log('set');
						utils.log('set');
						utils.log('set');

						professionSystem.set(pcFormId, currentProfessionName);
					} else {
						utils.log('delete');
						utils.log('delete');
						utils.log('delete');
						utils.log('delete');
						professionSystem.delete(pcFormId, currentProfessionName);
					}
				}
				// if (currentProfessionStaff) {
				// 	if (!myProfession.isActive) {
				// 		professionSystem.set(pcFormId, currentProfessionName);
				// 		utils.log("Тут 2");
				// 	} else {
				// 		if (myProfession.name === currentProfessionName) {
				// 			professionSystem.delete(pcFormId, currentProfessionName);
				// 			utils.log("Тут 3");
				// 		}
				// 	}
				// }
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
					const deletedItemIndex = inv.entries.findIndex((item: { baseId: number }) => item.baseId === 457107);
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

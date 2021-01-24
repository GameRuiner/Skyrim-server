import { inventorySystem } from '..';
import { MP } from '../../types';
import { CTX } from '../../platform';
import { genClientFunction, getFunctionText, utils } from '../../utility';
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
			if (event.target === 0x1f229) {
				const myProfession = professionSystem.getFromServer(pcFormId);
				const currentProfessionStaff = professions.collectors[currentProfessionName];
				//Проверка сосдали ли мы профессию woodsman
				if (myProfession === undefined) {
					professionSystem.set(pcFormId, currentProfessionName);
				} else {
					if (!myProfession.isActive) {
						professionSystem.set(pcFormId, currentProfessionName);
					} else {
						professionSystem.delete(pcFormId, currentProfessionName);
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
					if (activeProfession.name === currentProfessionName && professions.collectors.woodsman.tool) {
						if (inventorySystem.isEquip(pcFormId, professions.collectors.woodsman.tool)) {
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
